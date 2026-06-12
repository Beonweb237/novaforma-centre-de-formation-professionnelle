import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  Award,
  Mail,
  User,
  LogOut,
  Search,
  Bell,
  Clock,
  Target,
  ChevronRight,
  Download,
  Eye,
  Menu,
  X,
  BookMarked,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

/* ─────────────────────── mock data ─────────────────────── */

const userName = 'Marie';

const navItems = [
  { label: 'Tableau de bord', icon: LayoutDashboard, active: true },
  { label: 'Mes formations', icon: BookOpen, active: false },
  { label: 'Mon emploi du temps', icon: Calendar, active: false },
  { label: 'Mes documents', icon: FileText, active: false },
  { label: 'Mon certificat', icon: Award, active: false },
  { label: 'Messagerie', icon: Mail, active: false, badge: 2 },
  { label: 'Mon compte', icon: User, active: false },
];

const stats = [
  { label: 'Formations actives', value: '2', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
  { label: 'Avant certification', value: '45 jours', icon: Clock, color: 'bg-orange-100 text-orange-600' },
  { label: 'Documents disponibles', value: '12', icon: FileText, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Progression moyenne', value: '85%', icon: Target, color: 'bg-purple-100 text-purple-600' },
];

const trainings = [
  {
    id: 1,
    name: 'Developpeur Web Full Stack',
    status: 'En cours',
    progress: 65,
    duration: '6 mois',
    startDate: 'Depuis le 12 oct. 2025',
    nextSession: 'JavaScript Avance',
    nextDate: 'Lundi 12 janv., 9h-17h',
    instructor: 'Thomas Martin',
  },
  {
    id: 2,
    name: 'Anglais Professionnel TOEIC',
    status: 'En cours',
    progress: 40,
    duration: '12 semaines',
    startDate: 'Depuis le 2 nov. 2025',
    nextSession: 'TOEIC Speaking',
    nextDate: 'Mercredi 14 janv., 18h30-21h30',
    instructor: 'Sarah Johnson',
  },
];

const weeklySchedule = [
  { day: 'Lun', date: '12', events: [{ name: 'JS Avance', time: '9h-17h', color: 'bg-blue-500' }] },
  { day: 'Mar', date: '13', events: [] },
  { day: 'Mer', date: '14', events: [{ name: 'TOEIC Speaking', time: '18h30-21h30', color: 'bg-orange-500' }] },
  { day: 'Jeu', date: '15', events: [{ name: 'React Hooks', time: '9h-17h', color: 'bg-blue-500' }] },
  { day: 'Ven', date: '16', events: [{ name: 'Projet fil rouge', time: '9h-17h', color: 'bg-blue-500' }] },
];

const documents = [
  { name: 'Programme_DevWeb_2026.pdf', date: '15 dec. 2025', size: '2.4 MB' },
  { name: 'Emploi_du_temps_janvier.pdf', date: '10 dec. 2025', size: '1.1 MB' },
  { name: 'Guide_JavaScript_avance.pdf', date: '5 dec. 2025', size: '3.6 MB' },
  { name: 'Modalites_certification.pdf', date: '1 dec. 2025', size: '890 KB' },
  { name: 'Reglement_interieur.pdf', date: '20 nov. 2025', size: '450 KB' },
];

/* ─────────────────────── sidebar ─────────────────────── */

function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1E3A5F] text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5">
        <BookMarked className="w-6 h-6 text-blue-400" />
        <span className="text-lg font-bold tracking-tight">NOVAFORMA</span>
      </div>

      <Separator className="bg-white/10" />

      {/* Nav items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={onNavClick}
                className={
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ' +
                  (item.active
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/5')
                }
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={onNavClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Deconnexion</span>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── top bar ─────────────────────── */

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-16 bg-white border-b border-stone-200 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5 text-stone-700" />
        </button>
        <h1 className="text-xl font-bold text-stone-900">Tableau de bord</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <Input
                autoFocus
                placeholder="Rechercher..."
                className="w-48 lg:w-64 h-9 text-sm"
                onBlur={() => setSearchOpen(false)}
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5 text-stone-600" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5 text-stone-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar */}
        <Avatar className="w-9 h-9 bg-blue-600 cursor-pointer">
          <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

/* ─────────────────────── page ─────────────────────── */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Close sidebar when navigating (mobile)
  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    // Entrance animation for content cards
    const cards = contentRef.current?.querySelectorAll('.animate-card');
    if (cards) {
      cards.forEach((card, i) => {
        const el = card as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#F5F5F0]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 w-[240px] h-full z-40">
        <Sidebar onNavClick={handleNavClick} />
      </aside>

      {/* Mobile sidebar sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[260px] p-0 border-0">
          <Sidebar onNavClick={handleNavClick} />
        </SheetContent>
      </Sheet>

      {/* Top bar */}
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Content */}
      <main ref={contentRef} className="pt-16 lg:ml-[240px] p-4 lg:p-8">
        {/* Welcome Banner */}
        <div className="animate-card relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Bonjour, {userName}</h2>
              <p className="text-white/80 text-sm mt-1">
                Vous etes inscrite a 2 formations actives. Prochaine session : lundi 12 janvier.
              </p>
            </div>
            <div className="hidden lg:block opacity-10">
              <BookOpen className="w-20 h-20" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="animate-card bg-white rounded-xl border border-stone-200 p-5 flex items-center gap-4"
              >
                <div className={'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ' + stat.color}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-stone-900 font-mono">{stat.value}</p>
                  <p className="text-sm text-stone-500 truncate">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Trainings */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-stone-900 mb-4">Mes formations en cours</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {trainings.map((training) => (
              <div
                key={training.id}
                className="animate-card bg-white rounded-xl border border-stone-200 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-base font-bold text-stone-900">{training.name}</h4>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold">
                    {training.status}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-stone-500">Progression</span>
                    <span className="text-xs font-semibold text-stone-700">{training.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-1000"
                      style={{ width: training.progress + '%' }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {training.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {training.startDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-stone-400" />
                    {training.progress}% complete
                  </span>
                </div>

                {/* Next session */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Prochain cours :</span> {training.nextSession} —{' '}
                    {training.nextDate}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full border-stone-300 text-stone-700 hover:bg-stone-50"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    Voir le detail
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1" />
                    Acceder au cours
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule Preview */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-stone-900 mb-4">Cette semaine</h3>
          <div className="animate-card bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="grid grid-cols-5 divide-x divide-stone-100">
              {weeklySchedule.map((day, i) => (
                <div key={i} className="p-4 min-h-[140px]">
                  <p className="text-xs uppercase text-stone-500 font-medium tracking-wide">{day.day}</p>
                  <p className="text-base font-bold text-stone-900 mt-0.5">{day.date}</p>
                  <div className="mt-3 space-y-2">
                    {day.events.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">—</p>
                    ) : (
                      day.events.map((event, j) => (
                        <div key={j} className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className={'w-2 h-2 rounded-full flex-shrink-0 ' + event.color} />
                            <span className="text-xs font-medium text-stone-700 truncate">{event.name}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 ml-3.5">{event.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-stone-100 bg-stone-50/50">
              <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Voir mon emploi du temps complet
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="mt-10 mb-8">
          <h3 className="text-lg font-bold text-stone-900 mb-4">Documents recents</h3>
          <div className="animate-card bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="divide-y divide-stone-100">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{doc.name}</p>
                    <p className="text-xs text-stone-500">
                      {doc.size} — {doc.date}
                    </p>
                  </div>
                  <button
                    className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-stone-200 transition-all"
                    aria-label="Telecharger"
                  >
                    <Download className="w-4 h-4 text-stone-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

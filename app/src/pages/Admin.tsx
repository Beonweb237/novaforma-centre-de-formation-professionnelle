import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  Users,
  ClipboardList,
  Calendar,
  FileText,
  UserCog,
  Globe,
  Search,
  Bell,
  Plus,
  UserPlus,
  CalendarPlus,
  FileUp,
  ChevronRight,
  LogOut,
  Menu,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronLast,
  ChevronFirst,
  Building2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ─────────────────────── mock data ─────────────────────── */

const monthlyData = [
  { month: 'J', value: 180 },
  { month: 'F', value: 210 },
  { month: 'M', value: 240 },
  { month: 'A', value: 220 },
  { month: 'M', value: 260 },
  { month: 'J', value: 290 },
  { month: 'J', value: 220 },
  { month: 'A', value: 200 },
  { month: 'S', value: 380 },
  { month: 'O', value: 320 },
  { month: 'N', value: 350 },
  { month: 'D', value: 310 },
];

const domainData = [
  { name: 'Digital', value: 35, color: '#2563EB' },
  { name: 'Management', value: 22, color: '#7C3AED' },
  { name: 'Langues', value: 18, color: '#0891B2' },
  { name: 'Securite', value: 12, color: '#DC2626' },
  { name: 'BTP', value: 8, color: '#B45309' },
  { name: 'Commerce', value: 15, color: '#059669' },
  { name: 'Sante', value: 10, color: '#EC4899' },
  { name: 'Projet', value: 8, color: '#F97316' },
];

const stats = [
  { label: 'Stagiaires actifs', value: '1 247', trend: '+12%', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { label: 'Formations actives', value: '128', trend: '+3', icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
  { label: 'Inscriptions 2025', value: '3 421', trend: '+8%', icon: ClipboardList, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Taux de satisfaction', value: '92%', trend: '+5%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
];

const registrations = [
  { id: 1, name: 'Marie Dupont', training: 'Dev Web Full Stack', date: '10 janv. 2026', status: 'Active', financing: 'CPF + OPCO', amount: '4 500 EUR' },
  { id: 2, name: 'Karim Benali', training: 'Data Analyst', date: '9 janv. 2026', status: 'En attente', financing: 'CPF', amount: '3 800 EUR' },
  { id: 3, name: 'Sophie Martin', training: "Manager d'Equipe", date: '8 janv. 2026', status: 'Active', financing: 'Entreprise', amount: '2 200 EUR' },
  { id: 4, name: 'Lucas Petit', training: 'Anglais TOEIC', date: '7 janv. 2026', status: 'Active', financing: 'CPF', amount: '1 500 EUR' },
  { id: 5, name: 'Emma Leroy', training: 'CQP Agent Securite', date: '6 janv. 2026', status: 'En attente', financing: 'Pole emploi', amount: '3 200 EUR' },
  { id: 6, name: 'Thomas Bernard', training: 'Developpeur Python', date: '5 janv. 2026', status: 'Active', financing: 'CPF + OPCO', amount: '4 200 EUR' },
  { id: 7, name: 'Camille Dubois', training: 'Anglais Business', date: '4 janv. 2026', status: 'Active', financing: 'CPF', amount: '1 800 EUR' },
  { id: 8, name: 'Ahmed Sylla', training: 'Gestion de Projet Agile', date: '3 janv. 2026', status: 'En attente', financing: 'Entreprise', amount: '2 600 EUR' },
];

const upcomingSessions = [
  { id: 1, training: 'Developpeur Web Full Stack', dates: '12 janv. - 10 juil.', location: 'Paris', enrolled: 14, max: 15 },
  { id: 2, training: 'Data Analyst', dates: '2 fevr. - 30 sept.', location: 'Lyon + Distanciel', enrolled: 8, max: 12 },
  { id: 3, training: "Manager d'Equipe", dates: '20 janv. - 24 janv.', location: 'Paris', enrolled: 18, max: 20 },
  { id: 4, training: 'Anglais TOEIC', dates: '15 janv. - 15 avr.', location: 'Paris', enrolled: 10, max: 12 },
  { id: 5, training: 'CQP Agent de Securite', dates: '8 fevr. - 8 mai', location: 'Marseille', enrolled: 15, max: 15 },
];

const quickActions = [
  { label: 'Nouvelle formation', desc: 'Creer une fiche formation', icon: Plus, color: 'bg-blue-100 text-blue-600' },
  { label: 'Nouvel inscrit', desc: 'Inscrire un stagiaire manuellement', icon: UserPlus, color: 'bg-orange-100 text-orange-600' },
  { label: 'Nouvelle session', desc: 'Planifier une nouvelle session', icon: CalendarPlus, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Importer documents', desc: 'Ajouter des documents stagiaires', icon: FileUp, color: 'bg-purple-100 text-purple-600' },
];

/* ─────────────────────── sidebar ─────────────────────── */

const generalNav = [
  { label: 'Tableau de bord', icon: LayoutDashboard, active: true },
  { label: 'Statistiques', icon: BarChart3, active: false },
];

const gestionNav = [
  { label: 'Formations', icon: BookOpen, active: false },
  { label: 'Stagiaires', icon: Users, active: false },
  { label: 'Inscriptions', icon: ClipboardList, active: false },
  { label: 'Sessions', icon: Calendar, active: false },
  { label: 'Documents', icon: FileText, active: false },
];

const settingsNav = [
  { label: 'Equipe', icon: UserCog, active: false },
  { label: 'Site web', icon: Globe, active: false },
];

function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  const navigate = useNavigate();

  const renderItems = (items: typeof generalNav) =>
    items.map((item) => {
      const Icon = item.icon;
      return (
        <button
          key={item.label}
          onClick={onNavClick}
          className={
            'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ' +
            (item.active
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100')
          }
        >
          <Icon className={'w-[18px] h-[18px] flex-shrink-0 ' + (item.active ? 'text-blue-600' : 'text-stone-400')} />
          <span className="text-left">{item.label}</span>
        </button>
      );
    });

  return (
    <div className="flex flex-col h-full bg-white border-r border-stone-200">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4">
        <Building2 className="w-5 h-5 text-blue-600" />
        <span className="text-base font-bold text-stone-900 tracking-tight">NOVAFORMA</span>
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-stone-100 text-stone-600 font-medium">
          Admin
        </Badge>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        {/* General */}
        <div className="px-6 mt-6 mb-2">
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">General</p>
        </div>
        <div className="px-3 space-y-0.5">{renderItems(generalNav)}</div>

        {/* Gestion */}
        <div className="px-6 mt-6 mb-2">
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Gestion</p>
        </div>
        <div className="px-3 space-y-0.5">{renderItems(gestionNav)}</div>

        {/* Parametres */}
        <div className="px-6 mt-6 mb-2">
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Parametres</p>
        </div>
        <div className="px-3 space-y-0.5 mb-4">{renderItems(settingsNav)}</div>
      </ScrollArea>

      {/* Bottom */}
      <div className="border-t border-stone-200 px-3 py-4 space-y-1">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all"
        >
          <Globe className="w-[18px] h-[18px] text-stone-400" />
          Retour au site
        </button>
        <button
          onClick={onNavClick}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-stone-600 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-[18px] h-[18px] text-stone-400" />
          Deconnexion
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── top bar ─────────────────────── */

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[260px] h-16 bg-white border-b border-stone-200 z-30 flex items-center justify-between px-4 lg:px-8">
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

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center bg-stone-100 rounded-full px-4 h-9 w-64">
          <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder:text-stone-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5 text-stone-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Avatar */}
        <Avatar className="w-8 h-8 bg-blue-600 cursor-pointer">
          <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

/* ─────────────────────── status badge helper ─────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
    'En attente': 'bg-amber-100 text-amber-700 hover:bg-amber-100',
    Terminee: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    Abandon: 'bg-red-100 text-red-700 hover:bg-red-100',
  };
  return (
    <Badge className={(styles[status] || 'bg-stone-100 text-stone-700') + ' text-xs font-semibold'}>
      {status}
    </Badge>
  );
}

/* ─────────────────────── custom tooltip for recharts ─────────────────────── */

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-stone-200 px-3 py-2">
        <p className="text-sm font-medium text-stone-900">{label}</p>
        <p className="text-sm text-stone-600">{payload[0].value} inscriptions</p>
      </div>
    );
  }
  return null;
}

/* ─────────────────────── page ─────────────────────── */

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(registrations.length / itemsPerPage);
  const paginatedRegistrations = registrations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
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
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 w-[260px] h-full z-40">
        <Sidebar onNavClick={() => setSidebarOpen(false)} />
      </aside>

      {/* Mobile sidebar sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 border-0">
          <Sidebar onNavClick={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Top bar */}
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Content */}
      <main ref={contentRef} className="pt-16 lg:ml-[260px] p-4 lg:p-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="animate-card bg-white rounded-xl border border-stone-200 p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={'w-10 h-10 rounded-full flex items-center justify-center ' + stat.color}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-semibold">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-stone-900 font-mono mt-2">{stat.value}</p>
                <p className="text-sm text-stone-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-5 gap-6 mt-8">
          {/* Bar Chart */}
          <div className="animate-card lg:col-span-3 bg-white rounded-xl border border-stone-200 p-6">
            <div className="mb-6">
              <h3 className="text-base font-bold text-stone-900">Inscriptions par mois</h3>
              <p className="text-[13px] text-stone-500">Janvier 2025 - Decembre 2025</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#78716C', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#78716C', fontSize: 12 }}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.month === 'S' || entry.month === 'J' ? '#F97316' : '#2563EB'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          <div className="animate-card lg:col-span-2 bg-white rounded-xl border border-stone-200 p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-stone-900">Repartition par domaine</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[140px] h-[140px] flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={domainData}
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {domainData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="relative -mt-[90px] flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-xl font-bold text-stone-900 font-mono">128</p>
                    <p className="text-[10px] text-stone-500">formations</p>
                  </div>
                </div>
              </div>
              {/* Legend */}
              <div className="flex-1 space-y-2 max-h-[180px] overflow-y-auto">
                {domainData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-stone-600 flex-1 truncate">{d.name}</span>
                    <span className="text-xs font-semibold text-stone-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="animate-card mt-8 bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900">Dernieres inscriptions</h3>
            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-50 hover:bg-stone-50">
                  <TableHead className="text-xs font-semibold text-stone-700">Stagiaire</TableHead>
                  <TableHead className="text-xs font-semibold text-stone-700">Formation</TableHead>
                  <TableHead className="text-xs font-semibold text-stone-700">Date d&apos;inscription</TableHead>
                  <TableHead className="text-xs font-semibold text-stone-700">Statut</TableHead>
                  <TableHead className="text-xs font-semibold text-stone-700">Financement</TableHead>
                  <TableHead className="text-xs font-semibold text-stone-700 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRegistrations.map((reg) => (
                  <TableRow key={reg.id} className="hover:bg-stone-50 transition-colors">
                    <TableCell className="text-sm font-medium text-stone-900">{reg.name}</TableCell>
                    <TableCell className="text-sm text-stone-600">{reg.training}</TableCell>
                    <TableCell className="text-sm text-stone-500">{reg.date}</TableCell>
                    <TableCell>
                      <StatusBadge status={reg.status} />
                    </TableCell>
                    <TableCell className="text-sm text-stone-600">{reg.financing}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-stone-100">
            <p className="text-xs text-stone-500">
              Affichage {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, registrations.length)} sur {registrations.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0}
                className="p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronFirst className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-stone-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={
                    'w-7 h-7 rounded-lg text-xs font-medium transition-colors ' +
                    (i === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-stone-600 hover:bg-stone-100')
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
                className="p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLast className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="animate-card mt-6 bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900">Prochaines sessions</h3>
            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Gerer le calendrier
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-stone-100">
            {upcomingSessions.map((session) => {
              const ratio = session.enrolled / session.max;
              const barColor = ratio >= 1 ? 'bg-red-500' : ratio >= 0.8 ? 'bg-orange-500' : 'bg-emerald-500';
              const isFull = session.enrolled >= session.max;

              return (
                <div key={session.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-stone-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900">{session.training}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {session.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {session.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 min-w-[160px]">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-stone-500">
                          {session.enrolled}/{session.max}
                        </span>
                        {isFull && (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-[10px] h-4 px-1">
                            Complet
                          </Badge>
                        )}
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className={'h-full rounded-full transition-all ' + barColor}
                          style={{ width: `${Math.min(100, (session.enrolled / session.max) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  className="animate-card flex items-center gap-4 bg-white rounded-xl border border-stone-200 p-4 hover:shadow-sm hover:border-blue-200 transition-all duration-200 text-left"
                >
                  <div className={'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ' + action.color}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900">{action.label}</p>
                    <p className="text-xs text-stone-500 truncate">{action.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

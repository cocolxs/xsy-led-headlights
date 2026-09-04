import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Package,
  Settings,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LightbulbIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isLoggedIn, getAdmin, clearAuth } from '@/utils/admin-auth';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { path: '/admin/marketing', label: 'Marketing Analytics', icon: TrendingUp },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const pageTitleMap: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/inquiries': 'Inquiry Management',
  '/admin/marketing': 'Marketing Analytics',
  '/admin/analytics': 'Analytics',
  '/admin/products': 'Product Management',
  '/admin/settings': 'Site Settings',
};

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loggedIn = isLoggedIn();
  const admin = getAdmin();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/admin/login', { replace: true });
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const currentTitle =
    pageTitleMap[location.pathname] ??
    (location.pathname.startsWith('/admin/dashboard')
      ? 'Dashboard'
      : 'Admin Panel');

  const handleLogout = () => {
    clearAuth();
    navigate('/admin/login', { replace: true });
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 transform bg-[#0A2540] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00C2FF]/20 text-[#00C2FF]">
              <LightbulbIcon className="size-5" />
            </div>
            <div>
              <div className="text-sm font-bold">XSY LED Admin</div>
              <div className="text-xs text-white/60">Management Console</div>
            </div>
          </div>
          <button
            className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-[#00C2FF]/20 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">{currentTitle}</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2540] text-xs font-semibold text-white">
                  {admin?.name?.charAt(0) ?? 'A'}
                </div>
                <span className="hidden font-medium text-slate-700 sm:inline">
                  {admin?.name ?? 'Admin'}
                </span>
                <ChevronDown className="size-4 text-slate-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{admin?.name ?? 'Admin'}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {admin?.role ?? 'Administrator'}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

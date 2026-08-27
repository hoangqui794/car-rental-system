import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Clock, Car, User, LogOut, Search, PlusCircle, LayoutDashboard } from 'lucide-react';
import { authApi } from '../services/api';

interface UserSession {
  email: string;
  role: 'Customer' | 'Owner';
  fullName: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('user');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      console.error("Đăng xuất phía BE thất bại");
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 inset-x-0 z-50 shadow-md">
      
      {/* 1. TOP UTILITY BAR (From studied reference DNA) */}
      <div className="bg-[#111113] text-[#8e8e93] text-[11px] font-['Space_Grotesk'] border-b border-[#252528] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left Info: Address & Hours */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3 h-3 text-[#d32f2f]" />
              Showroom: Quận 1, TP.HCM & Hoàn Kiếm, Hà Nội
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#d32f2f]" />
              Phục vụ: 07:00 — 22:00 (Giao xe 24/7)
            </span>
          </div>

          {/* Right Info: Hotline & User session */}
          <div className="flex items-center gap-4">
            <a href="tel:19008888" className="flex items-center gap-1.5 text-white font-bold hover:text-[#d32f2f] transition-colors">
              <Phone className="w-3 h-3 text-[#d32f2f]" />
              Hotline: 1900 8888
            </a>
            <span className="text-neutral-600">|</span>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-neutral-200 font-bold">{user.fullName}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                  {user.role === 'Owner' ? 'Chủ xe' : 'Hội viên'}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-neutral-400 hover:text-red-400 ml-1 cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth" className="text-neutral-300 hover:text-white transition-colors">
                  Đăng nhập
                </Link>
                <span>/</span>
                <Link to="/auth" className="text-neutral-300 hover:text-white transition-colors">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER (Dark Charcoal with Crimson Red Active Block) */}
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-6 lg:px-8 border-b border-[#2d2d30]">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#d32f2f] rounded-lg flex items-center justify-center text-white shadow-xs">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="font-['Space_Grotesk'] font-black text-xl tracking-tight text-white block leading-none">
                SMARTDRIVE
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block mt-0.5">
                Automotive & Luxury Rentals
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center h-full">
            <Link
              to="/"
              className={`h-full flex items-center px-4 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/') ? 'bg-[#d32f2f] text-white' : 'text-neutral-300 hover:text-white hover:bg-[#252528]'
              }`}
            >
              Trang Chủ
            </Link>

            <Link
              to="/cars"
              className={`h-full flex items-center px-4 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive('/cars') ? 'bg-[#d32f2f] text-white' : 'text-neutral-300 hover:text-white hover:bg-[#252528]'
              }`}
            >
              Bộ Sưu Tập Xe
            </Link>

            {(!user || user.role === 'Customer') && (
              <Link
                to="/become-host"
                className={`h-full flex items-center px-4 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive('/become-host') ? 'bg-[#d32f2f] text-white' : 'text-neutral-300 hover:text-white hover:bg-[#252528]'
                }`}
              >
                Gửi Xe Cho Thuê
              </Link>
            )}

            {user && user.role === 'Customer' && (
              <Link
                to="/profile"
                className={`h-full flex items-center px-4 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive('/profile') ? 'bg-[#d32f2f] text-white' : 'text-neutral-300 hover:text-white hover:bg-[#252528]'
                }`}
              >
                Chuyến Đi Của Tôi
              </Link>
            )}

            {user && user.role === 'Owner' && (
              <Link
                to="/host-dashboard"
                className={`h-full flex items-center px-4 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive('/host-dashboard') ? 'bg-[#d32f2f] text-white' : 'text-neutral-300 hover:text-white hover:bg-[#252528]'
                }`}
              >
                Dashboard Chủ Xe
              </Link>
            )}
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/cars"
              className="px-4 py-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white rounded-md text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              Đặt Xe Ngay
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, [location]); // Re-run check on page transition

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('Đã đăng xuất thành công!');
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-10 flex justify-between items-center h-20">
        <Link className="font-sans text-[24px] font-bold tracking-tight text-primary dark:text-violet-400" to="/">
          SMARTDRIVE
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link 
            className={`font-sans text-[16px] pb-1 transition-colors duration-300 ${
              isActive('/cars') ? 'text-primary border-b-2 border-primary' : 'text-zinc-600 dark:text-zinc-400 hover:text-primary'
            }`} 
            to="/cars"
          >
            Tìm xe
          </Link>
          
          {/* Become Host only visible for customers or guests */}
          {(!user || user.role === 'Customer') && (
            <Link 
              className={`font-sans text-[16px] pb-1 transition-colors duration-300 ${
                isActive('/become-host') ? 'text-primary border-b-2 border-primary' : 'text-zinc-600 dark:text-zinc-400 hover:text-primary'
              }`} 
              to="/become-host"
            >
              Trở thành chủ xe
            </Link>
          )}

          {/* Customer trip history */}
          {user && user.role === 'Customer' && (
            <Link 
              className={`font-sans text-[16px] pb-1 transition-colors duration-300 ${
                isActive('/profile') ? 'text-primary border-b-2 border-primary' : 'text-zinc-600 dark:text-zinc-400 hover:text-primary'
              }`} 
              to="/profile"
            >
              Chuyến đi của tôi
            </Link>
          )}

          {/* Owner Fleet Dashboard */}
          {user && user.role === 'Owner' && (
            <Link 
              className={`font-sans text-[16px] pb-1 transition-colors duration-300 ${
                isActive('/host-dashboard') ? 'text-primary border-b-2 border-primary' : 'text-zinc-600 dark:text-zinc-400 hover:text-primary'
              }`} 
              to="/host-dashboard"
            >
              Dashboard Chủ xe
            </Link>
          )}
        </div>

        {/* Dynamic Auth Section */}
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-sans text-[14px] font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-full">
                👤 {user.fullName} ({user.role === 'Owner' ? 'Chủ xe' : 'Khách hàng'})
              </span>
              <button 
                onClick={handleLogout}
                className="font-sans text-[14px] font-semibold text-error hover:underline"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link 
                className="font-sans text-[16px] text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-violet-400 transition-colors duration-300" 
                to="/auth"
              >
                Đăng nhập
              </Link>
              <Link 
                className="px-6 py-2.5 bg-primary text-white rounded-full font-sans text-[14px] font-medium hover:shadow-lg transition-all duration-300 active:scale-95 hover:bg-primary-container" 
                to="/auth"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authApi } from '../services/api';
import { Lock, Mail, User, Phone, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await authApi.login({ email, password });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.user.role === 'Owner') {
          navigate('/host-dashboard');
        } else {
          navigate('/');
        }
      } else {
        await authApi.register({ email, password, fullName, phoneNumber: phone });
        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        setIsLogin(true);
      }
    } catch (error: any) {
      alert(error.message || 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Obsidian Luxury Brand Showcase */}
          <div className="lg:col-span-5 bg-neutral-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden hidden md:flex">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> SMARTDRIVE ACCESS
              </div>
              
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-white leading-tight">
                Đặc quyền di chuyển không giới hạn
              </h2>
              
              <p className="text-neutral-400 text-sm leading-relaxed">
                Đăng nhập để nhận xe tức thì với Digital Key, quản lý lịch sử hành trình và tích điểm hội viên SmartDrive Black Card.
              </p>

              <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Xác thực CCCD eKYC tự động trong 60s</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bảo hiểm toàn phần PJICO lên đến 5 tỷ VNĐ</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Giao xe tận sảnh khách sạn & sân bay 24/7</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>BẢO MẬT MÃ HOÁ 256-BIT</span>
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            
            {/* Tab Switched */}
            <div className="flex p-1 bg-neutral-100 rounded-2xl mb-8 border border-neutral-200/60">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isLogin 
                    ? 'bg-white text-neutral-950 shadow-xs' 
                    : 'text-neutral-500 hover:text-neutral-950'
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  !isLogin 
                    ? 'bg-white text-neutral-950 shadow-xs' 
                    : 'text-neutral-500 hover:text-neutral-950'
                }`}
              >
                Đăng ký thành viên
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-bold font-['Space_Grotesk'] text-neutral-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Trần Hoàng Quân"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-['Space_Grotesk'] text-neutral-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0918 234 567"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none transition-all"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold font-['Space_Grotesk'] text-neutral-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  Email tài khoản
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="quan.tran@gmail.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold font-['Space_Grotesk'] text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-neutral-500" />
                    Mật khẩu
                  </label>
                  {isLogin && (
                    <span className="text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer font-medium">
                      Quên mật khẩu?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-neutral-950 hover:bg-blue-600 active:scale-[0.985] text-white rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-neutral-950/10 disabled:opacity-50 mt-2"
              >
                <span>{isLoading ? 'Đang xử lý…' : (isLogin ? 'Đăng nhập ngay' : 'Tạo tài khoản VIP')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 border-t border-neutral-100 text-center">
                <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                  💡 Email có chữ <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-800 font-bold">owner</code> đăng nhập vai trò <strong>Chủ xe</strong>, email khác vai trò <strong>Khách thuê</strong>.
                </p>
              </div>
            </form>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;

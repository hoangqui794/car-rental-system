import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { authApi } from '../services/api';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu đăng nhập lên Backend
      const response = await authApi.login({ email, password });
      // Lưu JWT Access Token vào localStorage để đính kèm vào header các request sau
      localStorage.setItem('token', response.token);
      // Lưu thông tin User (Tên, Email, Quyền) để hiển thị trên giao diện
      localStorage.setItem('user', JSON.stringify(response.user));
      alert(`Đăng nhập thành công! chào ${response.user.fullName}`);
      if (response.user.role === 'Owner') {
        navigate('/host-dashboard');
      } else {
        navigate('/');
      }

      await authApi.register({ email, password, fullName, phoneNumber: phone });
      alert('Đăng ký tài khoàn thành công!, Hãy đăng nhập')
      setIsLogin(true);// Tự động chuyển sang Tab Đăng nhập

    } catch (error: any) {
      // Hiển thị lỗi chi tiết trả về từ Backend (Ví dụ: Email đã tồn tại, Sai mật khẩu)
      alert(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');

    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-20 flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-[32px] overflow-hidden premium-shadow grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Cover Image & Promo */}
          <div className="relative hidden md:block bg-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
            <img
              alt="Premium Car interior"
              className="w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvbRVVYM8_URC2SfbmXOcUwsz8jUN-zeHnjIuxexa0DfjJeUG-QTB7PlmW3Qh_OMep6MFecxdb7ChdFTNJ_fiqI37YH8fL7nGz1x8GkKMnbhUigv5C-tpSBkI2dFnRdC1kpnL-mTzLm2-_7i-cXq6ynHpWK8xC4_-EX4NHw-W8yU-vJc4_wS73AbaSBc4iZTTIRWl1notOaLeVctxzfjbQEqwM7wa12RziVdahHgBfBR-YnCK7txKbAyg"
            />
            <div className="absolute bottom-12 left-8 right-8 z-20 text-white">
              <h2 className="font-sans text-[28px] font-bold mb-4">Trải nghiệm di chuyển cao cấp</h2>
              <p className="font-sans text-[14px] text-white/80">
                Hãy tham gia cùng chúng tôi để tận hưởng những hành trình tuyệt vời với dịch vụ thuê xe đẳng cấp hàng đầu.
              </p>
            </div>
          </div>

          {/* Right Column: Auth Forms */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Tab Switched */}
            <div className="flex border-b border-zinc-200 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 pb-3 font-sans text-[16px] font-semibold transition-all border-b-2 ${isLogin ? 'border-primary text-primary' : 'border-transparent text-zinc-500 hover:text-zinc-800'
                  }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 pb-3 font-sans text-[16px] font-semibold transition-all border-b-2 ${!isLogin ? 'border-primary text-primary' : 'border-transparent text-zinc-500 hover:text-zinc-800'
                  }`}
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="font-sans text-[14px] font-semibold text-zinc-700 block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-[14px] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[14px] font-semibold text-zinc-700 block mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0901234567"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-[14px] outline-none transition-all"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="font-sans text-[14px] font-semibold text-zinc-700 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-[14px] outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700">Mật khẩu</label>
                  {isLogin && (
                    <a href="#" className="font-sans text-[12px] text-primary hover:underline">Quên mật khẩu?</a>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-[14px] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white rounded-xl font-sans text-[14px] font-semibold hover:bg-primary-container transition-all active:scale-[0.98] shadow-md shadow-primary/10"
              >
                {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
              </button>

              <div className="pt-4 border-t border-zinc-100 text-center">
                <p className="font-sans text-[11px] text-zinc-500 leading-relaxed">
                  💡 <strong>Mẹo thử nghiệm:</strong> Đăng nhập với email chứa chữ <code>owner</code> (ví dụ: <code>owner@gmail.com</code>) để vào vai trò <strong>Chủ xe</strong>, hoặc email bất kỳ để vào vai trò <strong>Khách hàng</strong>.
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

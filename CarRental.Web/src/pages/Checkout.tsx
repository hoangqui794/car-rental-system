import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CreditCard, QrCode, Wallet, ShieldCheck, Lock, FileText, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [driverName, setDriverName] = useState('Trần Hoàng Quân');
  const [driverPhone, setDriverPhone] = useState('0918 234 567');
  const [licenceNumber, setLicenceNumber] = useState('GPLX-790123456789');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* Page Heading */}
        <div className="pb-6 mb-8 border-b border-neutral-200/80">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 font-bold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            BẢO MẬT THANH TOÁN 256-BIT SSL
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
            Xác Nhận Đặt Xe & Thanh Toán
          </h1>
        </div>

        <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Driver Info & Payment Selection */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Driver Identity Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                <FileText className="w-5 h-5 text-neutral-700" />
                <h2 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950 uppercase tracking-wider">
                  Thông tin người lái xe & Xác thực eKYC
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-500" />
                    Họ và tên tài xế
                  </label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Trần Hoàng Quân"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    Số điện thoại liên hệ
                  </label>
                  <input
                    type="tel"
                    required
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="0918 234 567"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                  Số giấy phép lái xe (GPLX)
                </label>
                <input
                  type="text"
                  required
                  value={licenceNumber}
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  placeholder="GPLX - 12 số định danh"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none font-mono"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                <CreditCard className="w-5 h-5 text-neutral-700" />
                <h2 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950 uppercase tracking-wider">
                  Phương thức thanh toán an toàn
                </h2>
              </div>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-neutral-950 bg-neutral-50/50 shadow-xs' 
                    : 'border-neutral-200/80 hover:bg-neutral-50'
                }`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 accent-neutral-950 cursor-pointer"
                  />
                  <CreditCard className="w-5 h-5 text-neutral-800" />
                  <div className="flex-1">
                    <p className="font-['Space_Grotesk'] text-sm font-bold text-neutral-900">Thẻ Quốc Tế Visa / Mastercard / JCB</p>
                    <p className="text-xs text-neutral-500 font-mono">Xử lý thanh toán tức thì qua cổng quốc tế bảo mật 3D-Secure</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'vnpay' 
                    ? 'border-neutral-950 bg-neutral-50/50 shadow-xs' 
                    : 'border-neutral-200/80 hover:bg-neutral-50'
                }`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="vnpay" 
                    checked={paymentMethod === 'vnpay'}
                    onChange={() => setPaymentMethod('vnpay')}
                    className="w-4 h-4 accent-neutral-950 cursor-pointer"
                  />
                  <QrCode className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-['Space_Grotesk'] text-sm font-bold text-neutral-900">Quét mã VNPay QR / Mobile Banking</p>
                    <p className="text-xs text-neutral-500 font-mono">Hỗ trợ hơn 40 ứng dụng ngân hàng tại Việt Nam</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'momo' 
                    ? 'border-neutral-950 bg-neutral-50/50 shadow-xs' 
                    : 'border-neutral-200/80 hover:bg-neutral-50'
                }`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="momo" 
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="w-4 h-4 accent-neutral-950 cursor-pointer"
                  />
                  <Wallet className="w-5 h-5 text-pink-600" />
                  <div className="flex-1">
                    <p className="font-['Space_Grotesk'] text-sm font-bold text-neutral-900">Ví điện tử MoMo Pay</p>
                    <p className="text-xs text-neutral-500 font-mono">Thanh toán nhanh trong 1 chạm</p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-lg sticky top-24 space-y-6">
              
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-neutral-950 uppercase tracking-wider pb-4 border-b border-neutral-100">
                Tóm tắt hành trình
              </h3>

              {/* Selected Vehicle Info */}
              <div className="flex gap-3 items-center">
                <div className="w-20 h-16 bg-neutral-100 rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-200/60">
                  <img 
                    alt="Porsche Taycan" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" 
                  />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] text-sm font-bold text-neutral-950">Porsche Taycan 4S</h4>
                  <p className="text-xs text-neutral-500 font-mono">Quận 1, TP.HCM</p>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-600">
                <div className="flex justify-between">
                  <span>Giá thuê xe (2 ngày)</span>
                  <span className="font-bold text-neutral-950 tabular-nums">9.600.000 ₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Bảo hiểm PJICO VIP</span>
                  <span className="font-bold text-emerald-600">Miễn phí 100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Giao xe tận sảnh 45p</span>
                  <span className="font-bold text-emerald-600">Miễn phí</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-100 text-base font-bold font-['Space_Grotesk'] text-neutral-950">
                  <span>Tổng thanh toán</span>
                  <span className="font-mono font-black text-blue-600 tabular-nums">9.600.000 ₫</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-neutral-950 hover:bg-blue-600 active:scale-[0.985] text-white font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-neutral-950/10 cursor-pointer"
              >
                <span>Xác nhận & Thanh toán ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <p className="text-[11px] font-mono text-neutral-400">
                  🔒 Dữ liệu được mã hoá và bảo hộ bởi chính sách SmartDrive.
                </p>
              </div>

            </div>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

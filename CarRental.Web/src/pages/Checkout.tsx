import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [licenceNumber, setLicenceNumber] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-10 w-full flex-grow">
        <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing and Driver Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-zinc-200/50 premium-shadow space-y-6">
              <h2 className="font-sans text-[24px] font-bold text-zinc-900">Thông tin người lái xe</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Họ và tên tài xế</label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Số điện thoại liên hệ</label>
                  <input
                    type="tel"
                    required
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="0901234567"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Số bằng lái xe (GPLX)</label>
                <input
                  type="text"
                  required
                  value={licenceNumber}
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  placeholder="GPLX - 12 số"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-200/50 premium-shadow space-y-6">
              <h2 className="font-sans text-[24px] font-bold text-zinc-900">Chọn phương thức thanh toán</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-zinc-200 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="font-sans text-[14px] font-semibold text-zinc-800">Thẻ Quốc Tế (Visa/Mastercard)</p>
                    <p className="font-sans text-[12px] text-zinc-500">Phí dịch vụ 1.5%</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-zinc-200 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="vnpay" 
                    checked={paymentMethod === 'vnpay'}
                    onChange={() => setPaymentMethod('vnpay')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="font-sans text-[14px] font-semibold text-zinc-800">Cổng thanh toán VNPay</p>
                    <p className="font-sans text-[12px] text-zinc-500">Quét mã QR ngân hàng hoặc ATM nội địa</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-zinc-200 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="momo" 
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="font-sans text-[14px] font-semibold text-zinc-800">Ví điện tử MoMo</p>
                    <p className="font-sans text-[12px] text-zinc-500">Thanh toán nhanh qua ứng dụng MoMo</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Booking Summary Panel */}
          <div>
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow space-y-6">
              <h3 className="font-sans text-[18px] font-bold text-zinc-900 pb-3 border-b border-zinc-100">
                Tóm tắt đặt xe
              </h3>

              <div className="flex gap-4">
                <div className="w-20 h-16 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    alt="Car thumbnail" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200" 
                  />
                </div>
                <div>
                  <h4 className="font-sans text-[16px] font-bold text-zinc-800">Mitsubishi Xpander 2023</h4>
                  <p className="font-sans text-[12px] text-zinc-500">Quận 7, TP.HCM</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-100 text-sans text-[14px]">
                <div className="flex justify-between text-zinc-500">
                  <span>Giá thuê (3 ngày)</span>
                  <span className="font-medium text-zinc-800">2.550.000 đ</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Phí dịch vụ</span>
                  <span className="font-medium text-zinc-800">50.000 đ</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Bảo hiểm chuyến đi</span>
                  <span className="font-medium text-zinc-800">120.000 đ</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-zinc-100 text-[18px] font-bold text-primary">
                  <span>Tổng tiền</span>
                  <span>2.720.000 đ</span>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-primary text-white font-sans text-[14px] font-bold rounded-xl hover:bg-primary-container transition-all active:scale-[0.98]">
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

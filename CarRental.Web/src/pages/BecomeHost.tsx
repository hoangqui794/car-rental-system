import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BecomeHost: React.FC = () => {
  const [carBrand, setCarBrand] = useState('Mitsubishi');
  const [days, setDays] = useState(15);
  
  // Basic calculations for estimated income
  const baseRates: Record<string, number> = {
    'Mitsubishi': 800000,
    'Tesla': 1800000,
    'Toyota': 700000,
    'Honda': 750000
  };

  const getEstimatedIncome = () => {
    const rate = baseRates[carBrand] || 800000;
    return rate * days;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Yêu cầu đăng ký làm chủ xe đã được gửi! Admin sẽ liên hệ duyệt hồ sơ trong vòng 24h.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-10 w-full flex-grow space-y-12">
        {/* Banner Hero */}
        <section className="bg-primary-container text-white rounded-[32px] p-8 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="max-w-xl space-y-6">
            <h1 className="font-sans text-[36px] md:text-[48px] font-bold leading-tight">
              Kiếm tiền thụ động từ chiếc xe nhàn rỗi của bạn
            </h1>
            <p className="font-sans text-[16px] text-white/90">
              Đăng ký xe dễ dàng, bảo hiểm hỗ trợ chuyến đi và nhận nguồn thu nhập ổn định lên tới 15 triệu/tháng.
            </p>
          </div>
          <div className="w-full md:w-80 bg-white text-zinc-800 rounded-3xl p-6 shadow-lg space-y-4">
            <h3 className="font-sans text-[18px] font-bold text-center">Ước tính thu nhập</h3>
            
            <div className="space-y-1">
              <label className="font-sans text-[12px] font-semibold text-zinc-500">Hãng xe sở hữu</label>
              <select 
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-sans text-[14px]"
              >
                <option value="Mitsubishi">Mitsubishi (Xpander...)</option>
                <option value="Tesla">Tesla (Model Y...)</option>
                <option value="Toyota">Toyota (Vios, Fortuner...)</option>
                <option value="Honda">Honda (City, Civic...)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[12px] font-semibold text-zinc-500">Số ngày cho thuê/tháng: {days} ngày</label>
              <input 
                type="range" 
                min="5" 
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="pt-3 border-t border-zinc-100 text-center">
              <p className="font-sans text-[12px] text-zinc-500">Doanh thu dự kiến</p>
              <p className="font-sans text-[24px] font-bold text-primary">{getEstimatedIncome().toLocaleString('vi-VN')} đ</p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-zinc-200/50 premium-shadow space-y-4">
            <span className="material-symbols-outlined text-[48px] text-primary">payments</span>
            <h3 className="font-sans text-[20px] font-bold text-zinc-900">Thu nhập ổn định</h3>
            <p className="font-sans text-[14px] text-zinc-600 leading-relaxed">
              Tự thiết lập giá thuê theo ngày, tối ưu hóa phương tiện của bạn để tạo ra dòng tiền thụ động hiệu quả.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-zinc-200/50 premium-shadow space-y-4">
            <span className="material-symbols-outlined text-[48px] text-primary">shield_with_heart</span>
            <h3 className="font-sans text-[20px] font-bold text-zinc-900">Bảo hiểm toàn diện</h3>
            <p className="font-sans text-[14px] text-zinc-600 leading-relaxed">
              An tâm tuyệt đối với bảo hiểm chuyến đi bảo vệ xe của bạn trước những rủi ro va chạm hay mất mát không đáng có.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-zinc-200/50 premium-shadow space-y-4">
            <span className="material-symbols-outlined text-[48px] text-primary">support_agent</span>
            <h3 className="font-sans text-[20px] font-bold text-zinc-900">Hỗ trợ 24/7</h3>
            <p className="font-sans text-[14px] text-zinc-600 leading-relaxed">
              Đội ngũ chăm sóc khách hàng luôn sẵn sàng đồng hành hỗ trợ giải quyết sự cố kỹ thuật hay tranh chấp phát sinh.
            </p>
          </div>
        </section>

        {/* Onboarding Register Form */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-zinc-200/50 premium-shadow max-w-2xl mx-auto space-y-6">
          <h2 className="font-sans text-[24px] font-bold text-zinc-900 text-center">
            Đăng ký gửi xe và bắt đầu kiếm tiền
          </h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Biển số xe</label>
                <input
                  type="text"
                  required
                  placeholder="51H-12345"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Địa điểm đỗ xe</label>
                <input
                  type="text"
                  required
                  placeholder="Quận 7, TP.HCM"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Hình ảnh Đăng ký xe (Cà vẹt) hoặc đăng kiểm</label>
              <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[36px] text-zinc-400 mb-1">upload_file</span>
                <p className="font-sans text-[12px] text-zinc-500">Kéo thả hoặc nhấp để chọn ảnh giấy tờ xe (.jpg, .png)</p>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-white font-sans text-[14px] font-bold rounded-xl hover:bg-primary-container transition-all active:scale-[0.98]">
              Gửi yêu cầu đăng ký
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeHost;

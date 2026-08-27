import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TrendingUp, ShieldCheck, Headphones, UploadCloud, CheckCircle2, ArrowRight, Sparkles, Car, DollarSign } from 'lucide-react';

const BecomeHost: React.FC = () => {
  const [carBrand, setCarBrand] = useState('Porsche');
  const [days, setDays] = useState(15);
  
  const baseRates: Record<string, number> = {
    'Porsche': 4800000,
    'Tesla': 3500000,
    'Mercedes-Maybach': 4200000,
    'VinFast': 2400000,
    'Audi': 4600000
  };

  const getEstimatedIncome = () => {
    const rate = baseRates[carBrand] || 3500000;
    // Estimated 80% revenue share after platform operational costs
    return Math.round(rate * days * 0.8);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Yêu cầu đăng ký làm chủ xe đã được tiếp nhận! Chuyên viên thẩm định SmartDrive sẽ liên hệ trong 2 giờ.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow space-y-16">
        
        {/* Banner Hero: Obsidian Luxury Partner Hub */}
        <section className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> CHƯƠNG TRÌNH ĐỐI TÁC CHỦ XE 2026
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Tối ưu hoá tài sản: Kiếm thu nhập 25 — 60 triệu/tháng từ chiếc xe nhàn rỗi
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Gửi gắm phương tiện cao cấp của bạn vào hệ sinh thái SmartDrive. Chúng tôi kiểm soát hành trình AI 24/7, xác thực khách thuê khắt khe và bảo hiểm tài sản toàn phần lên đến 5 tỷ VNĐ.
            </p>
          </div>

          {/* Right Income Calculator Card */}
          <div className="lg:col-span-5 bg-white text-neutral-950 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-neutral-200/90">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-neutral-900">
                Ước tính lợi nhuận đối tác
              </h3>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-500">
                Thương hiệu xe bạn sở hữu
              </label>
              <select 
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs font-bold font-['Space_Grotesk'] text-neutral-950 focus:outline-none cursor-pointer"
              >
                <option value="Porsche">Porsche (Taycan, Macan, Panamera...)</option>
                <option value="Tesla">Tesla (Model S, Model Y, Model 3...)</option>
                <option value="Mercedes-Maybach">Mercedes-Maybach & Mercedes-EQS</option>
                <option value="VinFast">VinFast (VF 9 VIP, VF 8...)</option>
                <option value="Audi">Audi (e-tron GT, Q8...)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold font-['Space_Grotesk']">
                <span className="text-neutral-500 uppercase tracking-wider">Số ngày cho thuê/tháng:</span>
                <span className="font-mono text-neutral-950">{days} ngày</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-neutral-950 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100 bg-neutral-50 p-4 rounded-2xl text-center border border-neutral-200/60">
              <p className="text-[11px] font-mono uppercase text-neutral-500">Thu nhập dự kiến ròng của bạn</p>
              <p className="font-mono text-2xl sm:text-3xl font-black text-neutral-950 tabular-nums mt-1 text-blue-600">
                {getEstimatedIncome().toLocaleString('vi-VN')} ₫ <span className="text-xs text-neutral-500 font-normal">/ tháng</span>
              </p>
            </div>
          </div>

        </section>

        {/* Benefits Diptych Modules */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950 uppercase tracking-wider">
              Dòng tiền thụ động ổn định
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tự thiết lập giá thuê theo ngày, theo dõi lịch trình nhận xe và nhận thanh toán tự động vào tài khoản định kỳ hàng tuần.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950 uppercase tracking-wider">
              Bảo hiểm toàn phần 5 Tỷ
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              An tâm tuyệt đối với gói bảo hiểm vật chất thân vỏ và trách nhiệm dân sự PJICO chi trả 100% rủi ro phát sinh trong suốt hành trình.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950 uppercase tracking-wider">
              Đội ngũ vận hành chuyên biệt
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Đội ngũ Concierge của SmartDrive chịu trách nhiệm vệ sinh xe, kiểm tra kỹ thuật và bàn giao trực tiếp cho khách thuê VIP.
            </p>
          </div>
        </section>

        {/* Onboarding Registration Form */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/90 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1 pb-4 border-b border-neutral-100">
            <h2 className="font-['Space_Grotesk'] text-2xl font-black text-neutral-950 tracking-tight">
              Đăng Ký Trở Thành Chủ Xe SmartDrive
            </h2>
            <p className="text-xs text-neutral-500">
              Điền thông tin ban đầu, chúng tôi sẽ hoàn tất thẩm định xe trong 24 giờ.
            </p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1">
                  Biển số xe đăng ký
                </label>
                <input
                  type="text"
                  required
                  placeholder="51K-889.23"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1">
                  Khu vực đỗ xe chính
                </label>
                <input
                  type="text"
                  required
                  placeholder="Quận 1 / Thảo Điền, TP.HCM"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-sm font-medium outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1">
                Ảnh đăng ký xe (Cà vẹt) hoặc sổ kiểm định
              </label>
              <div className="border-2 border-dashed border-neutral-200 hover:border-neutral-950 rounded-2xl p-6 text-center transition-colors cursor-pointer bg-neutral-50">
                <UploadCloud className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs font-bold font-['Space_Grotesk'] text-neutral-800">
                  Kéo thả hoặc nhấp để chọn tệp ảnh (.jpg, .png)
                </p>
                <p className="text-[10px] font-mono text-neutral-400 mt-1">Dung lượng tối đa 15MB</p>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-neutral-950 hover:bg-blue-600 active:scale-[0.985] text-white font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-neutral-950/10 cursor-pointer"
            >
              <span>Gửi hồ sơ đăng ký đối tác</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default BecomeHost;

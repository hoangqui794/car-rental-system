import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Star, 
  MapPin, 
  BatteryCharging, 
  Gauge, 
  Radio, 
  ShieldCheck, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  KeyRound,
  Crown
} from 'lucide-react';

const CarDetails: React.FC = () => {
  const [days, setDays] = useState(2);
  const pricePerDay = 4800000;
  
  const images = [
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200"
  ];
  
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-neutral-400 font-mono text-xs mb-6">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/cars" className="hover:text-neutral-900 transition-colors">Đội xe</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-semibold">Porsche Taycan 4S Cross Turismo</span>
        </nav>

        {/* Gallery Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-9 h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/90 shadow-sm relative group">
            <img 
              alt="Porsche Taycan main view" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out" 
              src={activeImage} 
            />
            <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-amber-400 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" /> XE THƯỢNG LƯU ĐỜI MỚI 2026
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-3">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`h-24 sm:h-28 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-0.5 bg-white ${
                  activeImage === img ? 'border-neutral-950 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img alt="Thumbnail" className="w-full h-full object-cover rounded-xl" src={img} />
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Details & Sticky Booking Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Car Specifications & Story */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-neutral-950 text-white rounded-full font-['Space_Grotesk'] text-[11px] font-bold uppercase tracking-wider">
                  Porsche Gran Turismo
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono text-[11px] font-bold">
                  Sẵn sàng bàn giao tại Quận 1, TP.HCM
                </span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight mt-1">
                Porsche Taycan 4S Cross Turismo
              </h1>
              
              <div className="flex items-center gap-4 mt-3 text-xs text-neutral-600 font-mono">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-neutral-900">5.0</span> (52 đánh giá thực tế)
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Sảnh Quận 1 & Sân bay Tân Sơn Nhất</span>
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-4">
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-neutral-950 uppercase tracking-wider">
                Thông số kỹ thuật & Hiệu năng
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-center">
                  <Gauge className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <p className="font-mono text-[11px] text-neutral-400">0 - 100 km/h</p>
                  <p className="font-mono text-sm font-bold text-neutral-950 tabular-nums">3.9 Giây</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-center">
                  <BatteryCharging className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="font-mono text-[11px] text-neutral-400">Tầm hoạt động</p>
                  <p className="font-mono text-sm font-bold text-neutral-950 tabular-nums">490 km</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-center">
                  <Zap className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                  <p className="font-mono text-[11px] text-neutral-400">Công suất</p>
                  <p className="font-mono text-sm font-bold text-neutral-950 tabular-nums">530 HP</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-center">
                  <Users className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className="font-mono text-[11px] text-neutral-400">Số chỗ ngồi</p>
                  <p className="font-mono text-sm font-bold text-neutral-950">4 Ghế Sport</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm">
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-neutral-950 uppercase tracking-wider">
                Mô tả chi tiết & Tiện nghi đặc quyền
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Porsche Taycan 4S Cross Turismo kết hợp hoàn hảo giữa cảm giác lái thể thao trứ danh của Porsche và không gian rộng rãi vượt trội. Xe trang bị kiến trúc điện 800V cho tốc độ sạc siêu tốc, hệ thống treo khí nén chủ động thích ứng đa địa hình, gói bấm giờ Sport Chrono thể thao và dàn âm thanh vòm vòm Burmester 3D High-End.
              </p>
              
              <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Chế độ lái Gravel Mode cho cung đường gồ ghề</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kính cách âm và cách nhiệt chống tia UV toàn diện</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Màn hình hiển thị hành khách riêng biệt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hỗ trợ đỗ xe tự động & camera 360 độ 3D</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-lg sticky top-24 space-y-6">
              
              <div className="flex justify-between items-baseline pb-4 border-b border-neutral-100">
                <span className="text-xs font-bold font-['Space_Grotesk'] text-neutral-500 uppercase tracking-wider">
                  Giá thuê ngày
                </span>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-0.5">
                    <span className="font-mono text-2xl font-black text-neutral-950 tabular-nums">
                      {pricePerDay.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-xs text-neutral-500 font-bold">₫</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 block">/ ngày (đã gồm VAT)</span>
                </div>
              </div>

              {/* Number of days selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold font-['Space_Grotesk'] text-neutral-700 uppercase tracking-wider">
                  Số ngày muốn thuê: <span className="font-mono text-neutral-950">{days} ngày</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                  className="w-full accent-neutral-950 cursor-pointer"
                />
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-100 text-xs text-neutral-600 font-mono">
                <div className="flex justify-between">
                  <span>Tiền thuê ({days} ngày)</span>
                  <span className="font-bold text-neutral-950 tabular-nums">{(pricePerDay * days).toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Bảo hiểm PJICO VIP</span>
                  <span className="font-bold text-emerald-600">Miễn phí 100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Giao xe sảnh tận nơi</span>
                  <span className="font-bold text-emerald-600">Miễn phí 45p</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-100 text-base font-bold font-['Space_Grotesk'] text-neutral-950">
                  <span>Tổng thanh toán</span>
                  <span className="font-mono font-black text-blue-600 tabular-nums">{(pricePerDay * days).toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full py-3.5 bg-neutral-950 hover:bg-blue-600 active:scale-[0.985] text-white font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-neutral-950/10"
              >
                <span>Tiến hành đặt xe</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center pt-2">
                <span className="text-[11px] font-mono text-neutral-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                  Hoàn cọc tự động qua ngân hàng trong 12h
                </span>
              </div>

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;

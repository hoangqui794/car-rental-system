import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CarDetails: React.FC = () => {
  const [days, setDays] = useState(1);
  const pricePerDay = 850000;
  
  // Custom mock images from user's directory metadata if present, or fallback
  const images = [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=400"
  ];
  
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-10 w-full flex-grow">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-zinc-500 font-sans text-[14px] mb-6">
          <a href="#" className="hover:text-primary">Trang chủ</a>
          <span>&gt;</span>
          <a href="#" className="hover:text-primary">Danh sách xe</a>
          <span>&gt;</span>
          <span className="text-zinc-800 font-medium">Mitsubishi Xpander</span>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3 h-[450px] rounded-[24px] overflow-hidden bg-zinc-100">
            <img alt="Mitsubishi Xpander main" className="w-full h-full object-cover" src={activeImage} />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`h-24 md:h-32 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImage === img ? 'border-primary' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img alt="Thumbnail" className="w-full h-full object-cover" src={img} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-sans text-[12px] font-semibold">
                Instant Book
              </span>
              <h1 className="font-sans text-[36px] font-bold text-zinc-900 mt-2">Mitsubishi Xpander 2023</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-zinc-600 font-sans text-[14px]">
                  <span className="material-symbols-outlined text-[18px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-bold">4.8</span> (42 đánh giá)
                </div>
                <div className="flex items-center gap-1 text-zinc-600 font-sans text-[14px]">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Quận 7, TP.HCM</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow">
              <h3 className="font-sans text-[18px] font-bold text-zinc-900 mb-4">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-zinc-50 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-[32px] mb-1">event_seat</span>
                  <p className="font-sans text-[12px] text-zinc-500">Số ghế</p>
                  <p className="font-sans text-[16px] font-bold text-zinc-800">7 Chỗ</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-[32px] mb-1">settings</span>
                  <p className="font-sans text-[12px] text-zinc-500">Hộp số</p>
                  <p className="font-sans text-[16px] font-bold text-zinc-800">Tự động</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-[32px] mb-1">local_gas_station</span>
                  <p className="font-sans text-[12px] text-zinc-500">Nhiên liệu</p>
                  <p className="font-sans text-[16px] font-bold text-zinc-800">Xăng</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-[32px] mb-1">speed</span>
                  <p className="font-sans text-[12px] text-zinc-500">Định mức</p>
                  <p className="font-sans text-[16px] font-bold text-zinc-800">6.9L/100km</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-sans text-[18px] font-bold text-zinc-900">Mô tả chi tiết</h3>
              <p className="font-sans text-[16px] text-zinc-600 leading-relaxed">
                Mitsubishi Xpander 2023 là dòng xe 7 chỗ đa dụng (MPV) rộng rãi nhất phân khúc, cực kỳ thích hợp cho các chuyến du lịch gia đình hoặc đi công tác đông người. Xe vận hành êm ái, cách âm tốt và tiết kiệm nhiên liệu tối đa. Có trang bị màn hình cảm ứng kết nối Apple CarPlay/Android Auto.
              </p>
            </div>
          </div>

          {/* Booking Widget Column */}
          <div>
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow sticky top-24 space-y-6">
              <div className="flex justify-between items-end">
                <span className="font-sans text-[14px] text-zinc-500">Giá thuê</span>
                <div>
                  <span className="font-sans text-[28px] font-bold text-primary">{pricePerDay.toLocaleString('vi-VN')} đ</span>
                  <span className="font-sans text-[14px] text-zinc-500"> / ngày</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <div className="space-y-1">
                  <label className="font-sans text-[12px] font-semibold text-zinc-600">Số ngày muốn thuê</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="30"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans text-[14px] outline-none"
                  />
                </div>

                <div className="flex justify-between items-center py-2 font-sans text-[16px]">
                  <span className="text-zinc-600">Tổng cộng ({days} ngày)</span>
                  <span className="font-bold text-zinc-900">{(pricePerDay * days).toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full py-4 bg-primary text-white font-sans text-[14px] font-bold rounded-xl hover:bg-primary-container text-center block transition-all active:scale-[0.98]"
              >
                Đặt xe ngay
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarDetails;

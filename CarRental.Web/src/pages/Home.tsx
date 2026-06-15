import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchWidget from '../components/SearchWidget';
import CarCard from '../components/CarCard';
import type { CarCardProps } from '../components/CarCard';

const mockCars: CarCardProps[] = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuSyj0T_u4FMBbb84kFm-DJbdPCKgs4Kis0SpOtk39Nqbu6wgzhm7nmSqjgakQptNBeL29nmF8wkR2WsQRlB0jAg5xGn4sRbguY56muwtmphoA3z5aJMTtWe3xwX_YSFlorWmFt36pK5j1-X-UjCmFz8MeRGCeuNddTLp1HXxb44JUUSb70fq770_18aSMG4ishM8Hh4DDjiBqbYgXT8D35l0C2FT5t4MMPYCRdEV52FoZem2xDYmNQVw",
    brand: "Tesla",
    name: "Tesla Model Y",
    pricePerDay: 1800000,
    rating: 4.9,
    reviewsCount: 128,
    location: "Quận 1, TP.HCM",
    tags: ["Electric", "Autonomous"]
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLtatmAaT7GmPxFkj9tB5YjGcErjrr3U0ASymxfPkNPaIygVFOjOm32wdViOB7QjdCRYav5h_usCLkKrqnIt1BRYSKBfNuZXNfH21hahdApsV4DPt0b8pSP0iN7mGe7kjCiPv7jfdVvhPqCioRN9lymgdr5HqJTygFodW8m0gx_uILwePy2Joal1FSe9VJqoeh51dvD5rFDGmpD5K76mOTG9XaexdYmsV4ZCxaqZv_Gw_y5DLdNID4QEbYw",
    brand: "Volt",
    name: "Volt Lux S1",
    pricePerDay: 1200000,
    rating: 4.8,
    reviewsCount: 85,
    location: "Quận 7, TP.HCM",
    tags: ["Smart Tech", "AWD"]
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuWF4dGqoILmu2xfd_kNQBB0RPjPeitft1GzxZJYty9WLi-s9UBfiAI8GEISdnkEnc_o4zxfXWbHt65_UOtIfciKISeBhDr2x2vfwmj2qPLeiI71PDlpSw3FGe4A7ahfpMncvjoLil-1NAonUXYJ4HbkfhDC0XTJDnj0orxTWnOvx69Pht_Ne7qyDlI1_i1zBm5X1UekaCgLZ6UhYxNwW_UhN0GcC0mEISWUKizztO4-XecZD0J1lU3_zk",
    brand: "E-Series",
    name: "E-Series GT",
    pricePerDay: 2500000,
    rating: 5.0,
    reviewsCount: 50,
    location: "Ba Đình, Hà Nội",
    tags: ["High Performance", "Luxury"]
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="pt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            <img 
              alt="Luxury Electric Car" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLvbRVVYM8_URC2SfbmXOcUwsz8jUN-zeHnjIuxexa0DfjJeUG-QTB7PlmW3Qh_OMep6MFecxdb7ChdFTNJ_fiqI37YH8fL7nGz1x8GkKMnbhUigv5C-tpSBkI2dFnRdC1kpnL-mTzLm2-_7i-cXq6ynHpWK8xC4_-EX4NHw-W8yU-vJc4_wS73AbaSBc4iZTTIRWl1notOaLeVctxzfjbQEqwM7wa12RziVdahHgBfBR-YnCK7txKbAyg" 
            />
          </div>
          <div className="relative z-20 max-w-[1280px] mx-auto px-10 w-full">
            <div className="max-w-2xl">
              <h1 className="font-sans text-[48px] md:text-[56px] leading-[1.1] font-bold text-white mb-6 tracking-tight">
                Trải nghiệm tương lai của sự di chuyển
              </h1>
              <p className="font-sans text-[18px] text-white/90 mb-12 max-w-lg">
                Khám phá bộ sưu tập xe điện và xe thông minh cao cấp nhất. Thuê xe nhanh chóng, thanh toán minh bạch và dịch vụ đặc quyền.
              </p>
              {/* Search Widget */}
              <SearchWidget />
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="py-12 bg-surface">
          <div className="max-w-[1280px] mx-auto px-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="font-sans text-[12px] font-semibold text-primary uppercase tracking-widest block mb-2">
                  Bộ sưu tập độc quyền
                </span>
                <h2 className="font-sans text-[32px] font-bold text-zinc-900">Xe Nổi Bật</h2>
              </div>
              <a className="flex items-center gap-2 text-primary font-sans text-[14px] font-semibold hover:underline decoration-2 underline-offset-4" href="#">
                Xem tất cả xe
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockCars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-[1280px] mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              <div className="md:col-span-8 bg-zinc-100 rounded-[32px] p-12 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  alt="Premium Urban Experience" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLvbRVVYM8_URC2SfbmXOcUwsz8jUN-zeHnjIuxexa0DfjJeUG-QTB7PlmW3Qh_OMep6MFecxdb7ChdFTNJ_fiqI37YH8fL7nGz1x8GkKMnbhUigv5C-tpSBkI2dFnRdC1kpnL-mTzLm2-_7i-cXq6ynHpWK8xC4_-EX4NHw-W8yU-vJc4_wS73AbaSBc4iZTTIRWl1notOaLeVctxzfjbQEqwM7wa12RziVdahHgBfBR-YnCK7txKbAyg" 
                />
                <div className="relative z-20 text-white">
                  <h3 className="font-sans text-[32px] font-bold mb-4">Trải nghiệm di chuyển 5 sao</h3>
                  <p className="font-sans text-[18px] opacity-80 max-w-lg">
                    Quy trình giao xe tận nơi, hỗ trợ 24/7 và bảo hiểm chuyến đi toàn diện giúp bạn an tâm trên mọi cung đường.
                  </p>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="flex-1 bg-primary text-white rounded-[32px] p-8 flex flex-col justify-between">
                  <span className="material-symbols-outlined text-[48px]">bolt</span>
                  <div>
                    <h4 className="font-sans text-[24px] font-bold mb-2">Sạc siêu nhanh</h4>
                    <p className="font-sans text-[16px] opacity-80">Mạng lưới trạm sạc phủ khắp giúp hành trình không bao giờ gián đoạn.</p>
                  </div>
                </div>
                <div className="flex-1 bg-secondary-container text-zinc-900 rounded-[32px] p-8 flex flex-col justify-between">
                  <span className="material-symbols-outlined text-[48px] text-primary">verified</span>
                  <div>
                    <h4 className="font-sans text-[24px] font-bold mb-2">Chủ xe tin cậy</h4>
                    <p className="font-sans text-[16px] opacity-80">100% chủ xe được xác thực danh tính và lịch sử dịch vụ rõ ràng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Progress Bar */}
      <div className="booking-progress"></div>
    </div>
  );
};

export default Home;

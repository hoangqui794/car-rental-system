import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import type { CarCardProps } from '../components/CarCard';
import { SlidersHorizontal, ArrowUpDown, Zap, Sparkles, Car, ShieldCheck } from 'lucide-react';

const initialCars: (CarCardProps & { horsepower?: string })[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    brand: "Porsche",
    name: "Porsche Taycan 4S Cross Turismo",
    pricePerDay: 4800000,
    rating: 5.0,
    reviewsCount: 52,
    location: "Quận 1, TP. Hồ Chí Minh",
    tags: ["800V Architecture", "Sport Chrono", "Air Suspension"],
    category: "supercar",
    batteryRange: "490 km",
    acceleration: "3.9s"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800",
    brand: "Tesla",
    name: "Tesla Model S Plaid Carbon",
    pricePerDay: 3500000,
    rating: 4.98,
    reviewsCount: 168,
    location: "Hoàn Kiếm, Hà Nội",
    tags: ["Tri-Motor AWD", "Full Self-Driving", "Yoke Steering"],
    category: "supercar",
    batteryRange: "637 km",
    acceleration: "2.1s"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    brand: "Mercedes-Maybach",
    name: "Mercedes-EQS 580 4MATIC Sedan",
    pricePerDay: 4200000,
    rating: 5.0,
    reviewsCount: 79,
    location: "Quận 1, TP. Hồ Chí Minh",
    tags: ["MBUX Hyperscreen", "Massage Seats VIP", "Burmester 3D"],
    category: "executive",
    batteryRange: "720 km",
    acceleration: "4.3s"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    brand: "VinFast",
    name: "VinFast VF 9 Plus Captain Seats",
    pricePerDay: 2400000,
    rating: 4.94,
    reviewsCount: 145,
    location: "Thảo Điền, TP. Thủ Đức",
    tags: ["Chuyên Cơ 6 Chỗ", "ADAS Level 2", "Nappa Leather"],
    category: "suv",
    batteryRange: "438 km",
    acceleration: "6.5s"
  },
  {
    id: 5,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLuSyj0T_u4FMBbb84kFm-DJbdPCKgs4Kis0SpOtk39Nqbu6wgzhm7nmSqjgakQptNBeL29nmF8wkR2WsQRlB0jAg5xGn4sRbguY56muwtmphoA3z5aJMTtWe3xwX_YSFlorWmFt36pK5j1-X-UjCmFz8MeRGCeuNddTLp1HXxb44JUUSb70fq770_18aSMG4ishM8Hh4DDjiBqbYgXT8D35l0C2FT5t4MMPYCRdEV52FoZem2xDYmNQVw",
    brand: "Tesla",
    name: "Tesla Model Y Performance Dual-Motor",
    pricePerDay: 1950000,
    rating: 4.96,
    reviewsCount: 210,
    location: "Cầu Giấy, Hà Nội",
    tags: ["Electric EV", "Autopilot HW4", "21\" Uberturbine"],
    batteryRange: "514 km",
    acceleration: "3.5s"
  },
  {
    id: 6,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLtatmAaT7GmPxFkj9tB5YjGcErjrr3U0ASymxfPkNPaIygVFOjOm32wdViOB7QjdCRYav5h_usCLkKrqnIt1BRYSKBfNuZXNfH21hahdApsV4DPt0b8pSP0iN7mGe7kjCiPv7jfdVvhPqCioRN9lymgdr5HqJTygFodW8m0gx_uILwePy2Joal1FSe9VJqoeh51dvD5rFDGmpD5K76mOTG9XaexdYmsV4ZCxaqZv_Gw_y5DLdNID4QEbYw",
    brand: "Audi",
    name: "Audi e-tron GT quattro",
    pricePerDay: 4600000,
    rating: 5.0,
    reviewsCount: 41,
    location: "Hải Châu, Đà Nẵng",
    tags: ["quattro All-Wheel", "Laser Lights", "Matrix LED"],
    batteryRange: "488 km",
    acceleration: "4.1s"
  }
];

const CarListing: React.FC = () => {
  const [cars] = useState<CarCardProps[]>(initialCars);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('price-desc');

  const filteredCars = cars
    .filter(car => {
      const matchPrice = car.pricePerDay <= maxPrice;
      const matchBrand = selectedBrand === 'All' || car.brand === selectedBrand;
      return matchPrice && matchBrand;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* Page Header */}
        <div className="pb-8 mb-8 border-b border-neutral-200/80 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-600 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> ĐỘI XE LUXURY & EV 2026
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              Tìm & Đặt Xe Thượng Lưu
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Giao xe tận sảnh 24/7 · Mở khoá Digital Key · Bảo hiểm 100% chuyến đi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-['Space_Grotesk'] text-neutral-500 uppercase tracking-wider">Sắp xếp:</span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 bg-white border border-neutral-200/80 rounded-xl text-xs font-bold font-['Space_Grotesk'] text-neutral-900 focus:outline-none cursor-pointer"
              >
                <option value="price-desc">Giá cao nhất trước</option>
                <option value="price-asc">Giá tốt nhất trước</option>
                <option value="rating">Đánh giá cao nhất (5.0★)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-neutral-950">
                <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
                <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider">Bộ lọc tìm kiếm</h3>
              </div>
              
              {/* Price Filter Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold font-['Space_Grotesk']">
                  <span className="text-neutral-500 uppercase tracking-wider">Giá tối đa:</span>
                  <span className="font-mono text-neutral-950 tabular-nums">
                    {maxPrice.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1000000" 
                  max="5000000" 
                  step="200000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>1.000.000₫</span>
                  <span>5.000.000₫</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-500">
                  Hãng xe cao cấp
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs font-bold font-['Space_Grotesk'] text-neutral-950 cursor-pointer focus:outline-none"
                >
                  <option value="All">Tất cả thương hiệu (All Brands)</option>
                  <option value="Porsche">Porsche (Taycan...)</option>
                  <option value="Tesla">Tesla (Model S, Y...)</option>
                  <option value="Mercedes-Maybach">Mercedes-Maybach (EQS...)</option>
                  <option value="VinFast">VinFast (VF 9 VIP...)</option>
                  <option value="Audi">Audi (e-tron GT...)</option>
                </select>
              </div>

              {/* Features checklist */}
              <div className="space-y-2 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
                <span className="block font-['Space_Grotesk'] font-bold text-neutral-900 uppercase tracking-wider text-[11px] mb-2">
                  Cam kết dịch vụ VIP
                </span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Bảo hiểm 2 chiều toàn diện</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Miễn phí sạc pin toàn quốc</span>
                </div>
              </div>

            </div>
          </aside>

          {/* Search Results Listing */}
          <div className="flex-grow space-y-6">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
              <span>HIỂN THỊ <strong className="text-neutral-900">{filteredCars.length}</strong> XE PHÙ HỢP</span>
              <span>100% CÒN TRỐNG</span>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 space-y-3">
                <Car className="w-12 h-12 text-neutral-300 mx-auto" />
                <h4 className="font-['Space_Grotesk'] text-base font-bold text-neutral-800">
                  Không tìm thấy xe phù hợp mức giá này
                </h4>
                <p className="text-xs text-neutral-500">
                  Vui lòng nâng mức giá tối đa trên thanh trượt hoặc chọn tất cả hãng xe.
                </p>
                <button
                  onClick={() => {
                    setMaxPrice(5000000);
                    setSelectedBrand('All');
                  }}
                  className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider mt-2 cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CarListing;

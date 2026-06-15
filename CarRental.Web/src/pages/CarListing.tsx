import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import type { CarCardProps } from '../components/CarCard';

const initialCars: CarCardProps[] = [
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
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLvbRVVYM8_URC2SfbmXOcUwsz8jUN-zeHnjIuxexa0DfjJeUG-QTB7PlmW3Qh_OMep6MFecxdb7ChdFTNJ_fiqI37YH8fL7nGz1x8GkKMnbhUigv5C-tpSBkI2dFnRdC1kpnL-mTzLm2-_7i-cXq6ynHpWK8xC4_-EX4NHw-W8yU-vJc4_wS73AbaSBc4iZTTIRWl1notOaLeVctxzfjbQEqwM7wa12RziVdahHgBfBR-YnCK7txKbAyg",
    brand: "Audi",
    name: "Audi e-tron GT",
    pricePerDay: 3000000,
    rating: 4.9,
    reviewsCount: 32,
    location: "Quận 1, TP.HCM",
    tags: ["Electric", "Luxury"]
  }
];

const CarListing: React.FC = () => {
  const [cars] = useState<CarCardProps[]>(initialCars);
  const [maxPrice, setMaxPrice] = useState(3500000);
  const [selectedBrand, setSelectedBrand] = useState('All');

  const filteredCars = cars.filter(car => {
    const matchPrice = car.pricePerDay <= maxPrice;
    const matchBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    return matchPrice && matchBrand;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-10 w-full flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow h-fit space-y-6">
            <h3 className="font-sans text-[18px] font-bold text-zinc-900">Bộ lọc tìm kiếm</h3>
            
            {/* Price Filter */}
            <div className="space-y-2">
              <label className="font-sans text-[14px] font-semibold text-zinc-700 block">
                Giá thuê tối đa: {maxPrice.toLocaleString('vi-VN')} đ
              </label>
              <input 
                type="range" 
                min="1000000" 
                max="4000000" 
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="font-sans text-[14px] font-semibold text-zinc-700 block">Hãng xe</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-sans text-[14px]"
              >
                <option value="All">Tất cả các hãng</option>
                <option value="Tesla">Tesla</option>
                <option value="Volt">Volt</option>
                <option value="E-Series">E-Series</option>
                <option value="Audi">Audi</option>
              </select>
            </div>
          </div>

          {/* Search Results Listing */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="font-sans text-[16px] text-zinc-600">
                Tìm thấy <span className="font-semibold text-primary">{filteredCars.length}</span> chiếc xe phù hợp
              </p>
              <select className="px-3 py-2 bg-white border border-zinc-200 rounded-xl font-sans text-[14px] outline-none">
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
                <option>Đánh giá tốt nhất</option>
              </select>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/50">
                <span className="material-symbols-outlined text-[64px] text-zinc-300 mb-4">no_accounts</span>
                <p className="font-sans text-[16px] text-zinc-500">Không tìm thấy chiếc xe nào phù hợp với bộ lọc.</p>
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

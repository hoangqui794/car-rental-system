import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Car, Sliders, ShieldCheck, Zap } from 'lucide-react';

const SearchWidget: React.FC = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('2026');
  const [maxPrice, setMaxPrice] = useState('All');
  const [location, setLocation] = useState('Quận 1, TP. Hồ Chí Minh');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cars');
  };

  return (
    <div className="w-full bg-[#f9f9fb] border border-[#e5e5ea] rounded-xl p-5 sm:p-6 shadow-sm">
      
      {/* Header Title with Crimson Highlight */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5e5ea]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#d32f2f] rounded-full"></span>
          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">
            Tìm Kiếm & Lọc Xe Chi Tiết
          </h3>
        </div>
        <span className="text-[11px] font-mono text-neutral-500 font-semibold">150+ XE CÓ SẴN</span>
      </div>

      <form onSubmit={handleSearch} className="space-y-3.5">
        
        {/* Row 1: Brand & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold font-['Space_Grotesk'] uppercase text-neutral-600 mb-1">
              Hãng sản xuất (Make)
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d1d1d6] rounded text-xs font-bold font-['Space_Grotesk'] text-neutral-900 focus:outline-none focus:border-[#d32f2f]"
            >
              <option value="All">Tất cả hãng (All Makes)</option>
              <option value="Porsche">Porsche</option>
              <option value="Tesla">Tesla</option>
              <option value="Mercedes-Maybach">Mercedes-Maybach</option>
              <option value="VinFast">VinFast</option>
              <option value="Audi">Audi</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold font-['Space_Grotesk'] uppercase text-neutral-600 mb-1">
              Phân khúc dòng xe (Body)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d1d1d6] rounded text-xs font-bold font-['Space_Grotesk'] text-neutral-900 focus:outline-none focus:border-[#d32f2f]"
            >
              <option value="All">Tất cả phân khúc (All Types)</option>
              <option value="Supercar">Siêu xe & Thể thao</option>
              <option value="Executive">Sedan Hạng Thương gia</option>
              <option value="SUV">SUV 6 - 7 Chỗ VIP</option>
              <option value="EV">Thuần điện EV</option>
            </select>
          </div>
        </div>

        {/* Row 2: Location & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold font-['Space_Grotesk'] uppercase text-neutral-600 mb-1">
              Nơi nhận xe (Location)
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d1d1d6] rounded text-xs font-bold font-['Space_Grotesk'] text-neutral-900 focus:outline-none focus:border-[#d32f2f]"
            >
              <option value="Quận 1, TP. Hồ Chí Minh">Quận 1, TP.HCM (Sảnh tận nơi)</option>
              <option value="Sân bay Quốc tế Tân Sơn Nhất">Sân bay Tân Sơn Nhất (Ga VIP)</option>
              <option value="Thảo Điền / Phú Mỹ Hưng">Thảo Điền & Phú Mỹ Hưng</option>
              <option value="Hoàn Kiếm, Hà Nội">Hoàn Kiếm, Hà Nội</option>
              <option value="Sân bay Quốc tế Nội Bài">Sân bay Nội Bài (Ga VIP)</option>
              <option value="Hải Châu, Đà Nẵng">Hải Châu, Đà Nẵng</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold font-['Space_Grotesk'] uppercase text-neutral-600 mb-1">
              Khoảng giá thuê / ngày
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d1d1d6] rounded text-xs font-bold font-['Space_Grotesk'] text-neutral-900 focus:outline-none focus:border-[#d32f2f]"
            >
              <option value="All">Tất cả mức giá (All Prices)</option>
              <option value="2000000">Dưới 2.000.000 ₫/ngày</option>
              <option value="3500000">Từ 2.000.000 ₫ - 3.500.000 ₫</option>
              <option value="5000000">Trên 3.500.000 ₫/ngày (VIP)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#d32f2f] hover:bg-[#b71c1c] active:scale-[0.985] text-white rounded font-['Space_Grotesk'] text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
        >
          <Search className="w-4 h-4" />
          <span>TÌM KIẾM XE NGAY (FIND VEHICLES)</span>
        </button>

      </form>
    </div>
  );
};

export default SearchWidget;

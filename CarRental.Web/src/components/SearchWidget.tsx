import React, { useState } from 'react';

const SearchWidget: React.FC = () => {
  const [location, setLocation] = useState('Quận 1, TP.HCM');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tìm kiếm xe tại ${location} từ ${startDate || 'N/A'} đến ${endDate || 'N/A'}`);
  };

  return (
    <form onSubmit={handleSearch} className="glass-panel p-6 rounded-[24px] premium-shadow grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div className="space-y-2">
        <label className="font-sans text-[12px] font-semibold tracking-wider text-zinc-600 block">Địa điểm</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">location_on</span>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[16px] appearance-none"
          >
            <option>Quận 1, TP.HCM</option>
            <option>Quận 7, TP.HCM</option>
            <option>Ba Đình, Hà Nội</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-sans text-[12px] font-semibold tracking-wider text-zinc-600 block">Ngày bắt đầu & Giờ</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">calendar_today</span>
          <input 
            type="datetime-local" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[16px]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-sans text-[12px] font-semibold tracking-wider text-zinc-600 block">Ngày kết thúc & Giờ</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">event_available</span>
          <input 
            type="datetime-local" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[16px]"
          />
        </div>
      </div>
      <button 
        type="submit" 
        className="w-full h-[52px] bg-primary text-white rounded-xl font-sans text-[14px] font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 group"
      >
        Tìm xe ngay
        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </button>
    </form>
  );
};

export default SearchWidget;

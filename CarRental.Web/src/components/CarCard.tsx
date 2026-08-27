import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Zap, Gauge, Users, ArrowRight } from 'lucide-react';

interface CarCardProps {
  id: number;
  image: string;
  brand: string;
  name: string;
  pricePerDay: number;
  rating: number;
  reviewsCount: number;
  location: string;
  tags: string[];
  batteryRange?: string;
  acceleration?: string;
  horsepower?: string;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  image,
  brand,
  name,
  pricePerDay,
  rating,
  reviewsCount,
  location,
  tags,
  batteryRange = "490 km",
  acceleration = "3.9s",
  horsepower = "530 HP"
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="showroom-card group bg-white rounded-xl border border-[#e5e5ea] overflow-hidden flex flex-col justify-between">
      
      {/* Vehicle Image Stage */}
      <div className="relative aspect-[16/10] bg-[#f5f5f7] overflow-hidden">
        <img 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out" 
          src={image} 
          loading="lazy"
        />
        
        {/* Status Badge */}
        <div className="absolute top-2.5 left-2.5 bg-[#111113] text-white px-2 py-0.5 rounded text-[10px] font-['Space_Grotesk'] font-bold uppercase tracking-wider">
          MỚI 2026
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Bỏ lưu xe" : "Lưu vào yêu thích"}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors backdrop-blur-md ${
            isFavorite 
              ? 'bg-white text-[#d32f2f]' 
              : 'bg-white/80 text-neutral-600 hover:text-[#d32f2f]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#d32f2f]' : ''}`} />
        </button>

        {/* Telemetry specs bar */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-none">
          <div className="bg-[#111113]/85 backdrop-blur-md px-2.5 py-1 rounded flex items-center gap-2 text-[10px] font-mono text-neutral-200">
            <span className="flex items-center gap-1 text-white">
              <Zap className="w-3 h-3 text-[#d32f2f]" />
              {batteryRange}
            </span>
            <span className="text-neutral-500">|</span>
            <span>0-100: {acceleration}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Name */}
          <span className="font-['Space_Grotesk'] text-[11px] font-bold uppercase tracking-widest text-[#d32f2f]">
            {brand}
          </span>
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#1a1a1a] leading-snug mt-0.5 mb-2 line-clamp-1">
            {name}
          </h3>

          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 pb-3 mb-3 border-b border-[#f0f0f2]">
            <span className="flex items-center gap-1 truncate text-[11px]">
              <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
              {location}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-neutral-800 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] font-['Space_Grotesk'] font-semibold uppercase text-neutral-400">
              Giá thuê trọn gói:
            </span>
            <div className="text-right">
              <span className="font-mono text-lg font-black text-[#d32f2f] tabular-nums">
                {pricePerDay.toLocaleString('vi-VN')}
              </span>
              <span className="text-xs font-bold text-neutral-600 font-mono"> ₫/ngày</span>
            </div>
          </div>

          <Link 
            to="/car-details" 
            className="w-full py-2.5 bg-[#1a1a1a] hover:bg-[#d32f2f] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider rounded text-center transition-all duration-150 flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span>Chi tiết & Đặt xe</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </article>
  );
};

export default CarCard;
export type { CarCardProps };

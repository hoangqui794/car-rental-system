import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
}

const CarCard: React.FC<CarCardProps> = ({
  image,
  brand,
  name,
  pricePerDay,
  rating,
  reviewsCount,
  location,
  tags,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="car-card-hover bg-white rounded-[24px] overflow-hidden border border-zinc-200/30 flex flex-col">
      <div className="relative h-64 bg-surface-container-low overflow-hidden">
        <img alt={name} className="w-full h-full object-cover" src={image} />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <span className="material-symbols-outlined text-yellow-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="font-sans text-[12px] font-bold">{rating.toFixed(1)}</span>
        </div>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
            isFavorite ? 'text-error' : 'text-zinc-500 hover:text-error'
          }`}
        >
          <span className="material-symbols-outlined" style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}>
            favorite
          </span>
        </button>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-sans text-[12px] font-semibold text-primary uppercase tracking-wide">{brand}</p>
            <h3 className="font-sans text-[24px] font-bold text-zinc-900 mt-1">{name}</h3>
          </div>
          <div className="text-right">
            <p className="font-sans text-[20px] font-bold text-primary">{formatPrice(pricePerDay)}</p>
            <p className="font-sans text-[12px] text-zinc-500">/ ngày</p>
          </div>
        </div>
        <div className="flex items-center gap-4 py-4 border-y border-zinc-200/20 my-4">
          <div className="flex items-center gap-1 text-zinc-600">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span className="font-sans text-[12px]">{location}</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-600">
            <span className="material-symbols-outlined text-[18px]">reviews</span>
            <span className="font-sans text-[12px]">{reviewsCount} đánh giá</span>
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-surface-container rounded-full font-sans text-[12px] text-zinc-600">
              {tag}
            </span>
          ))}
        </div>
        <Link 
          to="/car-details" 
          className="w-full py-4 bg-surface-container-low text-zinc-800 font-sans text-[14px] font-semibold rounded-xl hover:bg-primary hover:text-white text-center block transition-all duration-300"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
export type { CarCardProps };

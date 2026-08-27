import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchWidget from '../components/SearchWidget';
import CarCard from '../components/CarCard';
import type { CarCardProps } from '../components/CarCard';
import { 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  BatteryCharging, 
  PhoneCall, 
  Award, 
  Clock, 
  Car, 
  Users, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Compass, 
  FileText 
} from 'lucide-react';

const luxuryFleet: (CarCardProps & { category: string; horsepower?: string })[] = [
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
    acceleration: "3.9s",
    horsepower: "530 HP"
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
    acceleration: "2.1s",
    horsepower: "1,020 HP"
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
    tags: ["MBUX Hyperscreen", "Ghế Massage VIP", "Burmester 3D"],
    category: "executive",
    batteryRange: "720 km",
    acceleration: "4.3s",
    horsepower: "516 HP"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800",
    brand: "VinFast",
    name: "VinFast VF 9 Plus Captain Seats",
    pricePerDay: 2400000,
    rating: 4.94,
    reviewsCount: 145,
    location: "Thảo Điền, TP. Thủ Đức",
    tags: ["Chuyên Cơ 6 Chỗ", "ADAS Level 2", "Nappa Leather"],
    category: "suv",
    batteryRange: "438 km",
    acceleration: "6.5s",
    horsepower: "402 HP"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=800",
    brand: "Tesla",
    name: "Tesla Model Y Performance Dual-Motor",
    pricePerDay: 1950000,
    rating: 4.96,
    reviewsCount: 210,
    location: "Cầu Giấy, Hà Nội",
    tags: ["Electric EV", "Autopilot HW4", "21\" Uberturbine"],
    category: "ev",
    batteryRange: "514 km",
    acceleration: "3.5s",
    horsepower: "450 HP"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800",
    brand: "Audi",
    name: "Audi e-tron GT quattro",
    pricePerDay: 4600000,
    rating: 5.0,
    reviewsCount: 41,
    location: "Hải Châu, Đà Nẵng",
    tags: ["quattro All-Wheel", "Laser Lights", "Matrix LED"],
    category: "supercar",
    batteryRange: "488 km",
    acceleration: "4.1s",
    horsepower: "522 HP"
  }
];

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFleet = activeCategory === 'all'
    ? luxuryFleet
    : luxuryFleet.filter(car => car.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] selection:bg-[#d32f2f] selection:text-white">
      {/* Top Navbar matching Reference Header */}
      <Navbar />

      <main className="flex-1 pt-[104px]">

        {/* =========================================================================
            1. HERO SLIDER BANNER (From Studied Reference DNA)
           ========================================================================= */}
        <section className="relative h-[480px] sm:h-[560px] lg:h-[620px] bg-[#111113] overflow-hidden flex items-center">
          
          {/* Background Cinematic Vehicle Visual */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
              alt="SmartDrive Luxury Fleet Hero"
              className="w-full h-full object-cover opacity-70" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-4">
              
              <div className="inline-flex items-center gap-2 bg-[#d32f2f] text-white px-3 py-1 text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest">
                <span>DỊCH VỤ THUÊ XE THƯỢNG LƯU 2026</span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                Chuyên Nghiệp — Đẳng Cấp — Dẫn Đầu
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-['Plus_Jakarta_Sans'] max-w-xl">
                Khám phá bộ sưu tập xe điện, siêu xe thể thao và sedan thương gia hàng đầu. Trải nghiệm nhận xe số hoá trong 45 phút, bảo hiểm toàn diện 100%.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/cars"
                  className="px-6 py-3.5 bg-[#d32f2f] hover:bg-[#b71c1c] text-white rounded font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Khám phá đội xe</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:19008888"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all border border-white/30 backdrop-blur-sm inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#d32f2f]" />
                  <span>Hotline: 1900 8888</span>
                </a>
              </div>

            </div>
          </div>

        </section>

        {/* =========================================================================
            2. QUICK ACTION RIBBON (From Studied Reference DNA)
           ========================================================================= */}
        <div className="bg-[#1a1a1a] text-white border-y border-[#2d2d30] py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#d32f2f] rounded-full animate-pulse"></span>
              <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-200">
                ĐẶT LỊCH LÁI THỬ & BÀN GIAO XE TẬN SẢNH TẠI TP.HCM, HÀ NỘI & ĐÀ NẴNG
              </span>
            </div>
            <Link
              to="/cars"
              className="px-4 py-1.5 bg-[#d32f2f] hover:bg-[#b71c1c] text-white text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5"
            >
              <span>Xem lịch xe trống</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            3. 4 CORE VALUES / VALUE PROPOSITIONS (From Studied Reference DNA)
           ========================================================================= */}
        <section className="bg-[#f5f5f7] border-b border-[#e5e5ea] py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#e5e5ea] shadow-2xs">
              <div className="w-10 h-10 bg-[#f9f9fb] border border-[#e5e5ea] rounded flex items-center justify-center text-[#d32f2f] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Space_Grotesk'] text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Đội Xe Kiểm Định 50 Điểm
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                  100% xe đời mới 2024–2026, được bảo dưỡng định kỳ chính hãng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#e5e5ea] shadow-2xs">
              <div className="w-10 h-10 bg-[#f9f9fb] border border-[#e5e5ea] rounded flex items-center justify-center text-[#d32f2f] shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Space_Grotesk'] text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Công Nghệ Digital Keyless
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                  Mở khoá bằng điện thoại qua Bluetooth mã hoá, không thủ tục rườm rà.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#e5e5ea] shadow-2xs">
              <div className="w-10 h-10 bg-[#f9f9fb] border border-[#e5e5ea] rounded flex items-center justify-center text-[#d32f2f] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Space_Grotesk'] text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Giao Xe Tận Nơi Trong 45 Phút
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                  Bàn giao tại sân bay hoặc khách sạn 5 sao với pin sạc 100%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-white rounded-lg border border-[#e5e5ea] shadow-2xs">
              <div className="w-10 h-10 bg-[#f9f9fb] border border-[#e5e5ea] rounded flex items-center justify-center text-[#d32f2f] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Space_Grotesk'] text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                  Bảo Hiểm Toàn Diện 5 Tỷ
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                  Bảo trợ 100% trách nhiệm & thân vỏ bởi PJICO và Bảo Việt.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. WELCOME STORY & DETAILED SEARCH DIPTYCH (From Studied Reference DNA)
           ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Welcome Story */}
            <div className="lg:col-span-7 space-y-5">
              
              <div>
                <span className="font-['Space_Grotesk'] text-xs font-bold text-[#d32f2f] uppercase tracking-widest block mb-1">
                  CHÀO MỪNG ĐẾN VỚI SMARTDRIVE AUTOMOTIVE
                </span>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
                  Nâng tầm phong cách di chuyển của bạn
                </h2>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                SmartDrive là nền tảng tiên phong kết nối những dòng xe điện cao cấp, siêu xe thể thao và chuyên cơ mặt đất sang trọng với quý khách hàng có tiêu chuẩn khắt khe nhất. Mỗi phương tiện trong hệ thống đều trải qua quy trình thẩm định 50 bước nghiêm ngặt trước khi bàn giao.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-neutral-700 font-['Plus_Jakarta_Sans']">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d32f2f] shrink-0" />
                  <span>Đội xe chính hãng đầy đủ giấy tờ đăng kiểm, bảo dưỡng nghiêm ngặt</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d32f2f] shrink-0" />
                  <span>Minh bạch 100% chi phí, cam kết hoàn tiền cọc tự động trong 12 giờ</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d32f2f] shrink-0" />
                  <span>Hỗ trợ cứu hộ khẩn cấp và cấp xe thay thế VIP tương đương trong 30 phút</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/cars"
                  className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#d32f2f] text-white rounded text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-2xs"
                >
                  <span>Tìm hiểu thêm về dịch vụ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Right Column: Detailed Search Widget */}
            <div className="lg:col-span-5">
              <SearchWidget />
            </div>

          </div>
        </section>

        {/* =========================================================================
            5. RECENT VEHICLES / FEATURED INVENTORY (From Studied Reference DNA)
           ========================================================================= */}
        <section className="bg-[#f5f5f7] border-y border-[#e5e5ea] py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header with Red Accent Underline */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-['Space_Grotesk'] text-xs font-bold text-[#d32f2f] uppercase tracking-widest block mb-1">
                  DANH MỤC XE NỔI BẬT
                </span>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#1a1a1a] uppercase tracking-tight flex items-center gap-2">
                  <span>Recent Vehicles — Đội Xe Mới Nhất</span>
                </h2>
                <div className="w-16 h-1 bg-[#d32f2f] mt-2"></div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-[#e5e5ea]">
                {[
                  { key: 'all', label: 'Tất cả xe' },
                  { key: 'supercar', label: 'Siêu xe & Thể thao' },
                  { key: 'executive', label: 'Sedan Thương gia' },
                  { key: 'suv', label: 'SUV 6-7 Chỗ VIP' },
                  { key: 'ev', label: 'Thuần điện EV' }
                ].map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3 py-1.5 text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider rounded transition-all cursor-pointer ${
                      activeCategory === cat.key
                        ? 'bg-[#d32f2f] text-white shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Car Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFleet.map(car => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 text-center">
              <Link
                to="/cars"
                className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#d32f2f] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <span>Xem tất cả 150+ xe trong showroom</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================================
            6. 5-COLUMN SERVICES & OPERATIONS (From Studied Reference DNA)
           ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-['Space_Grotesk'] text-xs font-bold text-[#d32f2f] uppercase tracking-widest block mb-1">
              DỊCH VỤ CHUYÊN NGHIỆP
            </span>
            <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#1a1a1a] uppercase tracking-tight">
              Giải Pháp Di Chuyển Hoàn Hảo
            </h3>
            <div className="w-12 h-1 bg-[#d32f2f] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="p-5 bg-[#f9f9fb] border border-[#e5e5ea] rounded-xl space-y-2.5">
              <div className="w-8 h-8 bg-[#d32f2f] text-white rounded flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#1a1a1a]">
                Thuê Xe Tự Lái VIP
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Tự do cầm lái các dòng xe thể thao và xe điện cao cấp đời mới 2026.
              </p>
            </div>

            <div className="p-5 bg-[#f9f9fb] border border-[#e5e5ea] rounded-xl space-y-2.5">
              <div className="w-8 h-8 bg-[#1a1a1a] text-white rounded flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#1a1a1a]">
                Tài Xế Riêng Chauffeur
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Tài xế chuyên nghiệp, lịch thiệp, giao tiếp tiếng Anh phục vụ lãnh đạo & VIP.
              </p>
            </div>

            <div className="p-5 bg-[#f9f9fb] border border-[#e5e5ea] rounded-xl space-y-2.5">
              <div className="w-8 h-8 bg-[#d32f2f] text-white rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#1a1a1a]">
                Gửi Xe Cho Thuê
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Tối ưu dòng tiền 25 – 60 triệu/tháng cho chủ sở hữu xe nhàn rỗi.
              </p>
            </div>

            <div className="p-5 bg-[#f9f9fb] border border-[#e5e5ea] rounded-xl space-y-2.5">
              <div className="w-8 h-8 bg-[#1a1a1a] text-white rounded flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#1a1a1a]">
                Phục Vụ & Cứu Hộ 24/7
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Đội ngũ túc trực 24/7, sẵn sàng hỗ trợ kỹ thuật và giao xe bất kể ngày đêm.
              </p>
            </div>

            <div className="p-5 bg-[#f9f9fb] border border-[#e5e5ea] rounded-xl space-y-2.5">
              <div className="w-8 h-8 bg-[#d32f2f] text-white rounded flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase text-[#1a1a1a]">
                Trạm Sạc & Giao Xe
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Mạng lưới hơn 1.200 trạm sạc đối tác miễn phí trên khắp 63 tỉnh thành.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            7. DARK STATISTICS COUNTER (From Studied Reference DNA)
           ========================================================================= */}
        <section className="bg-[#1a1a1a] text-white py-14 px-4 sm:px-6 lg:px-8 border-y border-[#2d2d30]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="font-mono text-3xl sm:text-4xl font-black text-[#d32f2f] tabular-nums block">
                2,500+
              </span>
              <p className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-neutral-300">
                Chuyến Xe Hoàn Tất
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white tabular-nums block">
                150+
              </span>
              <p className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-neutral-300">
                Xe Sang & EV Sẵn Sàng
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-3xl sm:text-4xl font-black text-[#d32f2f] tabular-nums block">
                100%
              </span>
              <p className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-neutral-300">
                Khách Hàng Hài Lòng
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white tabular-nums block">
                45 Phút
              </span>
              <p className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-neutral-300">
                Bàn Giao Tận Sảnh VIP
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

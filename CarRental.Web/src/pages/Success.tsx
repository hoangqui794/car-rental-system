import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle2, ShieldCheck, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-lg mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col justify-center items-center text-center space-y-6">
        
        {/* Luxury Confirmation Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            XÁC THỰC THÀNH CÔNG
          </span>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            Đặt Xe & Thanh Toán Thành Công
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
            Chuyến đi của bạn đã được xác nhận. Đội ngũ Concierge sẽ chuẩn bị xe và bàn giao tận nơi theo đúng lịch hẹn.
          </p>
        </div>

        {/* Receipt Voucher Card */}
        <div className="w-full bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm text-left space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-neutral-100 pb-2.5">
            <span className="text-neutral-400">MÃ ĐẶT XE VIP</span>
            <span className="font-bold text-neutral-950">#SD-98271</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 pb-2.5">
            <span className="text-neutral-400">DÒNG PHƯƠNG TIỆN</span>
            <span className="font-bold text-neutral-950">Porsche Taycan 4S Cross</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 pb-2.5">
            <span className="text-neutral-400">CHÌA KHÓA DIGITAL</span>
            <span className="font-bold text-blue-600 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Đã gửi qua SMS & App
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">TRẠNG THÁI</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Đã thanh toán 100%
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider">
          <Link 
            to="/profile" 
            className="flex-1 py-3.5 bg-neutral-950 hover:bg-blue-600 text-white rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-neutral-950/10 cursor-pointer"
          >
            <span>Quản lý chuyến đi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/" 
            className="flex-1 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 rounded-xl text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Success;

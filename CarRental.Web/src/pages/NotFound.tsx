import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-md mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col justify-center items-center text-center space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-neutral-950 text-white flex items-center justify-center border border-neutral-800 shadow-lg">
          <Compass className="w-10 h-10 text-amber-400" />
        </div>
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">
            LỖI ĐỊNH TUYẾN 404
          </span>
          <h1 className="font-['Space_Grotesk'] text-3xl font-black text-neutral-950 tracking-tight">
            Không Tìm Thấy Trang
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
            Đường dẫn bạn đang truy cập có thể đã được chuyển đổi hoặc không tồn tại trong hệ sinh thái SmartDrive.
          </p>
        </div>

        <Link 
          to="/" 
          className="px-6 py-3.5 bg-neutral-950 hover:bg-blue-600 active:scale-[0.985] text-white rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-md shadow-neutral-950/10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chủ</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

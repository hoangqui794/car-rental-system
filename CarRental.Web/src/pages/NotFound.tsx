import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-md mx-auto px-6 w-full flex-grow flex flex-col justify-center items-center text-center space-y-6">
        <div className="text-primary animate-pulse">
          <span className="material-symbols-outlined text-[96px]">
            car_crash
          </span>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-sans text-[64px] font-extrabold text-primary leading-none">404</h1>
          <h2 className="font-sans text-[20px] font-bold text-zinc-800">Không tìm thấy trang</h2>
          <p className="font-sans text-[14px] text-zinc-500">
            Đường dẫn bạn đang truy cập có thể đã bị thay đổi hoặc không còn tồn tại trên hệ thống.
          </p>
        </div>

        <Link 
          to="/" 
          className="px-8 py-3 bg-primary text-white rounded-xl font-sans text-[14px] font-semibold hover:bg-primary-container transition-all shadow-md shadow-primary/10"
        >
          Quay lại trang chủ
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

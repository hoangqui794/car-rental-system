import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-md mx-auto px-6 w-full flex-grow flex flex-col justify-center items-center text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-bounce">
          <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-sans text-[28px] font-bold text-zinc-900">Đặt xe thành công!</h1>
          <p className="font-sans text-[15px] text-zinc-500">
            Cảm ơn bạn đã lựa chọn dịch vụ của SmartDrive. Đơn hàng của bạn đã được xác nhận.
          </p>
        </div>

        <div className="w-full bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow text-left space-y-3 font-sans text-[14px]">
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Mã đặt xe</span>
            <span className="font-bold text-primary">#SD-98271</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Dòng xe</span>
            <span className="font-medium text-zinc-800">Mitsubishi Xpander 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Trạng thái</span>
            <span className="font-bold text-green-600">Đã thanh toán</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link 
            to="/profile" 
            className="flex-1 py-3 bg-primary text-white rounded-xl font-sans text-[14px] font-semibold hover:bg-primary-container text-center transition-all shadow-md shadow-primary/10"
          >
            Chuyến đi của tôi
          </Link>
          <Link 
            to="/" 
            className="flex-1 py-3 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 rounded-xl font-sans text-[14px] font-semibold text-center transition-all"
          >
            Về trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;

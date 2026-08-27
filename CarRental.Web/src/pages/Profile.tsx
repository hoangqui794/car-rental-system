import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, ShieldCheck, Star, Car, Calendar, DollarSign, X, MessageSquare, CheckCircle2, Crown } from 'lucide-react';

interface BookingHistory {
  id: number;
  carName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'Completed' | 'Cancelled' | 'Active';
  image: string;
  plate: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trips' | 'profile'>('trips');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedCarName, setSelectedCarName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [trips] = useState<BookingHistory[]>([
    {
      id: 1,
      carName: 'Porsche Taycan 4S Cross Turismo',
      plate: '51K-889.23',
      startDate: '12/10/2026',
      endDate: '14/10/2026',
      totalPrice: 9600000,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      carName: 'Tesla Model S Plaid Carbon',
      plate: '51H-123.45',
      startDate: '20/11/2026',
      endDate: '21/11/2026',
      totalPrice: 3500000,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  const handleOpenReview = (carName: string) => {
    setSelectedCarName(carName);
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cảm ơn bạn đã gửi đánh giá ${rating}★ cho ${selectedCarName}: "${comment}"`);
    setShowReviewModal(false);
    setComment('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        
        {/* Page Header */}
        <div className="pb-6 mb-8 border-b border-neutral-200/80">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 font-bold uppercase tracking-wider mb-1">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            SMARTDRIVE BLACK CARD MEMBER
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-black text-neutral-950 tracking-tight">
            Tài Khoản & Hành Trình Của Bạn
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Profile Identity Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-neutral-900 text-white mx-auto flex items-center justify-center font-['Space_Grotesk'] font-bold text-2xl border-2 border-amber-400">
                HQ
              </div>
              <div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950">Trần Hoàng Quân</h3>
                <p className="text-xs font-mono text-neutral-400">Hội viên VIP từ 2024 · 5 chuyến hoàn tất</p>
              </div>
              
              <div className="flex flex-col gap-1.5 pt-4 border-t border-neutral-100 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider">
                <button 
                  onClick={() => setActiveTab('trips')}
                  className={`py-2.5 px-4 rounded-xl text-left transition-all cursor-pointer ${
                    activeTab === 'trips' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  Lịch sử chuyến đi
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`py-2.5 px-4 rounded-xl text-left transition-all cursor-pointer ${
                    activeTab === 'profile' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  Hồ sơ định danh eKYC
                </button>
              </div>
            </div>

            <div className="bg-neutral-950 text-white rounded-3xl p-6 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" /> ĐÃ XÁC MINH DANH TÍNH
              </div>
              <p className="text-xs text-neutral-400 leading-snug">
                Tài khoản của bạn đã hoàn tất eKYC và kích hoạt mở khoá tức thì qua chìa khoá số Digital Keyless.
              </p>
            </div>
          </div>

          {/* Right Details Container */}
          <div className="lg:col-span-8">
            {activeTab === 'profile' ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                <h2 className="font-['Space_Grotesk'] text-lg font-bold text-neutral-950 uppercase tracking-wider pb-3 border-b border-neutral-100">
                  Thông tin cá nhân & Giấy phép
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-1">
                    <span className="text-neutral-400 block uppercase">Họ và tên</span>
                    <span className="font-bold text-sm text-neutral-950">Trần Hoàng Quân</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-1">
                    <span className="text-neutral-400 block uppercase">Số điện thoại</span>
                    <span className="font-bold text-sm text-neutral-950">0918 234 567</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-1">
                    <span className="text-neutral-400 block uppercase">Email liên hệ</span>
                    <span className="font-bold text-sm text-neutral-950">quan.tran@gmail.com</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-1">
                    <span className="text-neutral-400 block uppercase">Hạng bằng lái xe</span>
                    <span className="font-bold text-sm text-emerald-600">B2 (GPLX-790123456789)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 text-xs font-mono text-neutral-500">
                  <span>LỊCH SỬ {trips.length} CHUYẾN ĐI GẦN NHẤT</span>
                  <span>100% HOÀN CỌC ĐẦY ĐỦ</span>
                </div>
                
                {trips.map((trip) => (
                  <div key={trip.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-24 h-20 bg-neutral-100 rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-200/60">
                        <img alt={trip.carName} className="w-full h-full object-cover" src={trip.image} />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-['Space_Grotesk'] text-sm font-bold text-neutral-950">
                          {trip.carName}
                        </h3>
                        <p className="font-mono text-xs text-neutral-500">
                          Biển số: {trip.plate} · {trip.startDate} - {trip.endDate}
                        </p>
                        <p className="font-mono text-xs font-bold text-neutral-900 tabular-nums">
                          Tổng chi phí: {trip.totalPrice.toLocaleString('vi-VN')} ₫
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Đã hoàn thành
                      </span>

                      <button 
                        onClick={() => handleOpenReview(trip.carName)}
                        className="px-3.5 py-1.5 bg-neutral-950 hover:bg-blue-600 text-white rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Đánh giá xe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                <h3 className="font-['Space_Grotesk'] text-lg font-black text-neutral-950">Đánh Giá Trải Nghiệm Xe</h3>
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-600">
                Hãy chia sẻ cảm nhận thực tế của bạn khi cầm lái dòng xe <strong>{selectedCarName}</strong>:
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-110 cursor-pointer ${
                        rating >= star ? 'text-amber-400' : 'text-neutral-200'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Xe sạch sẽ, khả năng tăng tốc mượt mà, bàn giao đúng giờ..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-xs outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-neutral-950 hover:bg-blue-600 text-white font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest rounded-xl text-center transition-all cursor-pointer shadow-xs"
                >
                  Gửi đánh giá xác thực
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Profile;

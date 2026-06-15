import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface BookingHistory {
  id: number;
  carName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  image: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trips');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedCarName, setSelectedCarName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [trips] = useState<BookingHistory[]>([
    {
      id: 1,
      carName: 'Mitsubishi Xpander 2023',
      startDate: '12/10/2023',
      endDate: '15/10/2023',
      totalPrice: 2550000,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      carName: 'Tesla Model Y',
      startDate: '20/11/2023',
      endDate: '22/11/2023',
      totalPrice: 3600000,
      status: 'Cancelled',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  const handleOpenReview = (carName: string) => {
    setSelectedCarName(carName);
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Đã gửi đánh giá ${rating} sao cho ${selectedCarName}: "${comment}"`);
    setShowReviewModal(false);
    setComment('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left profile summary card */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow h-fit text-center space-y-4">
            <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto overflow-hidden">
              <img 
                alt="Avatar" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
              />
            </div>
            <div>
              <h3 className="font-sans text-[18px] font-bold text-zinc-900">Nguyễn Văn A</h3>
              <p className="font-sans text-[12px] text-zinc-500">Thành viên từ 2024</p>
            </div>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-100 text-sans text-[14px]">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-4 rounded-xl text-left transition-colors ${
                  activeTab === 'profile' ? 'bg-primary/10 text-primary font-semibold' : 'text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                Thông tin cá nhân
              </button>
              <button 
                onClick={() => setActiveTab('trips')}
                className={`py-2 px-4 rounded-xl text-left transition-colors ${
                  activeTab === 'trips' ? 'bg-primary/10 text-primary font-semibold' : 'text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                Chuyến đi của tôi
              </button>
            </div>
          </div>

          {/* Right details area */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' ? (
              <div className="bg-white rounded-3xl p-8 border border-zinc-200/50 premium-shadow space-y-6">
                <h2 className="font-sans text-[22px] font-bold text-zinc-900">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="font-sans text-[12px] text-zinc-500 font-semibold">Họ và tên</p>
                    <p className="font-sans text-[15px] font-bold text-zinc-800">Nguyễn Văn A</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-[12px] text-zinc-500 font-semibold">Số điện thoại</p>
                    <p className="font-sans text-[15px] font-bold text-zinc-800">0901234567</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-[12px] text-zinc-500 font-semibold">Email</p>
                    <p className="font-sans text-[15px] font-bold text-zinc-800">nguyenvana@gmail.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-[12px] text-zinc-500 font-semibold">Bằng lái xe hạng</p>
                    <p className="font-sans text-[15px] font-bold text-zinc-800">B2 (Đã xác minh)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="font-sans text-[22px] font-bold text-zinc-900 mb-6">Lịch sử đặt xe</h2>
                
                {trips.map((trip) => (
                  <div key={trip.id} className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-32 h-24 bg-zinc-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <img alt={trip.carName} className="w-full h-full object-cover" src={trip.image} />
                    </div>
                    
                    <div className="flex-grow space-y-2 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <h3 className="font-sans text-[18px] font-bold text-zinc-800">{trip.carName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          trip.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trip.status === 'Completed' ? 'Đã hoàn thành' : 'Đã hủy'}
                        </span>
                      </div>
                      <p className="font-sans text-[12px] text-zinc-500">Thời gian thuê: {trip.startDate} - {trip.endDate}</p>
                      <p className="font-sans text-[14px] font-bold text-primary">Tổng tiền: {trip.totalPrice.toLocaleString('vi-VN')} đ</p>
                    </div>

                    <div className="flex-shrink-0">
                      {trip.status === 'Completed' && (
                        <button 
                          onClick={() => handleOpenReview(trip.carName)}
                          className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-sans text-[13px] font-semibold transition-all"
                        >
                          Viết đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Write Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 space-y-6 premium-shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-sans text-[20px] font-bold text-zinc-900">Đánh giá chuyến đi</h3>
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <p className="font-sans text-[14px] text-zinc-600">Bạn đánh giá chất lượng xe <strong>{selectedCarName}</strong> như thế nào?</p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-[32px] ${rating >= star ? 'text-yellow-500' : 'text-zinc-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700">Lời nhận xét</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Hãy chia sẻ trải nghiệm thực tế của bạn..."
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none resize-none"
                  />
                </div>

                <button type="submit" className="w-full py-3 bg-primary text-white font-sans text-[14px] font-semibold rounded-xl hover:bg-primary-container transition-all">
                  Gửi đánh giá
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

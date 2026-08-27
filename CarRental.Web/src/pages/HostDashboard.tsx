import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DollarSign, Car, Activity, Plus, X, ShieldCheck, CheckCircle2, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface HostCar {
  id: number;
  name: string;
  plate: string;
  status: 'Available' | 'Rented' | 'Maintenance';
  pricePerDay: number;
  earnings: number;
}

const HostDashboard: React.FC = () => {
  const [cars, setCars] = useState<HostCar[]>([
    { id: 1, name: 'Porsche Taycan 4S Cross', plate: '51K-889.23', status: 'Available', pricePerDay: 4800000, earnings: 42500000 },
    { id: 2, name: 'Tesla Model Y Dual-Motor', plate: '51H-123.45', status: 'Rented', pricePerDay: 1950000, earnings: 28400000 }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCarName, setNewCarName] = useState('');
  const [newCarPlate, setNewCarPlate] = useState('');
  const [newCarPrice, setNewCarPrice] = useState('');

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: HostCar = {
      id: cars.length + 1,
      name: newCarName,
      plate: newCarPlate,
      status: 'Available',
      pricePerDay: Number(newCarPrice) || 2500000,
      earnings: 0
    };
    setCars([...cars, newCar]);
    setShowAddModal(false);
    setNewCarName('');
    setNewCarPlate('');
    setNewCarPrice('');
    alert('Đăng ký xe mới thành công! Hồ sơ đang được kiểm định.');
  };

  const totalEarnings = cars.reduce((sum, c) => sum + c.earnings, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              QUẢN TRỊ ĐỘI XE ĐỐI TÁC CHỦ XE
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl font-black text-neutral-950 tracking-tight">
              Bảng Điều Khiển Chủ Xe
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">
              Theo dõi tình trạng hoạt động và doanh thu tích luỹ của từng phương tiện
            </p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-blue-600 active:scale-[0.985] text-white rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Đăng ký xe mới</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-400 font-semibold uppercase">Doanh thu tích luỹ</p>
              <p className="font-mono text-xl sm:text-2xl font-black text-neutral-950 tabular-nums">
                {totalEarnings.toLocaleString('vi-VN')} ₫
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-400 font-semibold uppercase">Tổng số xe gửi</p>
              <p className="font-mono text-xl sm:text-2xl font-black text-neutral-950 tabular-nums">
                {cars.length} Phương tiện
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-xs text-neutral-400 font-semibold uppercase">Hiệu suất cho thuê</p>
              <p className="font-mono text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">
                92.5% Hoạt động
              </p>
            </div>
          </div>
        </div>

        {/* Fleet Table */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold text-neutral-950 uppercase tracking-wider">
              Danh sách phương tiện của bạn
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              Định vị GPS AI: Kích hoạt
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-500 font-mono text-xs uppercase tracking-wider">
                  <th className="px-6 py-3.5">Tên dòng xe</th>
                  <th className="px-6 py-3.5">Biển số</th>
                  <th className="px-6 py-3.5">Giá thuê/ngày</th>
                  <th className="px-6 py-3.5">Doanh thu thu về</th>
                  <th className="px-6 py-3.5">Trạng thái</th>
                  <th className="px-6 py-3.5 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-xs">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold font-['Space_Grotesk'] text-sm text-neutral-950">
                      {car.name}
                    </td>
                    <td className="px-6 py-4 text-neutral-600 font-mono font-semibold">
                      {car.plate}
                    </td>
                    <td className="px-6 py-4 font-bold text-neutral-900 tabular-nums">
                      {car.pricePerDay.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600 tabular-nums">
                      {car.earnings.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold inline-flex items-center gap-1 ${
                        car.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        car.status === 'Rented' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${car.status === 'Available' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                        {car.status === 'Available' ? 'Sẵn sàng' : car.status === 'Rented' ? 'Đang chạy' : 'Bảo trì'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-neutral-900 hover:text-blue-600 font-['Space_Grotesk'] font-bold uppercase tracking-wider text-xs inline-flex items-center gap-0.5 cursor-pointer">
                        <span>Lịch trình</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Car Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                <h3 className="font-['Space_Grotesk'] text-lg font-black text-neutral-950">Đăng Ký Thêm Xe</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCar} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1">
                    Tên & Đời xe
                  </label>
                  <input
                    type="text"
                    required
                    value={newCarName}
                    onChange={(e) => setNewCarName(e.target.value)}
                    placeholder="Mercedes-Benz S450 2024"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-xs font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1">
                    Biển số xe
                  </label>
                  <input
                    type="text"
                    required
                    value={newCarPlate}
                    onChange={(e) => setNewCarPlate(e.target.value)}
                    placeholder="51H-998.88"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider text-neutral-700 mb-1">
                    Giá thuê mong muốn / ngày (VNĐ)
                  </label>
                  <input
                    type="number"
                    required
                    value={newCarPrice}
                    onChange={(e) => setNewCarPrice(e.target.value)}
                    placeholder="3500000"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl focus:border-neutral-950 focus:bg-white text-xs font-mono outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-neutral-950 hover:bg-blue-600 text-white font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest rounded-xl text-center transition-all cursor-pointer shadow-xs"
                >
                  Lưu & Gửi Phê Duyệt Xe
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

export default HostDashboard;

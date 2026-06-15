import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    { id: 1, name: 'Mitsubishi Xpander 2023', plate: '51H-987.65', status: 'Available', pricePerDay: 850000, earnings: 12500000 },
    { id: 2, name: 'Toyota Vios 2022', plate: '51K-123.45', status: 'Rented', pricePerDay: 600000, earnings: 8400000 }
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
      pricePerDay: Number(newCarPrice) || 700000,
      earnings: 0
    };
    setCars([...cars, newCar]);
    setShowAddModal(false);
    setNewCarName('');
    setNewCarPlate('');
    setNewCarPrice('');
    alert('Thêm xe mới thành công! Đang chờ duyệt hồ sơ.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-10 w-full flex-grow space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-sans text-[28px] font-bold text-zinc-900">Quản lý đội xe của bạn</h1>
            <p className="font-sans text-[14px] text-zinc-500">Xem doanh thu và cập nhật trạng thái hoạt động của xe</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-sans text-[14px] font-semibold hover:bg-primary-container transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Đăng xe mới
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">payments</span>
            </div>
            <div>
              <p className="font-sans text-[12px] text-zinc-500">Tổng doanh thu tháng</p>
              <p className="font-sans text-[20px] font-bold text-zinc-800">20.900.000 đ</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined text-[28px]">directions_car</span>
            </div>
            <div>
              <p className="font-sans text-[12px] text-zinc-500">Tổng số xe gửi</p>
              <p className="font-sans text-[20px] font-bold text-zinc-800">{cars.length} chiếc xe</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 premium-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined text-[28px]">trending_up</span>
            </div>
            <div>
              <p className="font-sans text-[12px] text-zinc-500">Hiệu suất cho thuê</p>
              <p className="font-sans text-[20px] font-bold text-zinc-800">82%</p>
            </div>
          </div>
        </div>

        {/* Fleet Table */}
        <div className="bg-white rounded-3xl border border-zinc-200/50 premium-shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h3 className="font-sans text-[18px] font-bold text-zinc-800">Đội xe</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 font-sans text-[12px] font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Tên xe</th>
                  <th className="px-6 py-4">Biển số</th>
                  <th className="px-6 py-4">Giá thuê/ngày</th>
                  <th className="px-6 py-4">Doanh thu tích lũy</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans text-[14px]">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-zinc-800">{car.name}</td>
                    <td className="px-6 py-4 text-zinc-600">{car.plate}</td>
                    <td className="px-6 py-4 text-zinc-800">{car.pricePerDay.toLocaleString('vi-VN')} đ</td>
                    <td className="px-6 py-4 text-zinc-800 font-medium">{car.earnings.toLocaleString('vi-VN')} đ</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        car.status === 'Available' ? 'bg-green-100 text-green-800' :
                        car.status === 'Rented' ? 'bg-primary/10 text-primary' : 'bg-zinc-100 text-zinc-800'
                      }`}>
                        {car.status === 'Available' ? 'Sẵn sàng' : car.status === 'Rented' ? 'Đang thuê' : 'Bảo trì'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:text-primary-container font-semibold">Chỉnh sửa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Car Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 space-y-6 premium-shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-sans text-[20px] font-bold text-zinc-900">Đăng ký thêm xe</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleAddCar} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700">Tên xe & Đời xe</label>
                  <input
                    type="text"
                    required
                    value={newCarName}
                    onChange={(e) => setNewCarName(e.target.value)}
                    placeholder="Toyota Fortuner 2022"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700">Biển số xe</label>
                  <input
                    type="text"
                    required
                    value={newCarPlate}
                    onChange={(e) => setNewCarPlate(e.target.value)}
                    placeholder="51H-123.45"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-[14px] font-semibold text-zinc-700">Giá thuê/ngày (VNĐ)</label>
                  <input
                    type="number"
                    required
                    value={newCarPrice}
                    onChange={(e) => setNewCarPrice(e.target.value)}
                    placeholder="700000"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 font-sans text-[14px] outline-none"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-white font-sans text-[14px] font-semibold rounded-xl hover:bg-primary-container transition-all">
                  Lưu & Gửi phê duyệt
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

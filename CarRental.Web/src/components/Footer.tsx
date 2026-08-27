import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-neutral-300 border-t border-[#2d2d30]">
      
      {/* Main 3-Column Footer Section (Studied from Reference DNA) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#d32f2f] rounded flex items-center justify-center text-white">
                <Car className="w-4 h-4" />
              </div>
              <span className="font-['Space_Grotesk'] font-bold text-lg text-white tracking-tight">
                SMARTDRIVE
              </span>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed">
              Hệ thống dịch vụ cho thuê xe thể thao, xe điện và xe sang hàng đầu. Bàn giao tận nơi tại Hà Nội, TP.HCM & Đà Nẵng với tiêu chuẩn 5 sao.
            </p>

            <div className="pt-2">
              <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-white mb-2">
                Đăng ký nhận ưu đãi độc quyền
              </h4>
              <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận tin từ SmartDrive!'); }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  className="px-3.5 py-2 bg-[#252528] border border-[#3a3a3e] rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d32f2f] flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Recent Articles & Fleet Quick Links */}
          <div className="space-y-3">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-white pb-2 border-b border-[#2d2d30] flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#d32f2f]"></span>
              Dịch Vụ & Danh Mục Xe
            </h3>
            
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/cars" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#d32f2f]" /> Thuê xe tự lái cao cấp (Self-Drive VIP)
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#d32f2f]" /> Chuyên cơ mặt đất có tài xế riêng (Chauffeur)
                </Link>
              </li>
              <li>
                <Link to="/become-host" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#d32f2f]" /> Hợp tác ký gửi & cho thuê xe sinh lời
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#d32f2f]" /> Quy trình bàn giao xe không chạm (Digital Key)
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#d32f2f]" /> Chính sách bảo hiểm toàn phần 5 Tỷ VNĐ
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Showroom & Contact Info */}
          <div className="space-y-3">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-white pb-2 border-b border-[#2d2d30] flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#d32f2f]"></span>
              Hệ Thống Showroom & Hotline
            </h3>

            <div className="space-y-2.5 text-xs text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d32f2f] shrink-0 mt-0.5" />
                <span>Showroom 1: Số 88 Nguyễn Du, P. Bến Nghé, Quận 1, TP.HCM</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d32f2f] shrink-0 mt-0.5" />
                <span>Showroom 2: Số 12 Ngô Quyền, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội</span>
              </p>
              <p className="flex items-center gap-2 text-white font-bold font-mono">
                <Phone className="w-4 h-4 text-[#d32f2f] shrink-0" />
                <span>Hotline 24/7: 1900 8888 / 0918 234 567</span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>support@smartdrive.vn</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Phục vụ giao nhận xe: 24/7 tất cả các ngày trong tuần</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#111113] border-t border-[#252528] py-4 text-neutral-500 text-[11px] font-['Space_Grotesk']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© 2026 SmartDrive Technologies JSC. Đăng ký kinh doanh số 0317892341.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">Chính sách bảo mật</span>
            <span>·</span>
            <span className="hover:text-neutral-300 cursor-pointer">Điều khoản dịch vụ</span>
            <span>·</span>
            <span className="text-[#d32f2f] font-mono font-bold">Hệ thống: Trực tuyến 100%</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

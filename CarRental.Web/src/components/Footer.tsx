import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-200/50">
      <div className="max-w-[1280px] mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-xs">
            <h2 className="font-sans text-[24px] font-bold text-primary mb-4">SMARTDRIVE</h2>
            <p className="font-sans text-[16px] text-zinc-600">
              Nâng tầm trải nghiệm thuê xe với công nghệ và sự tiện nghi đỉnh cao.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">
            <div>
              <h4 className="font-sans text-[14px] font-semibold text-zinc-800 mb-4">Nền tảng</h4>
              <ul className="space-y-3 font-sans text-[16px] text-zinc-600">
                <li><a className="hover:text-primary transition-colors" href="#">Tìm xe</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Trở thành chủ xe</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Ứng dụng di động</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[14px] font-semibold text-zinc-800 mb-4">Hỗ trợ</h4>
              <ul className="space-y-3 font-sans text-[16px] text-zinc-600">
                <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Cẩm nang lái xe</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[14px] font-semibold text-zinc-800 mb-4">Pháp lý</h4>
              <ul className="space-y-3 font-sans text-[16px] text-zinc-600">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-zinc-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[12px] text-zinc-500">© 2026 SmartDrive Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-zinc-600 hover:text-primary transition-colors" href="#">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </a>
            <a className="text-zinc-600 hover:text-primary transition-colors" href="#">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

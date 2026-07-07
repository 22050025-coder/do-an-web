# ĐỒ ÁN: HỆ THỐNG QUẢN LÝ KHÓA HỌC TRỰC TUYẾN (COURSEHUB)

CourseHub là một nền tảng học tập trực tuyến (E-Learning) hiện đại, cho phép người dùng đăng ký tài khoản, nạp tiền vào ví, mua và tham gia các khóa học chất lượng cao. Hệ thống được phân quyền chặt chẽ giữa Quản trị viên (Admin) và Học viên (Student).

## 🚀 CÔNG NGHỆ SỬ DỤNG
Dự án được xây dựng theo kiến trúc Client-Server (Phân tách hoàn toàn Frontend và Backend):
- **Frontend:** Vanilla HTML5, CSS3 (Premium Design, Glassmorphism, Micro-animations), Javascript.
- **Backend:** Node.js, Express.js (RESTful API).
- **Database:** MongoDB (Sử dụng Mongoose ODM).
- **Bảo mật:** JWT (JSON Web Token) cho Authentication, Bcrypt để mã hóa mật khẩu.

## ☁️ HẠ TẦNG ĐÁM MÂY (CLOUD DEPLOYMENT)
Dự án đã được triển khai thực tế trên môi trường Internet thông qua 3 nhà cung cấp Cloud hàng đầu:
1. **Frontend Hosting:** [Vercel](https://vercel.com) - Mạng phân phối nội dung tốc độ cao (CDN).
2. **Backend API:** [Render](https://render.com) - Đóng gói và chạy tiến trình Node.js tự động.
3. **DatabaseaaS:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cơ sở dữ liệu đám mây hoạt động 24/7.

## 🌟 CHỨC NĂNG NỔI BẬT (FEATURES)
### 1. Phân quyền Người dùng (RBAC)
- **Học viên (Student):** Đăng nhập/Đăng ký, xem danh sách khóa học, nạp tiền vào ví (yêu cầu chờ duyệt), mua khóa học bằng tiền trong ví, xem video bài giảng.
- **Quản trị viên (Admin):** Có đặc quyền vào học tất cả các khóa học miễn phí 100%, có quyền xét duyệt tiền nạp vào ví cho người dùng, quản lý hệ thống.

### 2. Giao diện (UI/UX)
- Thiết kế hiện đại, màu sắc gradient cao cấp.
- Hệ thống nhãn dán (Badge) và Đánh giá (Rating) cho từng khóa học.
- Responsive tương thích mọi thiết bị.

## 💻 HƯỚNG DẪN CÀI ĐẶT CHẠY Ở MÁY TÍNH (LOCAL)

### Bước 1: Khởi động Backend (Máy chủ API)
1. Mở Terminal (Command Prompt) và di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
2. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
3. Chạy máy chủ:
   ```bash
   node server.js
   ```
   *(Máy chủ sẽ chạy tại địa chỉ: `http://localhost:5000`)*

### Bước 2: Khởi động Frontend (Giao diện)
1. Mở thư mục `frontend` bằng phần mềm VS Code.
2. Cài đặt Extension **Live Server** trên VS Code (nếu chưa có).
3. Mở file `index.html`, chuột phải và chọn **"Open with Live Server"**.
4. Trình duyệt sẽ tự động mở trang web.

---
**Lưu ý cho Giảng viên (Giám khảo):** 
Dự án có đi kèm file `Database_Script.js` ghi lại toàn bộ cấu trúc các Collections của MongoDB. Hiện tại, dữ liệu đang được lấy trực tiếp từ MongoDB Atlas Cloud để đảm bảo tính thời gian thực (Real-time).

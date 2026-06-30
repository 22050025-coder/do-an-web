// Nhận diện xem web đang chạy ở máy tính (Local) hay trên mạng (Cloud)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// URL Backend từ Render (đã tự động lấy từ hình ảnh của bạn)
const CLOUD_API_URL = 'https://do-an-web-jbze.onrender.com/api'; 

// Cấu hình API URL tự động đảo nguồn
const CONFIG = {
    API_URL: isLocalhost ? 'http://localhost:5000/api' : CLOUD_API_URL,
};

// Lưu và lấy token từ LocalStorage
const TokenService = {
    getToken: () => localStorage.getItem('coursehub_token'),
    setToken: (token) => localStorage.setItem('coursehub_token', token),
    removeToken: () => localStorage.removeItem('coursehub_token'),

    getUser: () => {
        const user = localStorage.getItem('coursehub_user');
        return user ? JSON.parse(user) : null;
    },
    setUser: (user) => localStorage.setItem('coursehub_user', JSON.stringify(user)),
    removeUser: () => localStorage.removeItem('coursehub_user')
};

// Hàm fetch API dùng chung
const apiFetch = async (endpoint, options = {}) => {
    const url = `${CONFIG.API_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    const token = TokenService.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Có lỗi xảy ra');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

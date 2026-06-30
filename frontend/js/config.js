// Cấu hình API URL
const CONFIG = {
    API_URL: 'http://localhost:5000/api', // Khi deploy lên Render sẽ đổi thành URL thật
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

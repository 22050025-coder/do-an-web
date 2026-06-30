// Quản lý trạng thái đăng nhập trên giao diện
document.addEventListener('DOMContentLoaded', () => {
    updateNavAuth();
});

function updateNavAuth() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;

    const user = TokenService.getUser();
    
    if (user) {
        // Đã đăng nhập
        navAuth.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <a href="profile.html" style="font-weight: 500; color: var(--primary-color);">
                    <i class="fas fa-user-circle"></i> ${user.name}
                </a>
                ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem;">Admin</a>' : ''}
                <button onclick="handleLogout()" class="btn btn-danger" style="padding: 8px 15px;">Đăng xuất</button>
            </div>
        `;
    } else {
        // Chưa đăng nhập
        navAuth.innerHTML = `
            <a href="login.html" class="btn btn-outline">Đăng nhập</a>
            <a href="register.html" class="btn btn-primary">Đăng ký</a>
        `;
    }
}

function handleLogout() {
    TokenService.removeToken();
    TokenService.removeUser();
    window.location.href = 'index.html';
}

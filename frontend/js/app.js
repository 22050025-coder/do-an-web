// Logic chính của ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    // Tải danh sách khóa học trên trang chủ
    const courseGrid = document.getElementById('course-grid');
    if (courseGrid) {
        loadCourses();
    }
});

async function loadCourses() {
    const courseGrid = document.getElementById('course-grid');
    
    try {
        const data = await apiFetch('/courses');
        const courses = data.data;

        courseGrid.innerHTML = ''; // Xóa skeleton

        courses.forEach(course => {
            const instructorName = course.instructor ? course.instructor.name : 'Chưa có giảng viên';
            const imageUrl = course.imageUrl || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            
            // Random rating between 4.5 and 5.0
            const randomRating = (Math.random() * 0.5 + 4.5).toFixed(1);
            const randomReviews = Math.floor(Math.random() * 500) + 50;
            
            // Random badge
            const badges = ['<div class="course-badge">🔥 Hot</div>', '<div class="course-badge new">🚀 Mới</div>', ''];
            const randomBadge = badges[Math.floor(Math.random() * badges.length)];

            courseCard.innerHTML = `
                <div class="course-img-wrapper">
                    ${randomBadge}
                    <div class="course-img" style="background-image: url('${imageUrl}')"></div>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-desc">Giảng viên: ${instructorName}</p>
                    <div class="course-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span>${randomRating} (${randomReviews} đánh giá)</span>
                    </div>
                    <div class="course-footer">
                        <span class="course-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}</span>
                        <a href="course?id=${course._id}" class="btn btn-primary" style="padding: 8px 15px;">Chi tiết</a>
                    </div>
                </div>
            `;
            courseGrid.appendChild(courseCard);
        });

    } catch (error) {
        console.error('Lỗi khi tải khóa học:', error);
        courseGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">Không thể tải danh sách khóa học lúc này.</p>';
    }
}

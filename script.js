/**
 * 个人网站交互脚本
 * 包含移动端菜单切换和论文过滤器功能
 */

/**
 * 初始化所有功能
 */
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initPaperFilters();
});

/**
 * 初始化移动端菜单切换功能
 * 在移动设备上显示/隐藏导航菜单
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) {
        return;
    }
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // 切换按钮动画
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // 点击菜单项后关闭菜单（移动端）
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // 窗口大小改变时，如果切换到桌面视图，关闭移动菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

/**
 * 初始化论文过滤器功能
 * 根据选择的类别过滤显示的论文
 */
function initPaperFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paperItems = document.querySelectorAll('.paper-item');
    
    if (filterButtons.length === 0 || paperItems.length === 0) {
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新活动按钮样式
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤论文
            paperItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // 添加淡入动画
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.3s ease';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}


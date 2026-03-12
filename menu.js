// =============================================
//  MENU CONFIGURATION — Edit items here only
//  To remove a page: comment out or delete its line
// =============================================
const MENU_ITEMS = [
    { label: 'الرئيسية',       href: 'index.html' },
    { label: 'شجرة الأسرة',    href: 'tree.html' },
    // { label: 'نبذة عن الأسرة', href: 'about.html' },
    // { label: 'تمرة السياطية',  href: 'dates.html' },
    { label: 'إحصائيات',       href: 'statistics.html' },
];

document.addEventListener('DOMContentLoaded', function () {
    const menuContainer = document.getElementById('floating-menu-container');
    if (!menuContainer) return;

    const menuIconBtn = document.getElementById('menu-icon-btn');
    const menuDropdown = document.getElementById('menu-dropdown');

    // Inject dropdown items from the config above
    if (menuDropdown) {
        menuDropdown.innerHTML = ''; // clear any static HTML items
        MENU_ITEMS.forEach(item => {
            const el = document.createElement('a');
            el.href = item.href;
            el.className = 'menu-item';
            el.textContent = item.label;
            menuDropdown.appendChild(el);
        });
    }

    // Toggle menu open/close
    if (menuIconBtn && menuDropdown) {
        menuIconBtn.addEventListener('click', function (event) {
            menuDropdown.classList.toggle('show');
            event.stopPropagation();
        });

        document.addEventListener('click', function (event) {
            if (!menuContainer.contains(event.target)) {
                menuDropdown.classList.remove('show');
            }
        });
    }
});
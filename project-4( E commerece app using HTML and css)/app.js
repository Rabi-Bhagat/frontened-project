document.addEventListener('DOMContentLoaded', () => {
    // Cart System
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.header-nav ul li a[aria-label="Shopping Cart"]');
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartIcon.appendChild(cartCount);
    updateCartCount();

    function updateCartCount() {
        cartCount.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.querySelectorAll('.product-card .buy-icon').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const product = {
                id: button.parentElement.getAttribute('href').split('/').pop(),
                name: productCard.querySelector('h4').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src,
                brand: productCard.querySelector('span').textContent
            };
            cart.push(product);
            updateCartCount();
            showNotification(`${product.name} added to cart!`);
        });
    });

    // Notification System
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Smooth Scrolling
    document.querySelectorAll('.header-nav a[href^="/"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.querySelector(`#${targetId}`) || document.querySelector('header');
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Filtering
    const productGrids = document.querySelectorAll('.product-grid');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <select id="filter-brand">
            <option value="all">All Brands</option>
            <option value="Manhood">Manhood</option>
            <option value="Levis">Levis</option>
            <option value="Main Brand">Main Brand</option>
            <option value="Lamborghini Brand">Lamborghini Brand</option>
            <option value="Gucci">Gucci</option>
            <option value="Porsche">Porsche</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Audi">Audi</option>
            <option value="GAP">GAP</option>
            <option value="Nike">Nike</option>
            <option value="Wrogn">Wrogn</option>
        </select>
        <select id="filter-price">
            <option value="all">All Prices</option>
            <option value="low">Below ₹1000</option>
            <option value="mid">₹1000 - ₹5000</option>
            <option value="high">Above ₹5000</option>
        </select>
    `;
    document.querySelector('#featured-products').prepend(filterContainer);

    document.querySelector('#filter-brand').addEventListener('change', filterProducts);
    document.querySelector('#filter-price').addEventListener('change', filterProducts);

    function filterProducts() {
        const brand = document.querySelector('#filter-brand').value;
        const price = document.querySelector('#filter-price').value;

        productGrids.forEach(grid => {
            grid.querySelectorAll('.product-card').forEach(card => {
                const cardBrand = card.querySelector('span').textContent;
                const cardPrice = parseFloat(card.querySelector('.price').textContent.replace('₹', ''));

                let show = true;
                if (brand !== 'all' && cardBrand !== brand) show = false;
                if (price !== 'all') {
                    if (price === 'low' && cardPrice >= 1000) show = false;
                    if (price === 'mid' && (cardPrice < 1000 || cardPrice > 5000)) show = false;
                    if (price === 'high' && cardPrice <= 5000) show = false;
                }
                card.style.display = show ? 'block' : 'none';
            });
        });
    }

    // Product Modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="" alt="Product Image">
            <h3></h3>
            <p class="brand"></p>
            <p class="price"></p>
            <div class="stars" aria-label="5 star rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;
    document.body.appendChild(modal);
    const modalClose = modal.querySelector('.modal-close');

    document.querySelectorAll('.product-card img').forEach(img => {
        img.addEventListener('click', () => {
            const card = img.closest('.product-card');
            modal.querySelector('img').src = img.src;
            modal.querySelector('h3').textContent = card.querySelector('h4').textContent;
            modal.querySelector('.brand').textContent = `Brand: ${card.querySelector('span').textContent}`;
            modal.querySelector('.price').textContent = card.querySelector('.price').textContent;
            modal.style.display = 'flex';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.querySelector('.add-to-cart').addEventListener('click', () => {
        const product = {
            id: Date.now().toString(),
            name: modal.querySelector('h3').textContent,
            price: modal.querySelector('.price').textContent,
            image: modal.querySelector('img').src,
            brand: modal.querySelector('.brand').textContent.replace('Brand: ', '')
        };
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
        modal.style.display = 'none';
    });

    // Mobile Menu Toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.querySelector('.header-container').prepend(menuToggle);
    const nav = document.querySelector('.header-nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .big-banner, .small-banner').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// CSS for JavaScript Features
const style = document.createElement('style');
style.textContent = `
    .cart-count {
        position: absolute;
        top: -10px;
        right: -10px;
        background: #ffd700;
        color: #1a1a1a;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #32cd32;
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out, slideOut 0.3s ease-in 2.7s;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }

    .filter-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .filter-container select {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }

    .product-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: #fff;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
    }

    .modal-close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .modal-content img {
        width: 100%;
        max-width: 300px;
        border-radius: 10px;
    }

    .modal-content .add-to-cart {
        background: #e91e63;
        color: #fff;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 1rem;
    }

    .modal-content .add-to-cart:hover {
        background: #c2185b;
    }

    .menu-toggle {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: #fff;
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .header.scrolled {
        padding: 0.5rem 5%;
        transition: padding 0.3s ease;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }

        .header-nav {
            display: none;
            width: 100%;
        }

        .header-nav.active {
            display: block;
        }

        .header-nav ul {
            flex-direction: column;
            align-items: center;
        }

        .header-nav ul li {
            margin: 0.5rem 0;
        }
    }
`;
document.head.appendChild(style);
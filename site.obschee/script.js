// script.js

// Универсальная функция поиска:
function performSearch() {
    let query = document.getElementById('search-input').value.toLowerCase();
    let products = document.querySelectorAll('.product');
    let found = false;

    products.forEach(function(product) {
        let name = product.getAttribute('data-name').toLowerCase();
        let match = name.includes(query);
        product.style.display = match ? 'inline-block' : 'none';
        if (match) found = true;
    });

    showNoResultsMessage(!found);
}

// Отображение сообщения "Товары не найдены":
function showNoResultsMessage(show) {
    let message = document.getElementById('no-results-message');
    if (!message) {
        message = document.createElement('div');
        message.id = 'no-results-message';
        message.textContent = 'Товары не найдены';
        message.style.textAlign = 'center';
        message.style.marginTop = '20px';
        document.body.appendChild(message);
    }
    message.style.display = show ? 'block' : 'none';
}

// Обработчики событий для поиска:
document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keyup', performSearch);

// Фиксирование шапки при скролле:
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return; // Проверка на существование header
    const sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// Фильтрация товаров по категориям:
document.querySelectorAll('.filter-button').forEach(function(button) {
    button.addEventListener('click', function() {
        let category = button.getAttribute('data-category');
        let products = document.querySelectorAll('.product');
        let found = false;

        products.forEach(function(product) {
            let match = category === 'all' || product.getAttribute('data-category') === category;
            product.style.display = match ? 'inline-block' : 'none';
            if (match) found = true;
        });

        showNoResultsMessage(!found);
    });
});

// Корзина:
let cart = [];

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(function(item, index) {
        total += item.price;
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - ${item.price} tg</p>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('cart-total').innerText = `Итого: ${total} tg`;
    document.getElementById('cart-count').innerText = cart.length;
    saveCartToLocalStorage();
}

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Обработка добавления в корзину:
document.querySelectorAll('.add-to-cart').forEach(function(button) {
    button.addEventListener('click', function() {
        let product = button.parentElement;
        let name = product.getAttribute('data-name');
        let price = parseInt(product.getAttribute('data-price'));
        if (!isNaN(price)) {
            addToCart(name, price);
        } else {
            console.error('Некорректная цена для продукта:', name);
        }
    });
});

// Оформление заказа:
document.getElementById('checkout-button').addEventListener('click', function() {
    if (cart.length > 0) {
        alert('Заказ оформлен!');
        cart = [];
        updateCart();
    } else {
        alert('Ваша корзина пуста.');
    }
});
alert(navigator.userAgent);
alert(navigator.platform);

// Загрузка корзины при загрузке страницы:
window.addEventListener('load', function() {
    loadCartFromLocalStorage();
    updateCart();

    // Создаем заголовок
    const title = document.createElement('h1');
    title.textContent = 'Добавить комментарий';
    document.body.appendChild(title); // Добавляем заголовок в тело страницы

    // Создаем форму
    const form = document.createElement('form');
    form.id = 'comment-form';

    // Создаем текстовое поле
    const textarea = document.createElement('textarea');
    textarea.id = 'comment-input';
    textarea.placeholder = 'Напишите ваш комментарий';
    textarea.rows = 4;
    textarea.style.width = '100%';
    form.appendChild(textarea);

    // Создаем кнопку
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Добавить';
    form.appendChild(button);

    document.body.appendChild(form);

    // Создаем раздел для комментариев
    const commentSection = document.createElement('div');
    commentSection.id = 'comment-section';

    const commentTitle = document.createElement('h2');
    commentTitle.textContent = 'Комментарии';
    commentSection.appendChild(commentTitle);

    const comments = document.createElement('div');
    comments.id = 'comments';
    commentSection.appendChild(comments);

    document.body.appendChild(commentSection);

    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
        }
        #comment-section {
            margin-top: 20px;
        }
        .comment {
            border: 1px solid #ddd;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
    `;
    document.head.appendChild(style);

    // Обработчик события для формы
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращение перезагрузки страницы

        const commentText = textarea.value.trim();

        if (commentText) {
            // Создание нового элемента комментария
            const comment = document.createElement('div');
            comment.classList.add('comment');
            comment.textContent = commentText;

            // Добавление комментария в раздел
            comments.appendChild(comment);

            // Очистка поля ввода
            textarea.value = '';
        } else {
            alert('Пожалуйста, напишите комментарий перед добавлением!');
        }
    });
});

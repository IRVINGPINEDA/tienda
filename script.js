var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Inicialización del estado
var state = {
    products: [],
    cart: [],
    currentUser: null,
    isLoginMode: true
};
// Elementos del DOM
var elements = {
    productsContainer: document.getElementById('products-container'),
    cartItems: document.getElementById('cart-items'),
    emptyCartMessage: document.getElementById('empty-cart-message'),
    cartTotal: document.getElementById('cart-total'),
    totalAmount: document.getElementById('total-amount'),
    checkoutBtn: document.getElementById('checkout-btn'),
    loginBtn: document.getElementById('login-btn'),
    registerBtn: document.getElementById('register-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    userInfo: document.getElementById('user-info'),
    authModal: document.getElementById('auth-modal'),
    modalTitle: document.getElementById('modal-title'),
    authForm: document.getElementById('auth-form'),
    nameField: document.getElementById('name-field'),
    authSubmit: document.getElementById('auth-submit'),
    authSwitch: document.getElementById('auth-switch'),
    switchToRegister: document.getElementById('switch-to-register'),
    closeModal: document.querySelector('.close')
};
// Cargar productos desde el JSON
function loadProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('products.json')];
                case 1:
                    response = _b.sent();
                    _a = state;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _a.products = _b.sent();
                    renderProducts();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error al cargar productos:', error_1);
                    // Datos de respaldo en caso de error
                    state.products = [
                        {
                            id: 1,
                            name: "Smartphone Galaxy X",
                            price: 599.99,
                            description: "Teléfono inteligente con pantalla AMOLED de 6.5 pulgadas",
                            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                            category: "Teléfonos"
                        },
                        {
                            id: 2,
                            name: "Laptop Pro 15\"",
                            price: 1299.99,
                            description: "Laptop de alto rendimiento con procesador Intel i7",
                            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                            category: "Computadoras"
                        }
                    ];
                    renderProducts();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Renderizar productos en el catálogo
function renderProducts() {
    elements.productsContainer.innerHTML = '';
    state.products.forEach(function (product) {
        var productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = "\n            <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" class=\"product-image\">\n            <div class=\"product-title\">").concat(product.name, "</div>\n            <div class=\"product-price\">$").concat(product.price.toFixed(2), "</div>\n            <div class=\"product-description\">").concat(product.description, "</div>\n            <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Agregar al Carrito</button>\n        ");
        elements.productsContainer.appendChild(productCard);
    });
    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var productId = parseInt(e.target.getAttribute('data-id') || '0');
            addToCart(productId);
        });
    });
}
// Agregar producto al carrito
function addToCart(productId) {
    var product = state.products.find(function (p) { return p.id === productId; });
    if (!product)
        return;
    var existingItem = state.cart.find(function (item) { return item.product.id === productId; });
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        state.cart.push({
            product: product,
            quantity: 1
        });
    }
    renderCart();
    updateCartTotal();
}
// Eliminar producto del carrito
function removeFromCart(productId) {
    state.cart = state.cart.filter(function (item) { return item.product.id !== productId; });
    renderCart();
    updateCartTotal();
}
// Actualizar cantidad de un producto en el carrito
function updateQuantity(productId, change) {
    var item = state.cart.find(function (item) { return item.product.id === productId; });
    if (!item)
        return;
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    }
    else {
        renderCart();
        updateCartTotal();
    }
}
// Renderizar el carrito
function renderCart() {
    elements.cartItems.innerHTML = '';
    if (state.cart.length === 0) {
        elements.emptyCartMessage.classList.remove('hidden');
        elements.cartTotal.classList.add('hidden');
        return;
    }
    elements.emptyCartMessage.classList.add('hidden');
    elements.cartTotal.classList.remove('hidden');
    state.cart.forEach(function (item) {
        var cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = "\n            <div class=\"cart-item-info\">\n                <div class=\"cart-item-title\">".concat(item.product.name, "</div>\n                <div class=\"cart-item-price\">$").concat(item.product.price.toFixed(2), " c/u</div>\n            </div>\n            <div class=\"cart-item-controls\">\n                <button class=\"quantity-btn decrease\" data-id=\"").concat(item.product.id, "\">-</button>\n                <span class=\"quantity-display\">").concat(item.quantity, "</span>\n                <button class=\"quantity-btn increase\" data-id=\"").concat(item.product.id, "\">+</button>\n                <button class=\"remove-btn\" data-id=\"").concat(item.product.id, "\">Eliminar</button>\n            </div>\n        ");
        elements.cartItems.appendChild(cartItem);
    });
    // Agregar event listeners a los botones del carrito
    document.querySelectorAll('.decrease').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var productId = parseInt(e.target.getAttribute('data-id') || '0');
            updateQuantity(productId, -1);
        });
    });
    document.querySelectorAll('.increase').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var productId = parseInt(e.target.getAttribute('data-id') || '0');
            updateQuantity(productId, 1);
        });
    });
    document.querySelectorAll('.remove-btn').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var productId = parseInt(e.target.getAttribute('data-id') || '0');
            removeFromCart(productId);
        });
    });
}
// Calcular y actualizar el total del carrito
function updateCartTotal() {
    var total = state.cart.reduce(function (sum, item) { return sum + (item.product.price * item.quantity); }, 0);
    elements.totalAmount.textContent = total.toFixed(2);
    // Habilitar o deshabilitar el botón de pago según si hay usuario logueado
    elements.checkoutBtn.disabled = !state.currentUser;
}
// Manejar el proceso de pago
function handleCheckout() {
    if (!state.currentUser) {
        alert('Debes iniciar sesión para realizar una compra');
        showAuthModal(true);
        return;
    }
    if (state.cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    alert("\u00A1Gracias por tu compra, ".concat(state.currentUser.name, "! Total: $").concat(calculateTotal().toFixed(2)));
    // Vaciar el carrito después de la compra
    state.cart = [];
    renderCart();
    updateCartTotal();
}
// Calcular el total del carrito
function calculateTotal() {
    return state.cart.reduce(function (sum, item) { return sum + (item.product.price * item.quantity); }, 0);
}
// Mostrar/ocultar modal de autenticación
function showAuthModal(isLogin) {
    state.isLoginMode = isLogin;
    elements.authModal.classList.remove('hidden');
    if (isLogin) {
        elements.modalTitle.textContent = 'Iniciar Sesión';
        elements.nameField.classList.add('hidden');
        elements.authSubmit.textContent = 'Iniciar Sesión';
        elements.authSwitch.innerHTML = '¿No tienes cuenta? <a href="#" id="switch-to-register">Regístrate aquí</a>';
    }
    else {
        elements.modalTitle.textContent = 'Registrarse';
        elements.nameField.classList.remove('hidden');
        elements.authSubmit.textContent = 'Registrarse';
        elements.authSwitch.innerHTML = '¿Ya tienes cuenta? <a href="#" id="switch-to-login">Inicia sesión aquí</a>';
    }
    // Actualizar event listeners para los enlaces de cambio
    updateAuthSwitchListeners();
}
// Actualizar listeners del modal de autenticación
function updateAuthSwitchListeners() {
    var switchLink = document.getElementById(state.isLoginMode ? 'switch-to-register' : 'switch-to-login');
    if (switchLink) {
        switchLink.addEventListener('click', function (e) {
            e.preventDefault();
            showAuthModal(!state.isLoginMode);
        });
    }
}
// Manejar el envío del formulario de autenticación
function handleAuthSubmit(e) {
    e.preventDefault();
    var formData = new FormData(elements.authForm);
    var email = formData.get('email');
    var password = formData.get('password');
    var name = formData.get('name');
    if (state.isLoginMode) {
        // Simular login (en un caso real, esto se haría contra un backend)
        var user = users.find(function (u) { return u.email === email && u.password === password; });
        if (user) {
            state.currentUser = user;
            updateUserUI();
            elements.authModal.classList.add('hidden');
            alert("\u00A1Bienvenido de nuevo, ".concat(user.name, "!"));
        }
        else {
            alert('Credenciales incorrectas. Intenta nuevamente.');
        }
    }
    else {
        // Simular registro
        if (!name) {
            alert('Por favor, ingresa tu nombre');
            return;
        }
        var existingUser = users.find(function (u) { return u.email === email; });
        if (existingUser) {
            alert('Ya existe un usuario con ese email');
            return;
        }
        var newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password
        };
        users.push(newUser);
        state.currentUser = newUser;
        updateUserUI();
        elements.authModal.classList.add('hidden');
        alert("\u00A1Cuenta creada exitosamente, ".concat(name, "!"));
    }
    // Limpiar formulario
    elements.authForm.reset();
    updateCartTotal();
}
// Actualizar la UI según el estado del usuario
function updateUserUI() {
    if (state.currentUser) {
        elements.loginBtn.classList.add('hidden');
        elements.registerBtn.classList.add('hidden');
        elements.userInfo.textContent = "Hola, ".concat(state.currentUser.name);
        elements.userInfo.classList.remove('hidden');
        elements.logoutBtn.classList.remove('hidden');
    }
    else {
        elements.loginBtn.classList.remove('hidden');
        elements.registerBtn.classList.remove('hidden');
        elements.userInfo.classList.add('hidden');
        elements.logoutBtn.classList.add('hidden');
    }
}
// Cerrar sesión
function handleLogout() {
    state.currentUser = null;
    updateUserUI();
    updateCartTotal();
    alert('Has cerrado sesión');
}
// Usuarios predefinidos (simulando una base de datos)
var users = [
    {
        id: 1,
        name: 'Usuario Demo',
        email: 'demo@example.com',
        password: '123456'
    }
];
// Inicializar la aplicación
function init() {
    // Cargar productos
    loadProducts();
    // Configurar event listeners
    elements.loginBtn.addEventListener('click', function () { return showAuthModal(true); });
    elements.registerBtn.addEventListener('click', function () { return showAuthModal(false); });
    elements.logoutBtn.addEventListener('click', handleLogout);
    elements.checkoutBtn.addEventListener('click', handleCheckout);
    elements.closeModal.addEventListener('click', function () { return elements.authModal.classList.add('hidden'); });
    elements.authForm.addEventListener('submit', handleAuthSubmit);
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function (e) {
        if (e.target === elements.authModal) {
            elements.authModal.classList.add('hidden');
        }
    });
    // Inicializar UI de usuario
    updateUserUI();
}
// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

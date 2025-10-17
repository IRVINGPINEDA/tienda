// Interfaces TypeScript
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

// Estado global de la aplicación
interface AppState {
    products: Product[];
    cart: CartItem[];
    currentUser: User | null;
    isLoginMode: boolean;
}

// Inicialización del estado
const state: AppState = {
    products: [],
    cart: [],
    currentUser: null,
    isLoginMode: true
};

// Elementos del DOM
const elements = {
    productsContainer: document.getElementById('products-container') as HTMLDivElement,
    cartItems: document.getElementById('cart-items') as HTMLDivElement,
    emptyCartMessage: document.getElementById('empty-cart-message') as HTMLParagraphElement,
    cartTotal: document.getElementById('cart-total') as HTMLDivElement,
    totalAmount: document.getElementById('total-amount') as HTMLSpanElement,
    checkoutBtn: document.getElementById('checkout-btn') as HTMLButtonElement,
    loginBtn: document.getElementById('login-btn') as HTMLButtonElement,
    registerBtn: document.getElementById('register-btn') as HTMLButtonElement,
    logoutBtn: document.getElementById('logout-btn') as HTMLButtonElement,
    userInfo: document.getElementById('user-info') as HTMLSpanElement,
    authModal: document.getElementById('auth-modal') as HTMLDivElement,
    modalTitle: document.getElementById('modal-title') as HTMLHeadingElement,
    authForm: document.getElementById('auth-form') as HTMLFormElement,
    nameField: document.getElementById('name-field') as HTMLDivElement,
    authSubmit: document.getElementById('auth-submit') as HTMLButtonElement,
    authSwitch: document.getElementById('auth-switch') as HTMLParagraphElement,
    switchToRegister: document.getElementById('switch-to-register') as HTMLAnchorElement,
    closeModal: document.querySelector('.close') as HTMLSpanElement
};

// Cargar productos desde el JSON
async function loadProducts(): Promise<void> {
    try {
        const response = await fetch('products.json');
        state.products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error al cargar productos:', error);
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
    }
}

// Renderizar productos en el catálogo
function renderProducts(): void {
    elements.productsContainer.innerHTML = '';
    
    state.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-description">${product.description}</div>
            <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
        `;
        
        elements.productsContainer.appendChild(productCard);
    });
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt((e.target as HTMLButtonElement).getAttribute('data-id') || '0');
            addToCart(productId);
        });
    });
}

// Agregar producto al carrito
function addToCart(productId: number): void {
    const product = state.products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            product,
            quantity: 1
        });
    }
    
    renderCart();
    updateCartTotal();
}

// Eliminar producto del carrito
function removeFromCart(productId: number): void {
    state.cart = state.cart.filter(item => item.product.id !== productId);
    renderCart();
    updateCartTotal();
}

// Actualizar cantidad de un producto en el carrito
function updateQuantity(productId: number, change: number): void {
    const item = state.cart.find(item => item.product.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        renderCart();
        updateCartTotal();
    }
}

// Renderizar el carrito
function renderCart(): void {
    elements.cartItems.innerHTML = '';
    
    if (state.cart.length === 0) {
        elements.emptyCartMessage.classList.remove('hidden');
        elements.cartTotal.classList.add('hidden');
        return;
    }
    
    elements.emptyCartMessage.classList.add('hidden');
    elements.cartTotal.classList.remove('hidden');
    
    state.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.product.name}</div>
                <div class="cart-item-price">$${item.product.price.toFixed(2)} c/u</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease" data-id="${item.product.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.product.id}">+</button>
                <button class="remove-btn" data-id="${item.product.id}">Eliminar</button>
            </div>
        `;
        
        elements.cartItems.appendChild(cartItem);
    });
    
    // Agregar event listeners a los botones del carrito
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt((e.target as HTMLButtonElement).getAttribute('data-id') || '0');
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt((e.target as HTMLButtonElement).getAttribute('data-id') || '0');
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt((e.target as HTMLButtonElement).getAttribute('data-id') || '0');
            removeFromCart(productId);
        });
    });
}

// Calcular y actualizar el total del carrito
function updateCartTotal(): void {
    const total = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    elements.totalAmount.textContent = total.toFixed(2);
    
    // Habilitar o deshabilitar el botón de pago según si hay usuario logueado
    elements.checkoutBtn.disabled = !state.currentUser;
}

// Manejar el proceso de pago
function handleCheckout(): void {
    if (!state.currentUser) {
        alert('Debes iniciar sesión para realizar una compra');
        showAuthModal(true);
        return;
    }
    
    if (state.cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    alert(`¡Gracias por tu compra, ${state.currentUser.name}! Total: $${calculateTotal().toFixed(2)}`);
    
    // Vaciar el carrito después de la compra
    state.cart = [];
    renderCart();
    updateCartTotal();
}

// Calcular el total del carrito
function calculateTotal(): number {
    return state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

// Mostrar/ocultar modal de autenticación
function showAuthModal(isLogin: boolean): void {
    state.isLoginMode = isLogin;
    elements.authModal.classList.remove('hidden');
    
    if (isLogin) {
        elements.modalTitle.textContent = 'Iniciar Sesión';
        elements.nameField.classList.add('hidden');
        elements.authSubmit.textContent = 'Iniciar Sesión';
        elements.authSwitch.innerHTML = '¿No tienes cuenta? <a href="#" id="switch-to-register">Regístrate aquí</a>';
    } else {
        elements.modalTitle.textContent = 'Registrarse';
        elements.nameField.classList.remove('hidden');
        elements.authSubmit.textContent = 'Registrarse';
        elements.authSwitch.innerHTML = '¿Ya tienes cuenta? <a href="#" id="switch-to-login">Inicia sesión aquí</a>';
    }
    
    // Actualizar event listeners para los enlaces de cambio
    updateAuthSwitchListeners();
}

// Actualizar listeners del modal de autenticación
function updateAuthSwitchListeners(): void {
    const switchLink = document.getElementById(state.isLoginMode ? 'switch-to-register' : 'switch-to-login');
    if (switchLink) {
        switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal(!state.isLoginMode);
        });
    }
}

// Manejar el envío del formulario de autenticación
function handleAuthSubmit(e: Event): void {
    e.preventDefault();
    
    const formData = new FormData(elements.authForm);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    
    if (state.isLoginMode) {
        // Simular login (en un caso real, esto se haría contra un backend)
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            state.currentUser = user;
            updateUserUI();
            elements.authModal.classList.add('hidden');
            alert(`¡Bienvenido de nuevo, ${user.name}!`);
        } else {
            alert('Credenciales incorrectas. Intenta nuevamente.');
        }
    } else {
        // Simular registro
        if (!name) {
            alert('Por favor, ingresa tu nombre');
            return;
        }
        
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            alert('Ya existe un usuario con ese email');
            return;
        }
        
        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            password
        };
        
        users.push(newUser);
        state.currentUser = newUser;
        updateUserUI();
        elements.authModal.classList.add('hidden');
        alert(`¡Cuenta creada exitosamente, ${name}!`);
    }
    
    // Limpiar formulario
    elements.authForm.reset();
    updateCartTotal();
}

// Actualizar la UI según el estado del usuario
function updateUserUI(): void {
    if (state.currentUser) {
        elements.loginBtn.classList.add('hidden');
        elements.registerBtn.classList.add('hidden');
        elements.userInfo.textContent = `Hola, ${state.currentUser.name}`;
        elements.userInfo.classList.remove('hidden');
        elements.logoutBtn.classList.remove('hidden');
    } else {
        elements.loginBtn.classList.remove('hidden');
        elements.registerBtn.classList.remove('hidden');
        elements.userInfo.classList.add('hidden');
        elements.logoutBtn.classList.add('hidden');
    }
}

// Cerrar sesión
function handleLogout(): void {
    state.currentUser = null;
    updateUserUI();
    updateCartTotal();
    alert('Has cerrado sesión');
}

// Usuarios predefinidos (simulando una base de datos)
const users: User[] = [
    {
        id: 1,
        name: 'Usuario Demo',
        email: 'demo@example.com',
        password: '123456'
    }
];

// Inicializar la aplicación
function init(): void {
    // Cargar productos
    loadProducts();
    
    // Configurar event listeners
    elements.loginBtn.addEventListener('click', () => showAuthModal(true));
    elements.registerBtn.addEventListener('click', () => showAuthModal(false));
    elements.logoutBtn.addEventListener('click', handleLogout);
    elements.checkoutBtn.addEventListener('click', handleCheckout);
    elements.closeModal.addEventListener('click', () => elements.authModal.classList.add('hidden'));
    elements.authForm.addEventListener('submit', handleAuthSubmit);
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (e) => {
        if (e.target === elements.authModal) {
            elements.authModal.classList.add('hidden');
        }
    });
    
    // Inicializar UI de usuario
    updateUserUI();
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
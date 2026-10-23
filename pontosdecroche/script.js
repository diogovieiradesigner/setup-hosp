const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const cartButton = document.querySelector('.cart-button');
const cartDialog = document.querySelector('#cart-dialog');
const cartCloseButton = document.querySelector('.cart-close');
const cartCount = document.querySelector('.cart-count');
const cartEmpty = document.querySelector('.cart-empty');
const cartList = document.querySelector('.cart-items');
const cartStatus = document.querySelector('.cart-status');
const cartCheckoutButton = document.querySelector('.cart-checkout');
const cartBrowseLink = document.querySelector('.cart-browse-link');
const cartState = new Map();

function renderCart() {
  const itemCount = [...cartState.values()].reduce((total, quantity) => total + quantity, 0);
  cartCount.textContent = String(itemCount);
  cartButton.setAttribute(
    'aria-label',
    itemCount === 0 ? 'Abrir carrinho vazio' : `Abrir carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`,
  );
  cartEmpty.hidden = cartState.size > 0;
  cartCheckoutButton.disabled = cartState.size === 0;
  cartBrowseLink.hidden = cartState.size > 0;
  cartList.replaceChildren();

  cartState.forEach((quantity, productId) => {
    const addButton = document.querySelector(`[data-product-id="${productId}"]`);
    const productName = addButton.closest('.book-card').querySelector('h3').textContent;
    const item = document.createElement('div');
    item.className = 'cart-item';

    const name = document.createElement('span');
    name.className = 'cart-item-name';
    name.textContent = productName;

    const itemQuantity = document.createElement('span');
    itemQuantity.className = 'cart-item-quantity';
    itemQuantity.textContent = `× ${quantity}`;

    const removeButton = document.createElement('button');
    removeButton.className = 'cart-remove';
    removeButton.type = 'button';
    removeButton.textContent = 'Remover';
    removeButton.setAttribute('aria-label', `Remover ${productName} do carrinho`);
    removeButton.addEventListener('click', () => {
      cartState.delete(productId);
      cartStatus.textContent = '';
      renderCart();
    });

    item.append(name, itemQuantity, removeButton);
    cartList.append(item);
  });
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
  });
});

cartButton.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
  cartDialog.showModal();
});
cartCloseButton.addEventListener('click', () => cartDialog.close());
cartDialog.addEventListener('click', (event) => {
  if (event.target === cartDialog) cartDialog.close();
});
cartBrowseLink.addEventListener('click', () => cartDialog.close());

cartCheckoutButton.addEventListener('click', async () => {
  if (cartState.size === 0 || cartCheckoutButton.disabled) return;
  cartCheckoutButton.disabled = true;
  cartStatus.textContent = 'Preparando seu checkout seguro…';

  try {
    const response = await fetch('/api/eduzz-cart', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ items: [...cartState].map(([productId, quantity]) => ({ productId, quantity })) }),
    });
    const result = await response.json();
    if (!response.ok || !result.paymentUrl) {
      throw new Error(result.error || 'Não foi possível abrir o checkout agora. Tente novamente em instantes.');
    }
    window.location.assign(result.paymentUrl);
  } catch (error) {
    cartStatus.textContent = error.message || 'Não foi possível abrir o checkout. Tente novamente.';
    cartCheckoutButton.disabled = false;
  }
});

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    cartState.set(productId, (cartState.get(productId) || 0) + 1);
    cartStatus.textContent = '';
    renderCart();
    if (!cartDialog.open) cartDialog.showModal();
  });
});

renderCart();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

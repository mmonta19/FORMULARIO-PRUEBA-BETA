import { SYSTEM_COLORS, catalogTree } from './catalog.js';
import { loadPersistedState, savePersistedState } from './storage.js';
import { buildWhatsAppUrl } from './utils/whatsapp.js';

const appRoot = document.querySelector('#app');

const SCREENS = {
  ENTRY: 'entry',
  LOGIN: 'login',
  REGISTER: 'register',
  CATEGORIES: 'categories',
  CATALOG: 'catalog',
  CART: 'cart'
};

const state = {
  screen: SCREENS.ENTRY,
  clientType: '',
  clientValidated: false,
  client: { name: '', company: '', phone: '', email: '', province: '' },
  activeCategoryKey: '',
  path: [],
  cartById: {},
  draftById: {},
  whatsappPhone: ''
};

function persistState() {
  savePersistedState(state);
}

function hydrateState() {
  const persisted = loadPersistedState();
  if (!persisted || typeof persisted !== 'object') return;
  Object.assign(state, {
    ...state,
    ...persisted,
    client: { ...state.client, ...(persisted.client || {}) }
  });
}

function getActiveCategory() {
  return catalogTree.find((item) => item.key === state.activeCategoryKey) || null;
}

function getNodeByPath(rootNode, path) {
  let current = rootNode;
  for (const segment of path) {
    current = current?.groups?.find((group) => group.label === segment);
    if (!current) return null;
  }
  return current;
}

function getCurrentCatalogNode() {
  const category = getActiveCategory();
  if (!category) return null;
  if (!state.path.length) return category;
  return getNodeByPath(category, state.path);
}

function getSystemColor(label) {
  return SYSTEM_COLORS[label] || '#455A64';
}

function getCartItems() {
  return Object.values(state.cartById).filter((item) => item.quantity > 0);
}

function totalSelectedItems() {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

function setDraftQuantity(product, value) {
  const qty = Math.max(0, Number.parseInt(value || 0, 10) || 0);
  if (qty === 0) {
    delete state.draftById[product.id];
  } else {
    state.draftById[product.id] = {
      ...product,
      quantity: qty,
      category: product.path[0] || '',
      system: product.path[1] || '',
      diameter: product.path[2] || product.path[1] || '',
      length: product.label
    };
  }
  persistState();
}

function commitDraftToCart() {
  const category = getActiveCategory();
  if (!category) return;
  const allIds = new Set(
    collectProducts(category).map((product) => product.id)
  );

  allIds.forEach((id) => {
    delete state.cartById[id];
  });

  Object.entries(state.draftById).forEach(([id, item]) => {
    if (allIds.has(id) && item.quantity > 0) {
      state.cartById[id] = { ...item };
    }
  });

  persistState();
}

function collectProducts(node) {
  const own = node.products || [];
  const nested = (node.groups || []).flatMap((group) => collectProducts(group));
  return [...own, ...nested];
}

function removeCartItem(id) {
  delete state.cartById[id];
  delete state.draftById[id];
  persistState();
}

function renderEntryScreen() {
  return `
    <section class="panel">
      <h1>Bienvenido</h1>
      <p class="muted">Seleccioná el tipo de acceso para continuar al catálogo.</p>
      <div class="stack">
        <button class="primary" data-action="go-login">Soy cliente</button>
        <button class="secondary" data-action="go-register">Nuevo cliente</button>
      </div>
    </section>
  `;
}

function renderLoginScreen() {
  return `
    <section class="panel">
      <h1>Validación de cliente</h1>
      <p class="muted">Ingresá tu teléfono o email para continuar.</p>
      <label>Dato de validación
        <input type="text" data-action="login-value" value="${state.client.phone || state.client.email || ''}" placeholder="Teléfono o email" />
      </label>
      <div class="inline-actions">
        <button class="secondary" data-action="go-entry">Volver</button>
        <button class="primary" data-action="submit-login">Continuar</button>
      </div>
    </section>
  `;
}

function renderRegisterScreen() {
  const client = state.client;
  return `
    <section class="panel">
      <h1>Nuevo cliente</h1>
      <p class="muted">Completa tus datos para acceder al catálogo.</p>
      <label>Nombre<input data-action="reg-name" value="${client.name}" /></label>
      <label>Empresa<input data-action="reg-company" value="${client.company}" /></label>
      <label>Teléfono<input data-action="reg-phone" value="${client.phone}" /></label>
      <label>Email<input type="email" data-action="reg-email" value="${client.email}" /></label>
      <label>Provincia<input data-action="reg-province" value="${client.province}" /></label>
      <div class="inline-actions">
        <button class="secondary" data-action="go-entry">Volver</button>
        <button class="primary" data-action="submit-register">Guardar y continuar</button>
      </div>
    </section>
  `;
}

function renderCategoryScreen() {
  return `
    <section class="panel">
      <h1>Categorías</h1>
      <p class="muted">Seleccionados en carrito: <strong>${totalSelectedItems()}</strong></p>
      <div class="stack">
        ${catalogTree
          .map(
            (category) => `<button class="big-card" data-action="open-category" data-key="${category.key}">${category.label}</button>`
          )
          .join('')}
      </div>
      <div class="inline-actions">
        <button class="secondary" data-action="go-cart">Ver carrito</button>
      </div>
    </section>
  `;
}

function renderBreadcrumb(node) {
  const category = getActiveCategory();
  const parts = [category?.label || 'Catálogo', ...state.path];
  const tone = getSystemColor(state.path[0] || category?.label || '');

  return `
    <nav class="breadcrumb" style="--system-color:${tone}">
      ${parts
        .map((part, index) => `<button data-action="crumb" data-index="${index - 1}">${part}</button>`)
        .join('<span>›</span>')}
    </nav>
    <header class="system-header" style="--system-color:${tone}">
      <h2>${node.label}</h2>
      <small>Seleccionados: ${totalSelectedItems()}</small>
    </header>
  `;
}

function renderCatalogScreen() {
  const node = getCurrentCatalogNode();
  if (!node) {
    state.screen = SCREENS.CATEGORIES;
    persistState();
    return renderCategoryScreen();
  }

  const hasChildren = node.groups?.length > 0;
  const color = getSystemColor(node.label);

  const content = hasChildren
    ? `<section class="list">${node.groups
        .map(
          (group) => `<button class="card" style="--system-color:${color}" data-action="open-group" data-label="${group.label}">${group.label}</button>`
        )
        .join('')}</section>`
    : `<section class="list">${node.products
        .map((product) => {
          const qty = state.draftById[product.id]?.quantity || 0;
          return `<article class="card product" style="--system-color:${color}">
              <div><strong>${product.label}</strong></div>
              <label>Cantidad
                <input type="number" min="0" inputmode="numeric" data-action="qty" data-id="${product.id}" value="${qty}" />
              </label>
            </article>`;
        })
        .join('')}</section>`;

  return `
    <section class="panel no-pad">
      ${renderBreadcrumb(node)}
      ${content}
      <footer class="toolbar">
        <button class="secondary" data-action="catalog-back">Volver</button>
        <button class="secondary" data-action="save-selection">Guardar selección</button>
        <button class="primary" data-action="add-to-cart">Agregar al carrito</button>
      </footer>
    </section>
  `;
}

function renderCartScreen() {
  const items = getCartItems();
  return `
    <section class="panel">
      <h1>Carrito</h1>
      ${
        items.length
          ? `<ul class="cart-list">${items
              .map(
                (item) => `<li>
                <div>
                  <strong>${item.category}</strong>
                  <p>${item.system} · ${item.diameter} · ${item.length}</p>
                  <small>Cantidad: ${item.quantity}</small>
                </div>
                <button class="danger" data-action="remove-item" data-id="${item.id}">Eliminar</button>
              </li>`
              )
              .join('')}</ul>`
          : '<p class="muted">No hay productos seleccionados.</p>'
      }
      <label>WhatsApp para envío
        <input data-action="whatsapp-phone" value="${state.whatsappPhone}" placeholder="54911..." />
      </label>
      <div class="inline-actions">
        <button class="secondary" data-action="edit-cart">Editar</button>
        <button class="primary" data-action="finish-order">Finalizar pedido</button>
      </div>
    </section>
  `;
}

function render() {
  const contentByScreen = {
    [SCREENS.ENTRY]: renderEntryScreen,
    [SCREENS.LOGIN]: renderLoginScreen,
    [SCREENS.REGISTER]: renderRegisterScreen,
    [SCREENS.CATEGORIES]: renderCategoryScreen,
    [SCREENS.CATALOG]: renderCatalogScreen,
    [SCREENS.CART]: renderCartScreen
  };

  appRoot.innerHTML = contentByScreen[state.screen]();
}

function handleClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;

  if (action === 'go-login') {
    state.clientType = 'existente';
    state.screen = SCREENS.LOGIN;
  } else if (action === 'go-register') {
    state.clientType = 'nuevo';
    state.screen = SCREENS.REGISTER;
  } else if (action === 'go-entry') {
    state.screen = SCREENS.ENTRY;
  } else if (action === 'submit-login') {
    const value = state.client.phone || state.client.email;
    if (!value) return;
    state.clientValidated = true;
    state.screen = SCREENS.CATEGORIES;
  } else if (action === 'submit-register') {
    const required = ['name', 'company', 'phone', 'email', 'province'];
    if (required.some((field) => !state.client[field])) return;
    state.clientValidated = true;
    state.screen = SCREENS.CATEGORIES;
  } else if (action === 'open-category') {
    state.activeCategoryKey = button.dataset.key;
    state.path = [];
    state.screen = SCREENS.CATALOG;
  } else if (action === 'open-group') {
    state.path.push(button.dataset.label);
  } else if (action === 'catalog-back') {
    if (state.path.length) state.path.pop();
    else state.screen = SCREENS.CATEGORIES;
  } else if (action === 'crumb') {
    const index = Number(button.dataset.index);
    state.path = index < 0 ? [] : state.path.slice(0, index + 1);
  } else if (action === 'save-selection' || action === 'add-to-cart') {
    commitDraftToCart();
    if (action === 'add-to-cart') state.screen = SCREENS.CART;
  } else if (action === 'go-cart') {
    state.screen = SCREENS.CART;
  } else if (action === 'remove-item') {
    removeCartItem(button.dataset.id);
  } else if (action === 'edit-cart') {
    state.screen = SCREENS.CATEGORIES;
  } else if (action === 'finish-order') {
    const url = buildWhatsAppUrl(state.cartById, state.whatsappPhone || state.client.phone);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  persistState();
  render();
}

function handleInput(event) {
  const input = event.target;
  const action = input.dataset.action;
  if (!action) return;

  if (action === 'login-value') {
    const value = input.value;
    if (value.includes('@')) state.client.email = value;
    else state.client.phone = value;
  }

  if (action.startsWith('reg-')) {
    const field = action.replace('reg-', '');
    state.client[field] = input.value;
  }

  if (action === 'whatsapp-phone') {
    state.whatsappPhone = input.value;
  }

  if (action === 'qty') {
    const category = getActiveCategory();
    if (!category) return;
    const node = getCurrentCatalogNode();
    if (!node || !node.products) return;
    const product = node.products.find((item) => item.id === input.dataset.id);
    if (!product) return;
    setDraftQuantity(product, input.value);
  }

  persistState();
}

function init() {
  hydrateState();
  appRoot.addEventListener('click', handleClick);
  appRoot.addEventListener('input', handleInput);

  if (state.clientValidated && state.screen === SCREENS.ENTRY) {
    state.screen = SCREENS.CATEGORIES;
  }

  render();
}

init();

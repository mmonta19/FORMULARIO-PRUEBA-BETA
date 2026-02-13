import { SYSTEM_COLORS, catalogTree } from './catalog.js';
import { loadPersistedState, savePersistedState } from './storage.js';
import { buildWhatsAppUrl } from './utils/whatsapp.js';

const appRoot = document.querySelector('#app');

const state = {
  path: [],
  cartById: {},
  phone: ''
};

function hydrateState() {
  const persisted = loadPersistedState();
  if (!persisted) return;

  if (Array.isArray(persisted.path)) state.path = persisted.path;
  if (persisted.cartById && typeof persisted.cartById === 'object') state.cartById = persisted.cartById;
  if (typeof persisted.phone === 'string') state.phone = persisted.phone;
}

function persistState() {
  savePersistedState({
    path: state.path,
    cartById: state.cartById,
    phone: state.phone
  });
}

function getNodeByPath(path) {
  let nodes = catalogTree;
  let current = null;

  for (const segment of path) {
    current = nodes.find((node) => node.label === segment) || null;
    if (!current) return null;
    nodes = current.groups;
  }

  return current;
}

function getCurrentView() {
  if (!state.path.length) {
    return { title: 'Categorías', type: 'group-list', groups: catalogTree, system: '' };
  }

  const node = getNodeByPath(state.path);
  if (!node) {
    state.path = [];
    return { title: 'Categorías', type: 'group-list', groups: catalogTree, system: '' };
  }

  if (node.groups.length) {
    const system = state.path[1] || '';
    return { title: node.label, type: 'group-list', groups: node.groups, system };
  }

  return {
    title: node.label,
    type: 'product-list',
    products: node.products,
    system: state.path[1] || ''
  };
}

function getSystemColor(system) {
  return SYSTEM_COLORS[system] || '#455A64';
}

function getCartItems() {
  return Object.values(state.cartById).filter((item) => item.quantity > 0);
}

function getGroupedCart() {
  return getCartItems().reduce((acc, item) => {
    if (!acc[item.system]) acc[item.system] = [];
    acc[item.system].push(item);
    return acc;
  }, {});
}

function setQuantity(product, quantity) {
  const nextQuantity = Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;
  if (nextQuantity === 0) {
    delete state.cartById[product.id];
  } else {
    state.cartById[product.id] = {
      id: product.id,
      category: product.path[0] || '',
      system: product.system,
      diameter: product.diameter,
      length: product.length,
      quantity: nextQuantity
    };
  }
  persistState();
}

function renderBreadcrumb(view) {
  const color = getSystemColor(view.system);
  const segments = ['Inicio', ...state.path];

  return `<nav class="breadcrumb" style="--system-color:${color}">
    ${segments
      .map((segment, index) => `<button type="button" data-action="crumb" data-index="${index - 1}">${segment}</button>`)
      .join('<span>›</span>')}
  </nav>`;
}

function renderGroups(view) {
  const color = getSystemColor(view.system);

  if (!view.groups.length) {
    return '<p class="empty">No hay opciones disponibles.</p>';
  }

  return `<section class="list">
    ${view.groups
      .map(
        (group) => `<button class="card" type="button" data-action="open" data-label="${group.label}" style="--system-color:${color}">
        <span>${group.label}</span>
      </button>`
      )
      .join('')}
  </section>`;
}

function renderProducts(view) {
  const color = getSystemColor(view.system);
  if (!view.products.length) return '<p class="empty">No hay largos disponibles.</p>';

  return `<section class="list products">
    ${view.products
      .map((product) => {
        const qty = state.cartById[product.id]?.quantity || 0;
        return `<article class="card product" style="--system-color:${color}">
          <div>
            <strong>${product.diameter}</strong>
            <p>${product.length}</p>
          </div>
          <label>
            Cantidad
            <input
              type="number"
              inputmode="numeric"
              min="0"
              data-action="quantity"
              data-id="${product.id}"
              value="${qty}"
            />
          </label>
        </article>`;
      })
      .join('')}
  </section>`;
}

function renderCart() {
  const grouped = getGroupedCart();
  const systems = Object.keys(grouped);

  if (!systems.length) {
    return '<section class="cart"><h2>Carrito</h2><p class="empty">Aún no agregaste productos.</p></section>';
  }

  return `<section class="cart">
    <h2>Carrito</h2>
    ${systems
      .map((system) => {
        const color = getSystemColor(system);
        return `<div class="cart-group" style="--system-color:${color}">
          <h3>${system}</h3>
          <ul>
            ${grouped[system]
              .map(
                (item) => `<li>
                <span>${item.diameter} / ${item.length}</span>
                <strong>× ${item.quantity}</strong>
              </li>`
              )
              .join('')}
          </ul>
        </div>`;
      })
      .join('')}
  </section>`;
}

function render() {
  const focusEl = document.activeElement;
  const focusedId = focusEl?.dataset?.id || null;
  const selectionStart = focusEl?.selectionStart ?? null;
  const selectionEnd = focusEl?.selectionEnd ?? null;

  const view = getCurrentView();
  const color = getSystemColor(view.system);

  appRoot.innerHTML = `
    ${renderBreadcrumb(view)}
    <header class="system-header" style="--system-color:${color}">
      <h1>${view.title}</h1>
    </header>
    ${view.type === 'group-list' ? renderGroups(view) : renderProducts(view)}
    ${renderCart()}
    <section class="actions">
      <label>
        WhatsApp (opcional)
        <input type="tel" data-action="phone" placeholder="54911..." value="${state.phone}" />
      </label>
      <button type="button" data-action="send-whatsapp">Enviar por WhatsApp</button>
    </section>
  `;

  if (focusedId) {
    const input = appRoot.querySelector(`[data-id="${focusedId}"]`);
    if (input) {
      input.focus();
      if (selectionStart !== null && selectionEnd !== null) {
        input.setSelectionRange(selectionStart, selectionEnd);
      }
    }
  }
}

function handleClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  if (action === 'open') {
    state.path.push(target.dataset.label);
    persistState();
    render();
    return;
  }

  if (action === 'crumb') {
    const index = Number(target.dataset.index);
    state.path = index >= 0 ? state.path.slice(0, index + 1) : [];
    persistState();
    render();
    return;
  }

  if (action === 'send-whatsapp') {
    const url = buildWhatsAppUrl(state.cartById, state.phone);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function handleInput(event) {
  const input = event.target;
  const action = input.dataset.action;

  if (action === 'phone') {
    state.phone = input.value;
    persistState();
    return;
  }

  if (action !== 'quantity') return;

  const currentNode = getNodeByPath(state.path);
  if (!currentNode || !Array.isArray(currentNode.products)) return;

  const product = currentNode.products.find((item) => item.id === input.dataset.id);
  if (!product) return;

  setQuantity(product, Number(input.value));
  renderCartOnly();
}

function renderCartOnly() {
  const oldCart = appRoot.querySelector('.cart');
  if (!oldCart) return render();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderCart();
  oldCart.replaceWith(wrapper.firstElementChild);
}

function init() {
  hydrateState();
  appRoot.addEventListener('click', handleClick);
  appRoot.addEventListener('input', handleInput);
  render();
}

init();

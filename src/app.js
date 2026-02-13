import { SYSTEM_COLORS, catalogTree } from './catalog.js';
import { loadPersistedState, savePersistedState } from './storage.js';
import { buildWhatsAppUrl } from './utils/whatsapp.js';

const appRoot = document.querySelector('#app');


    };
  }
  persistState();
}


}

function handleInput(event) {
  const input = event.target;
  const action = input.dataset.action;

}

function init() {
  hydrateState();
  appRoot.addEventListener('click', handleClick);
  appRoot.addEventListener('input', handleInput);

  render();
}

init();

const STORAGE_KEY = 'implant-order-state-v1';

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch (error) {
    console.warn('No se pudo leer localStorage:', error);
    return null;
  }
}

function savePersistedState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('No se pudo guardar localStorage:', error);
  }
}

export { STORAGE_KEY, loadPersistedState, savePersistedState };

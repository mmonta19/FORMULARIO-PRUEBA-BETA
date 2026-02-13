const SYSTEM_COLORS = {
  'HEXÁGONO INTERNO': '#D32F2F',
  'HEXÁGONO EXTERNO': '#2E7D32',
  'CONO MORSE': '#6A1B9A',
  MONOPIEZA: '#00ACC1',
  'MONOPIEZA BASAL': '#37474F',
  'COMPRESIVO MULTIUNIT': '#D81B60'
};

// Fuente de verdad: pega aquí tu catálogo real con esta jerarquía mínima:
// [
//   {
//     label: 'Categoría',
//     groups: [
//       {
//         label: 'Sistema',
//         groups: [
//           {
//             label: 'Ø3.0',
//             products: [
//               { label: '6mm' },
//               { label: '8mm' }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]
const RAW_CATALOG = [];

function createKey(label) {
  return String(label || '')
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createItemId(parts) {
  return parts
    .map((part) => String(part || '').trim().toLowerCase())
    .filter(Boolean)
    .join('|');
}

function normalizeNode(node, path = []) {
  const label = String(node?.label || '').trim();
  if (!label) return null;

  const key = node?.key || createKey(label);
  const base = { label, key, groups: [], products: [] };

  const currentPath = [...path, label];

  if (Array.isArray(node?.groups)) {
    base.groups = node.groups
      .map((group) => normalizeNode(group, currentPath))
      .filter(Boolean);
  }

  if (Array.isArray(node?.products)) {
    base.products = node.products
      .map((product) => {
        const productLabel = String(product?.label || '').trim();
        if (!productLabel) return null;

        return {
          label: productLabel,
          key: product?.key || createKey(productLabel),
          id: createItemId([...currentPath, productLabel]),
          path: currentPath,
          system: currentPath[1] || '',
          diameter: currentPath[2] || '',
          length: productLabel
        };
      })
      .filter(Boolean);
  }

  return base;
}

const catalogTree = RAW_CATALOG.map((node) => normalizeNode(node)).filter(Boolean);

export { SYSTEM_COLORS, catalogTree, createItemId, createKey };

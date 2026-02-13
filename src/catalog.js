const SYSTEM_COLORS = {
  'Hexágono Interno': '#D32F2F',
  'Hexágono Externo': '#2E7D32',
  'Cono Morse': '#6A1B9A',
  Monopieza: '#00ACC1',
  'Monopieza Basal': '#37474F',
  'Compresivo Multi Unit': '#D81B60',
  Analógicos: '#1565C0',
  Digitales: '#5D4037'
};

const catalogTree = [
  {
    key: 'implantes',
    label: 'Implantes',
    groups: [
      {
        key: 'hexagono-interno',
        label: 'Hexágono Interno',
        groups: [
          {
            key: 'diametro-3-3',
            label: 'Ø3.3',
            groups: [],
            products: [{ label: '6.5 mm' }, { label: '8 mm' }, { label: '10 mm' }]
          },
          {
            key: 'diametro-3-75',
            label: 'Ø3.75',
            groups: [],
            products: [{ label: '8 mm' }, { label: '10 mm' }, { label: '11.5 mm' }]
          }
        ],
        products: []
      },
      {
        key: 'cono-morse',
        label: 'Cono Morse',
        groups: [
          {
            key: 'diametro-4-2',
            label: 'Ø4.2',
            groups: [],
            products: [{ label: '8 mm' }, { label: '10 mm' }, { label: '13 mm' }]
          }
        ],
        products: []
      }
    ],
    products: []
  },
  {
    key: 'componentes-protesicos-analogicos',
    label: 'Componentes protésicos analógicos',
    groups: [
      {
        key: 'analogicos',
        label: 'Analógicos',
        groups: [
          {
            key: 'monopieza',
            label: 'Monopieza',
            groups: [],
            products: [
              { label: 'UCLA rotacional para Implantes MonoPieza' },
              { label: 'Transfer plástico rotacional para implantes Monopieza' }
            ]
          },
          {
            key: 'hexagono-externo',
            label: 'Hexágono Externo',
            groups: [],
            products: [{ label: 'Análogo - Hexágono Externo 4.1' }]
          }
        ],
        products: []
      }
    ],
    products: []
  },
  {
    key: 'componentes-protesicos-digitales',
    label: 'Componentes protésicos digitales',
    groups: [
      {
        key: 'digitales',
        label: 'Digitales',
        groups: [
          {
            key: 'cono-morse',
            label: 'Cono Morse',
            groups: [],
            products: [
              { label: 'Cuerpo de escaneo c/tornillo 3.3' },
              { label: 'Análogo digital - Cono Morse' }
            ]
          },
          {
            key: 'hexagono-interno',
            label: 'Hexágono Interno',
            groups: [],
            products: [{ label: 'Ti Base Rotacional y tornillo M1.8- Hexágono Interno' }]
          }
        ],
        products: []
      }
    ],
    products: []
  }
];

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
  const currentPath = [...path, node.label];
  return {
    label: node.label,
    key: node.key || createKey(node.label),
    groups: (node.groups || []).map((group) => normalizeNode(group, currentPath)),
    products: (node.products || []).map((product) => {
      const productLabel = typeof product === 'string' ? product : product.label;
      return {
        label: productLabel,
        key: createKey(productLabel),
        id: createItemId([...currentPath, productLabel]),
        path: currentPath,
        category: currentPath[0] || '',
        system: currentPath[1] || '',
        diameter: currentPath[2] || currentPath[1] || '',
        length: productLabel
      };
    })
  };
}

const normalizedCatalog = catalogTree.map((node) => normalizeNode(node));

export { SYSTEM_COLORS, normalizedCatalog as catalogTree, createItemId, createKey };

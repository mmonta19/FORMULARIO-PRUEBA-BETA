const SYSTEM_COLORS = {
  'HEXÁGONO INTERNO': '#D32F2F',
  'Hexágono Interno': '#D32F2F',
  'HEXÁGONO EXTERNO': '#2E7D32',
  'Hexágono Externo': '#2E7D32',
  'CONO MORSE': '#6A1B9A',
  'Cono Morse': '#6A1B9A',
  MONOPIEZA: '#00ACC1',
  Monopieza: '#00ACC1',
  'MONOPIEZA BASAL': '#37474F',
  'Monopieza Basal': '#37474F',
  'COMPRESIVO MULTIUNIT': '#D81B60',
  'Compresivo Multiunit': '#D81B60'
};

const RAW_CATALOG = {
  key: 'implantes',
  label: 'Implantes',
  systems: [
    {
      label: 'Hexágono Interno',
      products: [
        'Ø3.0 x 6.5 mm',
        'Ø3.0 x 8 mm',
        'Ø3.0 x 10 mm',
        'Ø3.0 x 11.5 mm',
        'Ø3.0 x 13 mm',
        'Ø3.0 x 16 mm',
        'Ø3.75 x 6.5 mm',
        'Ø3.75 x 8 mm',
        'Ø3.75 x 10 mm',
        'Ø3.75 x 11.5 mm',
        'Ø3.75 x 13 mm',
        'Ø3.75 x 16 mm',
        'Ø4.2 x 6.5 mm',
        'Ø4.2 x 8 mm',
        'Ø4.2 x 10 mm',
        'Ø4.2 x 11.5 mm',
        'Ø4.2 x 13 mm',
        'Ø4.2 x 16 mm',
        'Ø5.0 x 6.5 mm',
        'Ø5.0 x 8 mm',
        'Ø5.0 x 10 mm',
        'Ø5.0 x 11.5 mm',
        'Ø5.0 x 13 mm',
        'Ø5.0 x 16 mm'
      ]
    },
    {
      label: 'Hexágono Externo',
      groups: [
        { label: 'Ø3.30 (Plataforma Ø3.4)', products: ['8.5 mm', '10 mm', '11.5 mm', '13 mm', '15 mm'] },
        { label: 'Ø3.75 (Plataforma Ø4.1)', products: ['8.5 mm', '10 mm', '11.5 mm', '13 mm', '15 mm'] },
        { label: 'Ø4.0 (Plataforma Ø4.1)', products: ['6 mm', '8.5 mm', '10 mm', '11.5 mm', '13 mm', '15 mm'] },
        { label: 'Ø5.0 (Plataforma Ø5.0)', products: ['8.5 mm', '10 mm', '11.5 mm', '13 mm', '15 mm'] }
      ]
    },
    {
      label: 'Cono Morse',
      products: [
        'Ø3.30 x 8 mm',
        'Ø3.30 x 10 mm',
        'Ø3.30 x 11.5 mm',
        'Ø3.30 x 13 mm',
        'Ø3.30 x 16 mm',
        'Ø3.75 x 8 mm',
        'Ø3.75 x 10 mm',
        'Ø3.75 x 11.5 mm',
        'Ø3.75 x 13 mm',
        'Ø3.75 x 16 mm',
        'Ø4.2 x 8 mm',
        'Ø4.2 x 10 mm',
        'Ø4.2 x 11.5 mm',
        'Ø4.2 x 13 mm',
        'Ø4.2 x 16 mm',
        'Ø5.0 x 8 mm',
        'Ø5.0 x 10 mm',
        'Ø5.0 x 11.5 mm',
        'Ø5.0 x 13 mm',
        'Ø5.0 x 16 mm'
      ]
    },
    {
      label: 'Monopieza',
      products: [
        'Ø3.0 x 6 mm',
        'Ø3.0 x 8 mm',
        'Ø3.0 x 10 mm',
        'Ø3.0 x 11.5 mm',
        'Ø3.0 x 13 mm',
        'Ø3.0 x 15 mm',
        'Ø3.0 x 18 mm',
        'Ø3.0 x 20 mm',
        'Ø3.5 x 6 mm',
        'Ø3.5 x 8 mm',
        'Ø3.5 x 10 mm',
        'Ø3.5 x 11.5 mm',
        'Ø3.5 x 13 mm',
        'Ø3.5 x 15 mm',
        'Ø3.5 x 18 mm',
        'Ø3.5 x 20 mm',
        'Ø4.0 x 6 mm',
        'Ø4.0 x 8 mm',
        'Ø4.0 x 10 mm',
        'Ø4.0 x 11.5 mm',
        'Ø4.0 x 13 mm',
        'Ø4.0 x 15 mm',
        'Ø4.0 x 18 mm',
        'Ø4.0 x 20 mm',
        'Ø4.5 x 6 mm',
        'Ø4.5 x 8 mm',
        'Ø4.5 x 10 mm',
        'Ø4.5 x 11.5 mm',
        'Ø4.5 x 13 mm',
        'Ø4.5 x 15 mm',
        'Ø4.5 x 18 mm',
        'Ø4.5 x 20 mm',
        'Ø5.0 x 6 mm',
        'Ø5.0 x 8 mm',
        'Ø5.0 x 10 mm',
        'Ø5.0 x 11.5 mm',
        'Ø5.0 x 13 mm',
        'Ø5.5 x 6 mm',
        'Ø5.5 x 8 mm',
        'Ø5.5 x 10 mm',
        'Ø5.5 x 11.5 mm',
        'Ø5.5 x 13 mm'
      ]
    },
    {
      label: 'Monopieza Basal',
      groups: [
        {
          label: 'Pulido',
          products: [
            'Ø3.5 x 10 mm',
            'Ø3.5 x 12 mm',
            'Ø3.5 x 15 mm',
            'Ø3.5 x 18 mm',
            'Ø3.5 x 21 mm',
            'Ø3.5 x 23 mm',
            'Ø3.5 x 24 mm',
            'Ø3.5 x 26 mm',
            'Ø3.5 x 28 mm',
            'Ø4.5 x 10 mm',
            'Ø4.5 x 12 mm',
            'Ø4.5 x 15 mm',
            'Ø4.5 x 18 mm',
            'Ø4.5 x 21 mm',
            'Ø4.5 x 23 mm',
            'Ø4.5 x 24 mm',
            'Ø4.5 x 26 mm',
            'Ø4.5 x 28 mm',
            'Ø5.5 x 10 mm',
            'Ø5.5 x 12 mm',
            'Ø5.5 x 15 mm',
            'Ø6.5 x 10 mm',
            'Ø6.5 x 12 mm',
            'Ø6.5 x 15 mm',
            'Ø8.5 x 10 mm',
            'Ø8.5 x 12 mm',
            'Ø8.5 x 15 mm'
          ]
        },
        {
          label: 'Tratamiento superficial',
          products: [
            'Ø3.5 x 10 mm',
            'Ø3.5 x 12 mm',
            'Ø3.5 x 15 mm',
            'Ø3.5 x 18 mm',
            'Ø3.5 x 21 mm',
            'Ø3.5 x 23 mm',
            'Ø3.5 x 24 mm',
            'Ø3.5 x 26 mm',
            'Ø3.5 x 28 mm',
            'Ø4.5 x 10 mm',
            'Ø4.5 x 12 mm',
            'Ø4.5 x 15 mm',
            'Ø4.5 x 18 mm',
            'Ø4.5 x 21 mm',
            'Ø4.5 x 23 mm',
            'Ø4.5 x 24 mm',
            'Ø4.5 x 26 mm',
            'Ø4.5 x 28 mm',
            'Ø5.5 x 10 mm',
            'Ø5.5 x 12 mm',
            'Ø5.5 x 15 mm',
            'Ø6.5 x 10 mm',
            'Ø6.5 x 12 mm',
            'Ø6.5 x 15 mm',
            'Ø8.5 x 10 mm',
            'Ø8.5 x 12 mm',
            'Ø8.5 x 15 mm'
          ]
        }
      ]
    },
    {
      label: 'Compresivo Multiunit',
      products: [
        'Ø3.0 x 6 mm',
        'Ø3.0 x 8 mm',
        'Ø3.0 x 10 mm',
        'Ø3.0 x 11.5 mm',
        'Ø3.0 x 13 mm',
        'Ø3.5 x 6 mm',
        'Ø3.5 x 8 mm',
        'Ø3.5 x 10 mm',
        'Ø3.5 x 11.5 mm',
        'Ø3.5 x 13 mm',
        'Ø4.0 x 6 mm',
        'Ø4.0 x 8 mm',
        'Ø4.0 x 10 mm',
        'Ø4.0 x 11.5 mm',
        'Ø4.0 x 13 mm',
        'Ø4.5 x 6 mm',
        'Ø4.5 x 8 mm',
        'Ø4.5 x 10 mm',
        'Ø4.5 x 11.5 mm',
        'Ø4.5 x 13 mm',
        'Ø5.0 x 6 mm',
        'Ø5.0 x 8 mm',
        'Ø5.0 x 10 mm',
        'Ø5.0 x 11.5 mm',
        'Ø5.0 x 13 mm'
      ]
    }
  ]
};

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

function splitProduct(productLabel) {
  const text = String(productLabel || '').trim();
  const parts = text.split(/\s*x\s*/i);
  if (parts.length >= 2) {
    return { diameter: parts[0].trim(), length: parts.slice(1).join(' x ').trim() };
  }
  return { diameter: '', length: text };
}

function diameterFromGroupedLabel(label) {
  const match = String(label || '').match(/^Ø\s*\d+(?:\.\d+)?/i);
  return match ? match[0].replace(/\s+/g, '') : String(label || '').trim();
}

function normalizeProductsFromCombined(categoryLabel, systemLabel, products) {
  const byDiameter = new Map();

  products.forEach((item) => {
    const { diameter, length } = splitProduct(item);
    if (!diameter || !length) return;
    if (!byDiameter.has(diameter)) byDiameter.set(diameter, []);
    byDiameter.get(diameter).push(length);
  });

  return Array.from(byDiameter.entries()).map(([diameter, lengths]) => ({
    label: diameter,
    key: createKey(diameter),
    groups: [],
    products: lengths.map((length) => ({
      label: length,
      key: createKey(length),
      id: createItemId([categoryLabel, systemLabel, diameter, length]),
      path: [categoryLabel, systemLabel, diameter],
      system: systemLabel,
      diameter,
      length
    }))
  }));
}

function normalizeProductsFromDiameterGroups(categoryLabel, systemLabel, groups) {
  return groups.map((group) => {
    const diameter = diameterFromGroupedLabel(group.label);
    return {
      label: group.label,
      key: createKey(group.label),
      groups: [],
      products: (group.products || []).map((length) => ({
        label: length,
        key: createKey(length),
        id: createItemId([categoryLabel, systemLabel, diameter, length]),
        path: [categoryLabel, systemLabel, group.label],
        system: systemLabel,
        diameter,
        length
      }))
    };
  });
}

function normalizeVariantGroups(categoryLabel, systemLabel, variantGroups) {
  return (variantGroups || []).map((variant) => {
    const diameters = normalizeProductsFromCombined(categoryLabel, systemLabel, variant.products || []);
    return {
      label: variant.label,
      key: createKey(variant.label),
      groups: diameters,
      products: []
    };
  });
}

function normalizeSystem(categoryLabel, system) {
  const base = { label: system.label, key: createKey(system.label), groups: [], products: [] };

  if (Array.isArray(system.products) && system.products.length) {
    base.groups = normalizeProductsFromCombined(categoryLabel, system.label, system.products);
    return base;
  }

  if (system.label === 'Hexágono Externo') {
    base.groups = normalizeProductsFromDiameterGroups(categoryLabel, system.label, system.groups || []);
    return base;
  }

  base.groups = normalizeVariantGroups(categoryLabel, system.label, system.groups || []);
  return base;
}

const catalogTree = [
  {
    label: RAW_CATALOG.label,
    key: RAW_CATALOG.key,
    groups: (RAW_CATALOG.systems || []).map((system) => normalizeSystem(RAW_CATALOG.label, system)),
    products: []
  }
];

export { SYSTEM_COLORS, catalogTree, createItemId, createKey };

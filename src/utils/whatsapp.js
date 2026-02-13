function buildWhatsAppMessage(cartById) {
  const items = Object.values(cartById || {}).filter((item) => item.quantity > 0);
  if (!items.length) return 'Hola, quiero hacer un pedido de implantes dentales.';

  const bySystem = items.reduce((acc, item) => {
    const system = item.system || 'SIN SISTEMA';
    if (!acc[system]) acc[system] = [];
    acc[system].push(item);
    return acc;
  }, {});

  const lines = ['Hola, quiero hacer un pedido de implantes dentales:', ''];

  Object.entries(bySystem).forEach(([system, systemItems]) => {
    lines.push(`*${system}*`);
    systemItems.forEach((item) => {
      lines.push(`- ${item.diameter} / ${item.length} × ${item.quantity}`);
    });
    lines.push('');
  });

  return lines.join('\n').trim();
}

function buildWhatsAppUrl(cartById, phone = '') {
  const message = buildWhatsAppMessage(cartById);
  const cleanPhone = String(phone || '').replace(/\D+/g, '');
  const base = cleanPhone ? `https://wa.me/${cleanPhone}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

export { buildWhatsAppMessage, buildWhatsAppUrl };

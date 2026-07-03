export function getWhatsappLink(phone, name) {
  const message = `Hola ${name}, te aviso que tu cuota mensual se encuentra vencida. ¡Gracias!
  Wolf's Team.`;

  return `https://wa.me/549${phone}?text=${encodeURIComponent(message)}`;
}

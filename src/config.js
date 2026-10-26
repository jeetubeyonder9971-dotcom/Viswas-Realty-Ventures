// EDIT: CFG below (email / WhatsApp). Social links are in SOCIAL.
export const CFG = { email: 'vishwasrealtyventures@gmail.com', wa: '918800983963', useFormSubmit: true };

// AUTOMATIC PHONE ALERTS (optional, off until you fill the keys).
// Every enquiry is also sent as a message to the owner's phone. Fill ONE or BOTH:
export const NOTIFY = { whatsapp: { phone: '', apikey: '' }, telegram: { token: '', chat: '' } };

export const PHONE = '+918800983963';
export const PHONE_TEXT = '+91 88009 83963';
export const HOURS = 'Tue to Sun, 11:00 am to 6:00 pm';
export const WA_DEFAULT = 'Hi Vishwas Realty Ventures, I would like property details.';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/vishwasrealtyventures/',
  facebook: 'https://www.facebook.com/share/1CzsF6kkXT/',
};

export const IMG = {
  hero: '/images/hero.jpg',
  res: '/images/residential.jpg',
  com: '/images/commercial.jpg',
  plt: '/images/plots.jpg',
  vil: '/images/villa.jpg',
};

export const MOB = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export function openWA(x) {
  const t = encodeURIComponent(x || WA_DEFAULT);
  window.open(
    MOB ? 'https://wa.me/' + CFG.wa + '?text=' + t : 'https://web.whatsapp.com/send?phone=' + CFG.wa + '&text=' + t,
    '_blank',
    'noopener'
  );
}

export function notify(d) {
  const t = `New website enquiry\nName: ${d.name}\nPhone: ${d.phone}\nLooking for: ${d.interest}\nMessage: ${d.message || '-'}`;
  const w = NOTIFY.whatsapp, g = NOTIFY.telegram;
  if (w.phone && w.apikey)
    fetch('https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(w.phone) + '&text=' + encodeURIComponent(t) + '&apikey=' + encodeURIComponent(w.apikey), { mode: 'no-cors' }).catch(() => {});
  if (g.token && g.chat)
    fetch('https://api.telegram.org/bot' + g.token + '/sendMessage?chat_id=' + encodeURIComponent(g.chat) + '&text=' + encodeURIComponent(t), { mode: 'no-cors' }).catch(() => {});
}

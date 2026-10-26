import { PHONE, WA_DEFAULT, CFG, openWA } from '../config';
import { useUI } from '../context/UIContext';

// WhatsApp link: opens the app on mobile, WhatsApp Web on desktop.
export function WaLink({ text = WA_DEFAULT, href, children, ...rest }) {
  return (
    <a
      href={href || 'https://wa.me/' + CFG.wa}
      onClick={e => { e.preventDefault(); openWA(text); }}
      {...rest}
    >
      {children}
    </a>
  );
}

// Call link: dials directly. Inside an embedded preview (sandboxed iframe) plain tel: links are blocked,
// so open them as a new window. If no dialer opens within 1s (e.g. desktop), show the call sheet.
export function TelLink({ children, ...rest }) {
  const { openCall } = useUI();
  const href = 'tel:' + PHONE;
  const onClick = e => {
    let left = false;
    const f = () => { left = true; };
    window.addEventListener('blur', f, { once: true });
    document.addEventListener('visibilitychange', f, { once: true });
    if (window.self !== window.top) { e.preventDefault(); window.open(href, '_blank'); }
    setTimeout(() => {
      window.removeEventListener('blur', f);
      document.removeEventListener('visibilitychange', f);
      if (!left) openCall();
    }, 1000);
  };
  return <a href={href} onClick={onClick} {...rest}>{children}</a>;
}

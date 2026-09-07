// components.js - Pure DOM Component Factories (100% Safe from XSS)

export function Button({ text, onClick, className = 'btn-primary' }) {
  const btn = document.createElement('button');
  btn.className = `btn ${className}`;
  btn.textContent = text; // Safe assignment: treats input purely as plain text
  
  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }
  
  return btn;
}

export function Card({ title, description, category, onClick }) {
  const card = document.createElement('article');
  card.className = 'card';

  const heading = document.createElement('h3');
  heading.className = 'card-title';
  heading.textContent = title;

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = description;

  const badge = document.createElement('span');
  badge.className = 'card-badge';
  badge.textContent = category;

  card.appendChild(badge);
  card.appendChild(heading);
  card.appendChild(desc);

  if (typeof onClick === 'function') {
    card.classList.add('card-interactive');
    card.addEventListener('click', onClick);
  }

  return card;
}

export function Modal({ title, bodyNode, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog';

  const header = document.createElement('div');
  header.className = 'modal-header';

  const titleElem = document.createElement('h2');
  titleElem.textContent = title;

  const closeBtn = Button({
    text: '✕',
    className: 'btn-close',
    onClick: onClose
  });

  header.appendChild(titleElem);
  header.appendChild(closeBtn);

  const body = document.createElement('div');
  body.className = 'modal-body';
  body.appendChild(bodyNode);

  dialog.appendChild(header);
  dialog.appendChild(body);
  overlay.appendChild(dialog);

  // Close when clicking outside the dialog content
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay && typeof onClose === 'function') {
      onClose();
    }
  });

  return overlay;
}
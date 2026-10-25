(() => {
  // Opening hours in minutes after midnight, India time (IST).
  const OPEN_AT = 12 * 60;   // 12:00 PM
  const CLOSE_AT = 23 * 60;  // 11:00 PM

  /* Header: solid background once the page scrolls ---------------------- */

  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile navigation --------------------------------------------------- */

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  const setNav = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });

  /* Open / closed status ------------------------------------------------ */

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
  };

  const minutesInIndia = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (type) => Number(parts.find((p) => p.type === type).value);
    return get('hour') * 60 + get('minute');
  };

  const updateStatus = () => {
    const now = minutesInIndia();
    const open = now >= OPEN_AT && now < CLOSE_AT;
    let text;
    if (open) {
      text = `${CLOSE_AT - now <= 30 ? 'Closing soon' : 'Open now'} · until ${formatTime(CLOSE_AT)}`;
    } else if (now < OPEN_AT) {
      text = `Closed · opens today at ${formatTime(OPEN_AT)}`;
    } else {
      text = `Closed · opens tomorrow at ${formatTime(OPEN_AT)}`;
    }

    document.querySelectorAll('[data-open-status]').forEach((el) => { el.textContent = text; });
    document.querySelectorAll('[data-status-dot]').forEach((el) => {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
    });
  };

  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* Menu ---------------------------------------------------------------- */

  const menu = window.FAZARI_MENU;
  const filtersEl = document.getElementById('menu-filters');
  const listEl = document.getElementById('menu-list');
  const vegOnlyEl = document.getElementById('veg-only');
  const state = { category: 'all', vegOnly: false };

  const escapeHTML = (str) => String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  const formatPrice = (price) => `₹${Number(price).toLocaleString('en-IN')}`;

  const itemHTML = (item) => `
    <li class="menu-item${item.image ? ' has-photo' : ''}">
      ${item.image ? `<img class="menu-item-photo" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">` : ''}
      <div>
      <div class="menu-item-head">
        <span class="diet ${item.veg ? 'veg' : 'nonveg'}" role="img" aria-label="${item.veg ? 'Vegetarian' : 'Non-vegetarian'}"></span>
        <span class="menu-item-name">${escapeHTML(item.name)}</span>
        ${item.favourite ? '<span class="fav">Guest favourite</span>' : ''}
        ${item.price != null ? `<span class="menu-item-leader" aria-hidden="true"></span><span class="menu-item-price">${formatPrice(item.price)}</span>` : ''}
      </div>
      ${item.description ? `<p>${escapeHTML(item.description)}</p>` : ''}
      </div>
    </li>`;

  const groupHTML = (group) => `
    <div class="menu-group">
      <h3>${escapeHTML(group.name)} <small>${group.items.length} ${group.items.length === 1 ? 'dish' : 'dishes'}</small></h3>
      <ul class="menu-items">${group.items.map(itemHTML).join('')}</ul>
    </div>`;

  const renderFilters = () => {
    const options = [{ id: 'all', name: 'All' }, ...menu.categories];
    filtersEl.innerHTML = options.map((c) => `
      <button type="button" class="chip" data-filter="${c.id}" aria-pressed="${c.id === state.category}">${escapeHTML(c.name)}</button>
    `).join('');
  };

  const renderMenu = () => {
    const groups = menu.categories
      .filter((c) => state.category === 'all' || c.id === state.category)
      .map((c) => ({
        ...c,
        items: menu.items.filter((i) => i.category === c.id && (!state.vegOnly || i.veg))
      }))
      .filter((g) => g.items.length);

    listEl.classList.toggle('is-single', groups.length === 1);
    listEl.innerHTML = groups.length
      ? groups.map(groupHTML).join('')
      : '<p class="menu-empty">No vegetarian dishes listed in this section yet.</p>';
  };

  if (menu && filtersEl && listEl) {
    renderFilters();
    renderMenu();

    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      state.category = btn.dataset.filter;
      filtersEl.querySelectorAll('[data-filter]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      renderMenu();
    });

    vegOnlyEl.addEventListener('change', () => {
      state.vegOnly = vegOnlyEl.checked;
      renderMenu();
    });
  }

  /* Locations: switch the map between branches -------------------------- */

  const mapFrame = document.getElementById('branch-map');
  const branches = document.querySelectorAll('.branch');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const selectBranch = (branch) => {
    branches.forEach((b) => {
      const active = b === branch;
      b.classList.toggle('is-active', active);
      b.querySelector('.branch-show').setAttribute('aria-pressed', String(active));
    });
    mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(branch.dataset.query)}&z=16&output=embed`;
    mapFrame.title = `Map showing Fazari ${branch.querySelector('h3').textContent}`;

    // On small screens the map sits above the list, so bring it into view
    const rect = mapFrame.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      mapFrame.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
    }
  };

  if (mapFrame) {
    branches.forEach((branch) => {
      branch.addEventListener('click', (e) => {
        if (e.target.closest('a') || branch.classList.contains('is-active')) return;
        selectBranch(branch);
      });
    });
  }

  /* Reveal on scroll ---------------------------------------------------- */

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Footer year --------------------------------------------------------- */

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();

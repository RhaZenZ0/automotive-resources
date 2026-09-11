/**
 * Automotive Resources Hub — navigation.
 *
 * Brand -> category -> links. The category list is derived from the shape of
 * each brand object in data.js: an array is one category, a nested object
 * contributes one category per key. Nothing here is hard-coded per brand, so
 * editing data.js is enough to change the site.
 *
 * State is mirrored into location.hash (#/BMW/tools/ECU) so a view can be
 * bookmarked, shared or reloaded without losing your place.
 */
(function () {
  'use strict';

  /* Presentation for known category keys. Unknown keys fall back to a
     title-cased version of the key itself, so new categories still render. */
  var CATEGORY_META = {
    parts:       { label: 'Parts',          icon: '🔩', blurb: 'OEM catalogs and aftermarket suppliers' },
    manuals:     { label: 'Manuals',        icon: '📘', blurb: 'Service, repair and owner documentation' },
    wiring:      { label: 'Wiring',         icon: '🔌', blurb: 'Wiring diagrams and electrical schematics' },
    ECU:         { label: 'ECU & Coding',   icon: '🧠', blurb: 'Coding, flashing and tuning software' },
    TSB:         { label: 'TSBs & Recalls', icon: '📋', blurb: 'Technical service bulletins and safety campaigns' },
    diagnostics: { label: 'Diagnostics',    icon: '🛠️', blurb: 'Scan tools, fault-code references and apps' }
  };

  var stepCategory  = document.getElementById('step-category');
  var stepLinks     = document.getElementById('step-links');
  var brandBox      = document.getElementById('brand-container');
  var categoryBox   = document.getElementById('category-container');
  var linksBox      = document.getElementById('links-container');
  var linksHeading  = document.getElementById('links-heading');

  var data = window.brands;

  var selectedBrand = null;
  var selectedPath = null;   // e.g. ['tools', 'ECU'], joined by '/' as an id
  var suppressHashRead = false;

  /* ---------- helpers ---------- */

  function titleCase(key) {
    return key
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[-_]+/g, ' ')
      .replace(/^./, function (c) { return c.toUpperCase(); });
  }

  function metaFor(key) {
    return CATEGORY_META[key] || { label: titleCase(key), icon: '🔗', blurb: '' };
  }

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (err) {
      return url;
    }
  }

  /* Flatten a brand into a list of { id, path, key, links }. */
  function categoriesFor(brandKey) {
    var brand = data[brandKey] || {};
    var out = [];
    Object.keys(brand).forEach(function (key) {
      var value = brand[key];
      if (Array.isArray(value)) {
        out.push({ id: key, path: [key], key: key, links: value });
      } else if (value && typeof value === 'object') {
        Object.keys(value).forEach(function (sub) {
          if (Array.isArray(value[sub])) {
            out.push({ id: key + '/' + sub, path: [key, sub], key: sub, links: value[sub] });
          }
        });
      }
    });
    return out;
  }

  function findCategory(brandKey, id) {
    var list = categoriesFor(brandKey);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === String(id).toLowerCase()) { return list[i]; }
    }
    return null;
  }

  function matchKey(keys, candidate) {
    var wanted = String(candidate || '').toLowerCase();
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === wanted) { return keys[i]; }
    }
    return null;
  }

  function button(label, sublabel, isActive) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (isActive ? ' is-active' : '');
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

    var main = document.createElement('span');
    main.className = 'chip__label';
    main.textContent = label;
    btn.appendChild(main);

    if (sublabel) {
      var sub = document.createElement('span');
      sub.className = 'chip__count';
      sub.textContent = sublabel;
      btn.appendChild(sub);
    }
    return btn;
  }

  /* ---------- rendering ---------- */

  function renderBrands() {
    brandBox.innerHTML = '';
    Object.keys(data).forEach(function (brandKey) {
      var total = categoriesFor(brandKey).reduce(function (sum, cat) { return sum + cat.links.length; }, 0);
      var btn = button(brandKey, total + ' links', brandKey === selectedBrand);
      btn.addEventListener('click', function () { selectBrand(brandKey); });
      brandBox.appendChild(btn);
    });
  }

  function renderCategories() {
    categoryBox.innerHTML = '';
    if (!selectedBrand) {
      stepCategory.hidden = true;
      return;
    }
    stepCategory.hidden = false;

    categoriesFor(selectedBrand).forEach(function (cat) {
      var meta = metaFor(cat.key);
      var btn = button(meta.icon + '  ' + meta.label, cat.links.length + '', cat.id === selectedPath);
      btn.title = meta.blurb;
      btn.addEventListener('click', function () { selectCategory(cat.id); });
      categoryBox.appendChild(btn);
    });
  }

  function renderLinks() {
    linksBox.innerHTML = '';
    var cat = selectedBrand && selectedPath ? findCategory(selectedBrand, selectedPath) : null;

    if (!cat) {
      stepLinks.hidden = true;
      return;
    }
    stepLinks.hidden = false;

    var meta = metaFor(cat.key);
    linksHeading.textContent = selectedBrand + ' — ' + meta.label;

    if (meta.blurb) {
      var blurb = document.createElement('p');
      blurb.className = 'results__blurb';
      blurb.textContent = meta.blurb;
      linksBox.appendChild(blurb);
    }

    if (!cat.links.length) {
      var empty = document.createElement('p');
      empty.className = 'results__empty';
      empty.textContent = 'No links recorded here yet — add some to data.js.';
      linksBox.appendChild(empty);
      return;
    }

    var grid = document.createElement('div');
    grid.className = 'card-grid';

    cat.links.forEach(function (link) {
      var card = document.createElement('a');
      card.className = 'card';
      card.href = link.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';

      var name = document.createElement('span');
      name.className = 'card__name';
      name.textContent = link.name;

      var host = document.createElement('span');
      host.className = 'card__host';
      host.textContent = hostOf(link.url);

      card.appendChild(name);
      card.appendChild(host);

      if (link.note) {
        var note = document.createElement('span');
        note.className = 'card__note';
        note.textContent = link.note;
        card.appendChild(note);
      }
      grid.appendChild(card);
    });

    linksBox.appendChild(grid);
  }

  /* ---------- state ---------- */

  function selectBrand(brandKey) {
    selectedBrand = brandKey;
    selectedPath = null;
    renderBrands();
    renderCategories();
    renderLinks();
    writeHash();
  }

  function selectCategory(id) {
    selectedPath = id;
    renderCategories();
    renderLinks();
    writeHash();
    if (stepLinks.scrollIntoView) {
      stepLinks.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* Each segment is encoded separately, so brand names that themselves contain
     a slash or non-ASCII ("BMW / MINI", "Citroen / DS", "Skoda") survive a
     round trip through the hash. */
  function writeHash() {
    var segments = [];
    if (selectedBrand) { segments.push(encodeURIComponent(selectedBrand)); }
    if (selectedBrand && selectedPath) {
      var cat = findCategory(selectedBrand, selectedPath);
      if (cat) {
        cat.path.forEach(function (part) { segments.push(encodeURIComponent(part)); });
      }
    }
    var next = segments.length ? '#/' + segments.join('/') : '#';
    if (location.hash !== next) {
      suppressHashRead = true;
      location.hash = next;
    }
  }

  function readHash() {
    var raw = location.hash.replace(/^#\/?/, '');
    /* Split on the separator first, then decode, so an encoded %2F inside a
       single segment is never mistaken for a separator. */
    var segments = raw.split('/').filter(Boolean).map(function (part) {
      try { return decodeURIComponent(part); } catch (err) { return part; }
    });

    var brandKey = segments.length ? matchKey(Object.keys(data), segments[0]) : null;
    if (!brandKey) {
      selectedBrand = null;
      selectedPath = null;
    } else {
      selectedBrand = brandKey;
      var rest = segments.slice(1).join('/');
      var cat = rest ? findCategory(brandKey, rest) : null;
      selectedPath = cat ? cat.id : null;
    }

    renderBrands();
    renderCategories();
    renderLinks();
  }

  /* ---------- boot ---------- */

  if (!data || typeof data !== 'object' || !Object.keys(data).length) {
    brandBox.innerHTML = '<p class="results__empty">No brand data loaded. Check that data.js is present and defines <code>brands</code>.</p>';
    return;
  }

  window.addEventListener('hashchange', function () {
    if (suppressHashRead) { suppressHashRead = false; return; }
    readHash();
  });

  readHash();
})();

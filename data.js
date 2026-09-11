/**
 * Automotive Resources Hub — link data (European market).
 *
 * Focused on cars sold in the EU/EEA: each brand points at the manufacturer's
 * official Repair & Maintenance Information (RMI) portal — which every maker
 * must offer independent operators under EU type-approval rules — plus
 * pan-European parts retailers, EU recall databases and workshop tooling.
 *
 * Structure
 * ---------
 * Shared link pools below are appended to every brand, so a pan-EU retailer is
 * written once. SPECS holds only what is specific to a brand. composeBrand()
 * merges them into the shape script.js renders:
 *
 *   brands[Name] = {
 *     parts:   [ link, ... ],      // an array is one category
 *     manuals: [ link, ... ],
 *     wiring:  [ link, ... ],
 *     tools:   { ECU: [...], TSB: [...], diagnostics: [...] }   // object -> one category per key
 *   }
 *
 *   link = { name, url, note }
 *
 * To add a brand, add one SPECS entry — the shared pools come along for free.
 */

/* ---------------------------------------------------------------- *
 * Shared pools — pan-European, not brand specific
 * ---------------------------------------------------------------- */

/* Free OEM catalogues with exploded diagrams, usable across makes. */
const OEM_CATALOGUES = [
  { name: '7zap',     url: 'https://7zap.com/en/catalog/cars/', note: 'Free OEM catalogues with exploded diagrams for ~70 makes, plus a VIN decoder. No registration for basic lookups.' },
  { name: 'PartSouq', url: 'https://partsouq.com/',             note: 'Cross-market OEM catalogues — the one to reach for when a part number differs between EU, JDM and Gulf markets.' }
];

/* Pan-European aftermarket retailers. */
const EU_RETAILERS = [
  { name: 'AUTODOC',        url: 'https://www.autodoc.eu/',      note: 'Europe’s largest online parts retailer — 27 countries, 25 languages, ~7.8m parts.' },
  { name: 'kfzteile24',     url: 'https://www.kfzteile24.de/',   note: 'One of Germany’s largest independent parts retailers; strong OE-supplier coverage.' },
  { name: 'Oscaro',         url: 'https://www.oscaro.com/',      note: 'French retailer serving FR/ES/PT, with OE-quality parts and fitment lookup.' },
  { name: 'Mister Auto',    url: 'https://www.mister-auto.com/', note: 'Pan-European retailer with per-country storefronts (mister-auto.de, .ie, .es …).' },
  { name: 'Euro Car Parts', url: 'https://www.eurocarparts.com/',note: 'UK retailer with 250+ branches and same-day click & collect.' }
];

/* Cross-brand technical information and the EU access rules that govern it. */
const RMI_COMMON = [
  { name: 'ACEA — RMI portal directory', url: 'https://www.acea.auto/fact/rmi-service-information/',        note: 'Index of every manufacturer’s official EU repair-and-maintenance-information portal. Start here if a brand is missing below.' },
  { name: 'HaynesPro WorkshopData',      url: 'https://www.infopro-digital-automotive.com/haynespro/',      note: 'Pan-European technical data in 27 languages with ~99% coverage of European vehicles.' },
  { name: 'SERMI',                       url: 'https://www.vehiclesermi.eu/',                               note: 'EU scheme gating security-related RMI (immobiliser, keys, anti-theft). Independent operators need SERMI certification to access it.' }
];

/* Wiring and electrical, cross-brand. */
const WIRING_COMMON = [
  { name: 'Bosch ESI[tronic]',      url: 'https://www.boschaftermarket.com/',                     note: 'Workshop software with interactive, traceable wiring diagrams across 150+ brands.' },
  { name: 'TEXA IDC5',              url: 'https://www.texa.com/',                                 note: 'Italian diagnostic platform; guided procedures with component locations and circuit views.' },
  { name: 'HaynesPro WorkshopData', url: 'https://www.infopro-digital-automotive.com/haynespro/', note: 'Colour wiring diagrams, fuse/relay positions and component locations for European models.' }
];

/* ECU access rules and generic workshop flashing platforms. */
const ECU_COMMON = [
  { name: 'SERMI',             url: 'https://www.vehiclesermi.eu/',      note: 'Required EU certification before a manufacturer will release immobiliser and key-coding functions.' },
  { name: 'Bosch Aftermarket', url: 'https://www.boschaftermarket.com/', note: 'ESI[tronic] plus pass-thru hardware for ECU diagnosis and OE software updates.' }
];

/* EU recall and safety-campaign databases — the EU counterparts to NHTSA. */
const RECALLS_COMMON = [
  { name: 'EU Safety Gate (RAPEX)', url: 'https://ec.europa.eu/rapex',  note: 'The EU rapid alert system. Weekly recall notifications across the 31 EEA countries, free to search.' },
  { name: 'Car-Recalls.eu',         url: 'https://car-recalls.eu/',     note: 'Weekly-updated EU recall database, browsable by make and model — easier than raw Safety Gate.' },
  { name: 'KBA (Germany)',          url: 'https://www.kba.de/',         note: 'German federal motor transport authority; national recall register and type-approval data.' }
];

/* Generic scan tools and fault-code references. */
const DIAG_COMMON = [
  { name: 'TEXA',      url: 'https://www.texa.com/',      note: 'Multi-brand diagnostics widely used in European independent workshops.' },
  { name: 'Autel',     url: 'https://www.autel.com/',     note: 'Handheld scan tools with bidirectional tests and service-reset functions.' },
  { name: 'OBD-Codes', url: 'https://www.obd-codes.com/', note: 'Plain-language reference for generic and manufacturer-specific fault codes.' }
];

/* Shared within a group — VAG brands use one toolchain. */
const VAG_TOOLS = [
  { name: 'Ross-Tech VCDS', url: 'https://www.ross-tech.com/', note: 'The reference dealer-level tool for VAG: coding, adaptations, output tests, full scans.' },
  { name: 'OBDeleven',      url: 'https://obdeleven.com/',     note: 'Lithuanian phone-based alternative with one-click apps for common retrofits.' }
];
const VAG_WIKI = { name: 'Ross-Tech Wiki', url: 'https://wiki.ross-tech.com/', note: 'Module-by-module reference: pin-outs, fault codes, measuring blocks, adaptation channels.' };
const TPS      = { name: 'TPS (VW Group Trade Parts)', url: 'https://tps.trade/', note: 'VW Group genuine parts to the UK trade, plus the digital service schedule.' };

/* ---------------------------------------------------------------- *
 * Brand-specific links
 * ---------------------------------------------------------------- */

const SPECS = {
  Volkswagen: {
    parts:   [TPS],
    manuals: [{ name: 'erWin — Volkswagen', url: 'https://volkswagen.erwin-store.com/', note: 'Official VW repair and workshop information. Hourly, daily and monthly passes; no trade account needed.' }],
    wiring:  [{ name: 'erWin — Volkswagen', url: 'https://volkswagen.erwin-store.com/', note: 'Factory current-flow diagrams, earth points and connector locations.' }, VAG_WIKI],
    ecu:     VAG_TOOLS.concat([{ name: 'APR', url: 'https://www.goapr.com/', note: 'ECU and TCU flash tuning with an established European dealer network.' }]),
    tsb:     [{ name: 'erWin — Volkswagen', url: 'https://volkswagen.erwin-store.com/', note: 'Source of the factory technical bulletins behind the public recall summaries.' }],
    diag:    VAG_TOOLS.concat([VAG_WIKI])
  },

  Audi: {
    parts:   [TPS],
    manuals: [{ name: 'erWin — Audi', url: 'https://audi.erwin-store.com/', note: 'Official Audi repair, maintenance and diagnostic information on timed passes.' }],
    wiring:  [{ name: 'erWin — Audi', url: 'https://audi.erwin-store.com/', note: 'Factory current-flow diagrams and component locations by VIN.' }, VAG_WIKI],
    ecu:     VAG_TOOLS,
    tsb:     [{ name: 'erWin — Audi', url: 'https://audi.erwin-store.com/', note: 'Factory bulletins and service campaigns for Audi models.' }],
    diag:    VAG_TOOLS.concat([VAG_WIKI])
  },

  'Škoda': {
    parts:   [TPS],
    manuals: [{ name: 'erWin — Škoda', url: 'https://skoda.erwin-store.com/', note: 'Škoda Auto’s official workshop information for independent garages and fleets.' }],
    wiring:  [{ name: 'erWin — Škoda', url: 'https://skoda.erwin-store.com/', note: 'Current-flow diagrams, fuse assignments and earth points.' }, VAG_WIKI],
    ecu:     VAG_TOOLS,
    tsb:     [{ name: 'erWin — Škoda', url: 'https://skoda.erwin-store.com/', note: 'Technical service information and campaign documentation.' }],
    diag:    VAG_TOOLS.concat([VAG_WIKI])
  },

  'SEAT / Cupra': {
    parts:   [TPS],
    manuals: [{ name: 'erWin — SEAT', url: 'https://seat.erwin-store.com/', note: 'Electronic repair and workshop information from SEAT S.A., covering SEAT and Cupra.' }],
    wiring:  [{ name: 'erWin — SEAT', url: 'https://seat.erwin-store.com/', note: 'Factory wiring and component location data for SEAT/Cupra platforms.' }, VAG_WIKI],
    ecu:     VAG_TOOLS,
    tsb:     [{ name: 'erWin — SEAT', url: 'https://seat.erwin-store.com/', note: 'Service bulletins and campaigns for SEAT and Cupra.' }],
    diag:    VAG_TOOLS.concat([VAG_WIKI])
  },

  'BMW / MINI': {
    parts: [
      { name: 'RealOEM',      url: 'https://www.realoem.com/',        note: 'Free BMW parts catalogue with exploded diagrams; VIN lookup for exact fitment.' },
      { name: '7zap — BMW',   url: 'https://7zap.com/en/brand/bmw/',  note: 'Alternative BMW catalogue with market selection (Europe, ROW) and price cross-references.' }
    ],
    manuals: [
      { name: 'BMW AOS',  url: 'https://aos.bmwgroup.com/', note: 'BMW Group’s Aftersales Online System, built for independent workshops: repair manuals, digital service booklet, labour times.' },
      { name: 'newTIS',   url: 'https://www.newtis.info/',  note: 'Free web front end for BMW TIS — repair procedures, torque figures and fluid capacities.' }
    ],
    wiring: [
      { name: 'newTIS / WDS', url: 'https://www.newtis.info/',  note: 'WDS wiring diagrams: circuit paths, connector views and pin assignments.' },
      { name: 'BMW AOS',      url: 'https://aos.bmwgroup.com/', note: 'Official electrical documentation, including ICOM-based procedures.' }
    ],
    ecu: [
      { name: 'BimmerCode',    url: 'https://bimmercode.app/',       note: 'German-built phone app for coding retrofits and comfort features over a Bluetooth OBD adapter.' },
      { name: 'bootmod3',      url: 'https://www.bootmod3.net/',     note: 'Over-the-air flash tuning for modern turbo BMWs; no bench work required.' },
      { name: 'MHD Tuning',    url: 'https://www.mhdtuning.com/',    note: 'Phone-based flashing and logging for N54/N55/S55/B58.' },
      { name: 'xHP Flashtool', url: 'https://www.xhpflashtool.com/', note: 'ZF 8-speed transmission flashing — shift speed, torque limits, lockup behaviour.' }
    ],
    tsb:  [{ name: 'BMW AOS', url: 'https://aos.bmwgroup.com/', note: 'Technical campaigns and service information for BMW and MINI.' }],
    diag: [
      { name: 'Carly',      url: 'https://www.mycarly.com/',    note: 'German app for fault reading, service resets and light coding.' },
      { name: 'Bimmerpost', url: 'https://www.bimmerpost.com/', note: 'Model-specific forums; fault codes and fixes discussed per chassis.' }
    ]
  },

  'Mercedes-Benz': {
    parts: [{ name: '7zap — Mercedes-Benz', url: 'https://7zap.com/en/brand/mercedes-benz/', note: 'Free EPC-style catalogue with exploded diagrams and OEM part numbers.' }],
    manuals: [{ name: 'Mercedes-Benz B2B Connect (XENTRY WIS)', url: 'https://b2bconnect.mercedes-benz.com/', note: 'Official Workshop Information System for Mercedes-Benz and smart: technical descriptions, work instructions, maintenance schedules by FIN/VIN.' }],
    wiring:  [{ name: 'XENTRY WIS', url: 'https://b2bconnect.mercedes-benz.com/', note: 'Factory wiring diagrams linked to the repair procedures that use them.' }],
    ecu:     [{ name: 'XENTRY Diagnosis', url: 'https://b2bconnect.mercedes-benz.com/', note: 'Dealer-level diagnosis and SCN coding; security functions require SERMI certification.' }],
    tsb:     [{ name: 'XENTRY WIS', url: 'https://b2bconnect.mercedes-benz.com/', note: 'Service bulletins and campaign documentation by VIN.' }],
    diag:    [{ name: 'XENTRY Remote Diagnosis', url: 'https://b2bconnect.mercedes-benz.com/', note: 'Remote access to dealer diagnostics for independent shops.' }]
  },

  'Opel / Vauxhall': {
    parts:   [],
    manuals: [{ name: 'Stellantis Independent Operator Portal', url: 'https://stellantisiop.com/iop', note: 'All Stellantis technical repair information. Documentation is sold per brand — an Opel subscription does not cover Peugeot or Citroën.' }],
    wiring:  [{ name: 'Stellantis IOP — Sedre', url: 'https://stellantisiop.com/iop', note: 'Sedre wiring diagrams for Opel/Vauxhall, 2018-on on Stellantis platforms.' }],
    ecu:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'DiagBox-based dealer-level diagnostics and configuration.' }],
    tsb:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'Technical bulletins and campaigns for Opel and Vauxhall.' }],
    diag:    [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'DLC socket location and inspection synthesis are free; the rest is chargeable.' }]
  },

  Peugeot: {
    parts:   [],
    manuals: [
      { name: 'Stellantis Independent Operator Portal', url: 'https://stellantisiop.com/iop',            note: 'Official Peugeot technical documentation, sold per brand.' },
      { name: 'Peugeot Service Box (public)',           url: 'https://public.servicebox.peugeot.com/',   note: 'Public-facing Service Box entry point and terms for technical documentation and CTC diagnostics.' }
    ],
    wiring:  [{ name: 'Stellantis IOP — Sedre', url: 'https://stellantisiop.com/iop', note: 'Sedre wiring diagrams for Peugeot models.' }],
    ecu:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'DiagBox / CTC diagnostics with dealer-level configuration.' }],
    tsb:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'Peugeot technical bulletins and service campaigns.' }],
    diag:    [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'Requires the genuine Actia interface for full functionality.' }]
  },

  'Citroën / DS': {
    parts:   [],
    manuals: [{ name: 'Stellantis Independent Operator Portal', url: 'https://stellantisiop.com/iop', note: 'Citroën and DS technical documentation; each brand is licensed separately.' }],
    wiring:  [{ name: 'Stellantis IOP — Sedre', url: 'https://stellantisiop.com/iop', note: 'Sedre wiring diagrams for Citroën and DS.' }],
    ecu:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'DiagBox-based ECU configuration and telecoding.' }],
    tsb:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'Bulletins and campaigns for Citroën and DS.' }],
    diag:    [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'Dealer-level fault reading and guided diagnosis.' }]
  },

  Fiat: {
    parts:   [],
    manuals: [
      { name: 'Fiat Technical Information',             url: 'https://www.technicalinformation.fiat.com/', note: 'Fiat’s own RMI portal, with an easy-access section for free items.' },
      { name: 'Stellantis Independent Operator Portal', url: 'https://stellantisiop.com/iop',              note: 'Wider Stellantis documentation covering newer Fiat platforms.' }
    ],
    wiring:  [{ name: 'Fiat Technical Information', url: 'https://www.technicalinformation.fiat.com/', note: 'Factory electrical diagrams and component locations.' }],
    ecu:     [{ name: 'Stellantis IOP', url: 'https://stellantisiop.com/iop', note: 'Dealer-level ECU configuration for Stellantis-era Fiats.' }],
    tsb:     [{ name: 'Fiat Technical Information', url: 'https://www.technicalinformation.fiat.com/', note: 'Service bulletins and recall documentation.' }],
    diag:    [{ name: 'Fiat Technical Information', url: 'https://www.technicalinformation.fiat.com/', note: 'Diagnostic procedures and fault-tree documentation.' }]
  },

  Renault: {
    parts:   [],
    manuals: [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Renault’s official RMI portal for independent operators — repair methods, parts data and service schedules.' }],
    wiring:  [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Factory wiring diagrams and connector data.' }],
    ecu:     [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Access to configuration and reprogramming documentation; security functions need SERMI.' }],
    tsb:     [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Technical notes and service campaigns.' }],
    diag:    [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Guided diagnosis and fault-finding procedures.' }]
  },

  Dacia: {
    parts:   [],
    manuals: [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Dacia shares Renault’s RMI portal and much of its platform documentation.' }],
    wiring:  [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Wiring diagrams for Dacia models under the Renault portal.' }],
    ecu:     [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Configuration and reprogramming documentation.' }],
    tsb:     [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Technical notes and campaigns covering Dacia.' }],
    diag:    [{ name: 'Renault NewDialogys', url: 'https://newdialogys.renault.com', note: 'Guided fault-finding shared with the Renault range.' }]
  },

  Volvo: {
    parts:   [],
    manuals: [{ name: 'Volvo Technical Information Shop', url: 'https://tis.volvocars.biz/independent.html', note: 'VIDA subscriptions for independent operators — 3-day, 30-day or 365-day. Parts, service and diagnostic data in one application.' }],
    wiring:  [{ name: 'Volvo VIDA', url: 'https://tis.volvocars.biz/', note: 'Factory wiring diagrams and component locations inside VIDA.' }],
    ecu:     [{ name: 'Volvo VIDA', url: 'https://tis.volvocars.biz/', note: 'Software download needs a direct vehicle connection; ordering software still routes through an authorised dealer.' }],
    tsb:     [{ name: 'Volvo TIS', url: 'https://tis.volvocars.biz/', note: 'Service bulletins and campaign information for Volvo and Polestar.' }],
    diag:    [{ name: 'Volvo VIDA', url: 'https://tis.volvocars.biz/', note: 'Diagnostic fault tracing integrated with the repair documentation.' }]
  },

  'Ford (Europe)': {
    parts:   [],
    manuals: [{ name: 'Ford Etis', url: 'https://www.etis.ford.com/', note: 'Ford’s European technical information site: workshop manuals, service bulletins, PDI checksheets.' }],
    wiring:  [{ name: 'Ford Etis', url: 'https://www.etis.ford.com/', note: 'Wiring diagrams and electrical component locations for European Ford models.' }],
    ecu:     [{ name: 'Ford Etis', url: 'https://www.etis.ford.com/', note: 'Module programming documentation and calibration information.' }],
    tsb:     [{ name: 'Ford Etis', url: 'https://www.etis.ford.com/', note: 'Technical service bulletins and field service actions.' }],
    diag:    [{ name: 'Ford Etis', url: 'https://www.etis.ford.com/', note: 'Diagnostic trouble code references and guided procedures.' }]
  },

  Toyota: {
    parts: [
      { name: 'ToyoDIY', url: 'https://www.toyodiy.com/',  note: 'Free OEM catalogue searchable by VIN or frame number, with diagrams.' },
      { name: 'Amayama', url: 'https://www.amayama.com/',  note: 'Japan-market genuine parts shipped to Europe; the route for JDM-only items.' }
    ],
    manuals: [{ name: 'Toyota-Tech.eu', url: 'https://www.toyota-tech.eu/', note: 'Toyota’s European technical portal for independent operators — repair manuals, bulletins and maintenance schedules. Some content is free.' }],
    wiring:  [{ name: 'Toyota-Tech.eu', url: 'https://www.toyota-tech.eu/', note: 'European electrical wiring diagrams (EWD) by model and market.' }],
    ecu:     [{ name: 'Toyota-Tech.eu', url: 'https://www.toyota-tech.eu/', note: 'Techstream licensing and reprogramming documentation for the European range.' }],
    tsb:     [{ name: 'Toyota-Tech.eu', url: 'https://www.toyota-tech.eu/', note: 'Service bulletins and campaigns for EU-market Toyotas.' }],
    diag:    [{ name: 'Toyota-Tech.eu', url: 'https://www.toyota-tech.eu/', note: 'Diagnostic procedures and DTC references.' }]
  }
};

/* ---------------------------------------------------------------- *
 * Compose
 * ---------------------------------------------------------------- */

function composeBrand(spec) {
  return {
    parts:   (spec.parts   || []).concat(OEM_CATALOGUES, EU_RETAILERS),
    manuals: (spec.manuals || []).concat(RMI_COMMON),
    wiring:  (spec.wiring  || []).concat(WIRING_COMMON),
    tools: {
      ECU:         (spec.ecu  || []).concat(ECU_COMMON),
      TSB:         (spec.tsb  || []).concat(RECALLS_COMMON),
      diagnostics: (spec.diag || []).concat(DIAG_COMMON)
    }
  };
}

const brands = {};
Object.keys(SPECS).forEach(function (name) { brands[name] = composeBrand(SPECS[name]); });

/* Expose to the page (classic script) and to Node/tests (CommonJS). */
if (typeof window !== 'undefined') { window.brands = brands; }
if (typeof module !== 'undefined' && module.exports) { module.exports = brands; }

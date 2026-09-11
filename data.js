/**
 * Automotive Resources Hub — link data.
 *
 * Shape:
 *   brands[BrandName] = {
 *     parts:   [ link, ... ],       // an array becomes one category
 *     manuals: [ link, ... ],
 *     wiring:  [ link, ... ],
 *     tools:   { ECU: [ link ], TSB: [ link ], diagnostics: [ link ] }  // an object becomes a group of categories
 *   }
 *
 *   link = { name: 'Display name', url: 'https://…', note: 'Why you would open it' }
 *
 * script.js walks this structure generically: add a brand, a category or a link
 * here and the UI picks it up on reload — no code changes needed.
 */
const brands = {
  BMW: {
    parts: [
      { name: 'RealOEM',          url: 'https://www.realoem.com/',          note: 'Free OEM parts catalog with exploded diagrams. Look up by VIN for exact fitment.' },
      { name: 'BMW Fans Catalog', url: 'https://www.bmwfans.info/',         note: 'Second free OEM diagram browser — handy when RealOEM is slow or missing a chassis.' },
      { name: 'FCP Euro',         url: 'https://www.fcpeuro.com/',          note: 'OEM and aftermarket parts with a lifetime replacement guarantee on most items.' },
      { name: 'ECS Tuning',       url: 'https://www.ecstuning.com/',        note: 'Broad OEM plus performance catalog with fitment filtering by chassis.' },
      { name: 'Pelican Parts',    url: 'https://www.pelicanparts.com/',     note: 'Parts store attached to a large free library of illustrated DIY write-ups.' },
      { name: 'Turner Motorsport',url: 'https://www.turnermotorsport.com/', note: 'Motorsport-focused specialist — suspension, brakes and track hardware.' }
    ],
    manuals: [
      { name: 'newTIS',              url: 'https://www.newtis.info/',        note: 'Web front end for BMW TIS: factory repair procedures, torque specs, fluid capacities.' },
      { name: 'BMW USA — Owners',    url: 'https://www.bmwusa.com/',         note: 'Owners section serves digital owner’s manuals and how-to videos by VIN.' },
      { name: 'Bentley Publishers',  url: 'https://www.bentleypublishers.com/', note: 'Printed factory-grade service manuals for many E- and F-chassis cars.' },
      { name: 'Bimmerpost',          url: 'https://www.bimmerpost.com/',     note: 'Model-specific forums; DIY threads often fill gaps the factory manual leaves.' }
    ],
    wiring: [
      { name: 'newTIS / WDS',     url: 'https://www.newtis.info/',        note: 'Also hosts WDS wiring diagrams — pin-outs, connector views and circuit paths.' },
      { name: 'Bimmerforums',     url: 'https://www.bimmerforums.com/',   note: 'Technical sub-forums hold scanned wiring archives for older chassis.' },
      { name: 'Pelican Parts',    url: 'https://www.pelicanparts.com/',   note: 'Tech articles frequently include the relevant circuit excerpt.' },
      { name: 'ALLDATA DIY',      url: 'https://www.alldatadiy.com/',     note: 'Paid per-vehicle subscription carrying factory wiring diagrams.' }
    ],
    tools: {
      ECU: [
        { name: 'BimmerCode',    url: 'https://bimmercode.app/',        note: 'Phone app for coding retrofits and comfort features over a Bluetooth OBD adapter.' },
        { name: 'bootmod3',      url: 'https://www.bootmod3.net/',      note: 'Flash tuning for modern turbo engines; OTA maps, no bench work.' },
        { name: 'MHD Tuning',    url: 'https://www.mhdtuning.com/',     note: 'Phone-based flash tuning and logging for N54/N55/S55/B58.' },
        { name: 'xHP Flashtool', url: 'https://www.xhpflashtool.com/',  note: 'ZF 8-speed transmission flashing — shift speed, torque limits, lockup.' }
      ],
      TSB: [
        { name: 'NHTSA Recalls',   url: 'https://www.nhtsa.gov/recalls', note: 'US recalls, owner complaints and TSB summaries, searchable by VIN.' },
        { name: 'BMW USA',         url: 'https://www.bmwusa.com/',       note: 'Manufacturer recall lookup and open-campaign check by VIN.' },
        { name: 'Bimmerpost',      url: 'https://www.bimmerpost.com/',   note: 'TSB text is routinely posted and discussed per chassis.' }
      ],
      diagnostics: [
        { name: 'Carly',     url: 'https://www.mycarly.com/',  note: 'Consumer-level fault reading, service resets and light coding.' },
        { name: 'Autel',     url: 'https://www.autel.com/',    note: 'Handheld scan tools with bidirectional tests and service functions.' },
        { name: 'OBD-Codes', url: 'https://www.obd-codes.com/',note: 'Plain-language reference for generic and manufacturer fault codes.' }
      ]
    }
  },

  VW: {
    parts: [
      { name: 'PartSouq',            url: 'https://partsouq.com/',               note: 'Searchable VAG catalogs with diagrams; good for cross-referencing part numbers.' },
      { name: 'FCP Euro',            url: 'https://www.fcpeuro.com/',            note: 'OEM and aftermarket with a lifetime replacement guarantee on most items.' },
      { name: 'ECS Tuning',          url: 'https://www.ecstuning.com/',          note: 'Large VW catalog with maintenance kits bundled by service interval.' },
      { name: 'IDParts',             url: 'https://www.idparts.com/',            note: 'TDI specialist — filters, DPF/emissions parts and diesel-specific tooling.' },
      { name: 'Deutsche Auto Parts', url: 'https://www.deutscheautoparts.com/',  note: 'VW/Audi specialist with strong install guides and video walkthroughs.' },
      { name: 'Europa Parts',        url: 'https://www.europaparts.com/',        note: 'Genuine and OE-supplier parts, filtered by engine code.' }
    ],
    manuals: [
      { name: 'erWin (VW)',         url: 'https://erwin.volkswagen.de/',       note: 'Official service portal — repair manuals and TSBs on hourly/daily passes. Regional portals exist for other markets.' },
      { name: 'Bentley Publishers', url: 'https://www.bentleypublishers.com/', note: 'Printed factory-grade service manuals for popular Golf/Jetta/Passat generations.' },
      { name: 'Volkswagen (Owners)',url: 'https://www.vw.com/',                note: 'Owners section hosts digital owner’s manuals and warranty booklets.' },
      { name: 'VWVortex',           url: 'https://www.vwvortex.com/',          note: 'Long-running community; per-platform DIY and documentation threads.' }
    ],
    wiring: [
      { name: 'erWin (VW)',     url: 'https://erwin.volkswagen.de/', note: 'Factory current-flow diagrams, ground points and connector locations.' },
      { name: 'Ross-Tech Wiki', url: 'https://wiki.ross-tech.com/',  note: 'Module-by-module reference: pin-outs, fault codes, adaptation channels.' },
      { name: 'Golf MK7',       url: 'https://www.golfmk7.com/',     note: 'MQB-era wiring and retrofit threads with harness diagrams.' },
      { name: 'ALLDATA DIY',    url: 'https://www.alldatadiy.com/',  note: 'Paid per-vehicle subscription carrying factory wiring diagrams.' }
    ],
    tools: {
      ECU: [
        { name: 'Ross-Tech VCDS', url: 'https://www.ross-tech.com/', note: 'The reference dealer-level tool for VAG: coding, adaptations, output tests.' },
        { name: 'OBDeleven',      url: 'https://obdeleven.com/',     note: 'Phone-based coding with one-click apps for common retrofits and tweaks.' },
        { name: 'APR',            url: 'https://www.goapr.com/',     note: 'ECU and TCU flash tuning with a dealer network for installs.' }
      ],
      TSB: [
        { name: 'NHTSA Recalls',  url: 'https://www.nhtsa.gov/recalls', note: 'US recalls, owner complaints and TSB summaries, searchable by VIN.' },
        { name: 'erWin (VW)',     url: 'https://erwin.volkswagen.de/',  note: 'Source of the actual factory TSB documents behind the summaries.' },
        { name: 'Ross-Tech Wiki', url: 'https://wiki.ross-tech.com/',   note: 'Known-issue notes per module, often quicker than reading the full bulletin.' }
      ],
      diagnostics: [
        { name: 'Ross-Tech VCDS', url: 'https://www.ross-tech.com/', note: 'Full fault scans across every module, live data and guided functions.' },
        { name: 'Ross-Tech Wiki', url: 'https://wiki.ross-tech.com/',note: 'Look up a fault code and get likely causes and measuring-block values.' },
        { name: 'Carista',        url: 'https://carista.com/',       note: 'Lightweight app for reading codes, service resets and basic customisation.' },
        { name: 'TDIClub',        url: 'https://www.tdiclub.com/',   note: 'Diesel-specific diagnosis threads — injectors, DPF, EGR, timing belts.' }
      ]
    }
  },

  Toyota: {
    parts: [
      { name: 'ToyoDIY',           url: 'https://www.toyodiy.com/',           note: 'Free OEM parts catalog searchable by VIN or frame number, with diagrams.' },
      { name: 'PartSouq',          url: 'https://partsouq.com/',              note: 'Cross-market catalogs — useful when a part number differs by region.' },
      { name: 'Amayama',           url: 'https://www.amayama.com/',           note: 'Japan-market genuine parts, shipped worldwide; strong for JDM-only items.' },
      { name: 'ToyotaPartsDeal',   url: 'https://www.toyotapartsdeal.com/',   note: 'Discounted genuine parts from US dealer stock.' }
    ],
    manuals: [
      { name: 'Toyota Techinfo', url: 'https://techinfo.toyota.com/',   note: 'Official repair manuals, wiring and TSBs. Subscriptions sold by the day or month.' },
      { name: 'Toyota Owners',   url: 'https://www.toyota.com/owners/', note: 'Digital owner’s manuals, warranty guides and maintenance schedules by VIN.' },
      { name: 'Toyota Nation',   url: 'https://www.toyotanation.com/',  note: 'Community archive of scans, DIY guides and model-specific procedures.' },
      { name: 'Haynes',          url: 'https://haynes.com/',            note: 'Affordable general repair manuals for older and high-volume models.' }
    ],
    wiring: [
      { name: 'Toyota Techinfo', url: 'https://techinfo.toyota.com/',  note: 'Factory electrical wiring diagrams — the authoritative source.' },
      { name: 'Toyota Nation',   url: 'https://www.toyotanation.com/', note: 'Shared EWD excerpts and connector pin-outs by model year.' },
      { name: 'Tacoma World',    url: 'https://www.tacomaworld.com/',  note: 'Truck-focused wiring, accessory and retrofit threads.' },
      { name: 'ALLDATA DIY',    url: 'https://www.alldatadiy.com/',    note: 'Paid per-vehicle subscription carrying factory wiring diagrams.' }
    ],
    tools: {
      ECU: [
        { name: 'Techstream (via Techinfo)', url: 'https://techinfo.toyota.com/', note: 'Official dealer diagnostic and reprogramming software, licensed through Techinfo.' },
        { name: 'OpenFlash Performance',     url: 'https://www.openflashtablet.com/', note: 'Handheld flash tuning for supported Toyota/Subaru platforms.' },
        { name: 'EcuTek',                    url: 'https://www.ecutek.com/',      note: 'Tuner-network ECU calibration with live tuning and custom features.' },
        { name: 'HP Tuners',                 url: 'https://www.hptuners.com/',    note: 'Credit-based flashing and logging across a wide vehicle list.' }
      ],
      TSB: [
        { name: 'NHTSA Recalls',   url: 'https://www.nhtsa.gov/recalls', note: 'US recalls, owner complaints and TSB summaries, searchable by VIN.' },
        { name: 'Toyota Techinfo', url: 'https://techinfo.toyota.com/',  note: 'Full text of the bulletins, including revised repair procedures.' },
        { name: 'Toyota',          url: 'https://www.toyota.com/',       note: 'Manufacturer recall and service-campaign lookup by VIN.' }
      ],
      diagnostics: [
        { name: 'Techstream (via Techinfo)', url: 'https://techinfo.toyota.com/', note: 'Dealer-level scans, active tests and module initialisation routines.' },
        { name: 'Carista',   url: 'https://carista.com/',       note: 'App-based fault reading, service resets and feature customisation.' },
        { name: 'PriusChat', url: 'https://priuschat.com/',     note: 'Hybrid battery and inverter diagnosis — block voltages, HV fault triage.' },
        { name: 'OBD-Codes', url: 'https://www.obd-codes.com/', note: 'Plain-language reference for generic and manufacturer fault codes.' }
      ]
    }
  }
};

/* Expose to the page (classic script) and to Node/tests (CommonJS). */
if (typeof window !== 'undefined') { window.brands = brands; }
if (typeof module !== 'undefined' && module.exports) { module.exports = brands; }

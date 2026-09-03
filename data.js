/* ==========================================================================
   PixellePilots pricing data
   --------------------------------------------------------------------------
   HOW TO EDIT PRICES / ADD SERVICES (for Pixelle or whoever updates this):

   1. Every item below has a "php" price. That is the ONLY number you need
      to type for most items — the site automatically calculates the USD
      and EUR prices using PIXELLE'S OWN ROUNDED RATES:
          50 PHP  = 1 USD
          58 PHP  = 1 EUR
      (this matches the rates she has already been using, NOT the real bank
      exchange rate, which changes daily and would make prices look wrong)

   2. If an item needs an EXACT usd/eur price that does NOT follow that
      formula (this happens with tiny "per percent" prices, where the clean
      math would show something silly like $0.02), just add "usd" and/or
      "eur" fields directly to that item and the site will use those exact
      numbers instead of auto-converting.

   3. To add a brand new item, copy an existing item object in the right
      category array and change the name/php value.

   4. Events (the EVENTS section) are meant to be added/removed freely as
      time-limited events come and go — just add/remove objects from the
      EVENTS_DATA array.
   ========================================================================== */

const PHP_TO_USD = 1 / 50;   // 50 PHP = $1
const PHP_TO_EUR = 1 / 58;   // 58 PHP = €1

function convert(item, currency) {
  if (currency === 'PHP') return item.php;
  if (currency === 'USD') return item.usd !== undefined ? item.usd : +(item.php * PHP_TO_USD).toFixed(2);
  if (currency === 'EUR') return item.eur !== undefined ? item.eur : +(item.php * PHP_TO_EUR).toFixed(2);
}

function currencySymbol(currency) {
  return currency === 'PHP' ? '\u20B1' : currency === 'USD' ? '$' : '\u20AC';
}

function formatPrice(item, currency) {
  const val = convert(item, currency);
  const sym = currencySymbol(currency);
  // show up to 2 decimals but trim trailing .00
  const rounded = Math.round(val * 100) / 100;
  const str = Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
  return sym + str;
}

/* ---------------------------------------------------------------------- */
/* I. EXPLORATION                                                         */
/* Full price (<=50% progress) is the main add-to-cart item.              */
/* Mid/high progress rates are shown as reference info per area.          */
/* ---------------------------------------------------------------------- */

const EXPLORATION_DATA = {
  note: "Prices below are for reaching 100% exploration from <=50% progress. If your account already has mid or high progress, message us on Discord with a screenshot so we can quote the reduced price (mid-progress is charged per percentage point, high progress has its own flat add-on).",
  regions: [
    {
      region: "Mondstadt",
      areas: [
        { name: "Brightcrown Mountain", php: 150, mid: "2/%", high: 40 },
        { name: "Galesong Hill", php: 90, mid: "1.5/%", high: 25 },
        { name: "Starfell Valley", php: 200, mid: "2.5/%", high: 50 },
        { name: "Windwail Highlands", php: 125, mid: "1.5/%", high: 30 },
        { name: "Dragonspine", php: 350, mid: "4/%", high: 90 },
        { name: "Windrest Peak (Luna I)", php: 150, mid: "2/%", high: 40 },
        { name: "Temple of Space (Luna I)", php: 400, mid: "5/%", high: 100 },
      ],
    },
    {
      region: "Liyue",
      areas: [
        { name: "Lisha", php: 120, mid: "1.5/%", high: 30 },
        { name: "Sea of Clouds", php: 185, mid: "2.5/%", high: 45 },
        { name: "Qiongji Estuary", php: 200, mid: "2.5/%", high: 50 },
        { name: "Bishui Plains", php: 225, mid: "2.5/%", high: 55 },
        { name: "Minlin", php: 285, mid: "3/%", high: 70 },
        { name: "Chasm (Surface)", php: 200, mid: "2.5/%", high: 50 },
        { name: "Chasm (Underground)", php: 300, mid: "3.5/%", high: 75 },
        { name: "Upper Valley", php: 225, mid: "2.5/%", high: 55 },
        { name: "Southern Mountains", php: 235, mid: "2.5/%", high: 60 },
        { name: "Mt. Laixin", php: 65, mid: "1/%", high: 15 },
      ],
    },
    {
      region: "Inazuma",
      areas: [
        { name: "Narukami Island", php: 225, mid: "3/%", high: 55 },
        { name: "Kannazuka", php: 180, mid: "2.5/%", high: 45 },
        { name: "Yashiori Island", php: 150, mid: "2/%", high: 40 },
        { name: "Seirai Island", php: 175, mid: "2.5/%", high: 45 },
        { name: "Watatsumi Island", php: 170, mid: "2.5/%", high: 45 },
        { name: "Tsurumi Island", php: 250, mid: "3/%", high: 65 },
        { name: "Enkanomiya", php: 450, mid: "5/%", high: 115 },
      ],
    },
    {
      region: "Sumeru",
      areas: [
        { name: "Lost Nursery", php: 40 },
        { name: "Varanara", php: 75, mid: "1/%", high: 20 },
        { name: "Lokapala Jungle", php: 150, mid: "2/%", high: 40 },
        { name: "Ashavan Realm", php: 350, mid: "3.5/%", high: 90 },
        { name: "Avidya Forest", php: 165, mid: "2/%", high: 40 },
        { name: "Ardravi Valley", php: 180, mid: "2/%", high: 45 },
        { name: "Vissudha Field", php: 145, mid: "2/%", high: 35 },
        { name: "Hypostyle Desert", php: 250, mid: "3/%", high: 65 },
        { name: "Land of Lower Setekh", php: 190, mid: "2.5/%", high: 50 },
        { name: "Land of Upper Setekh", php: 150, mid: "2/%", high: 40 },
        { name: "Hadramaveth", php: 550, mid: "5.5/%", high: 140 },
        { name: "Gavireh Lajavard", php: 250, mid: "2.5/%", high: 65 },
        { name: "Realm of Farakhkert", php: 240, mid: "2.5/%", high: 60 },
      ],
    },
    {
      region: "Fontaine",
      areas: [
        { name: "Belleau Region", php: 120, mid: "1.5/%", high: 30 },
        { name: "Beryl Region", php: 185, mid: "2/%", high: 45 },
        { name: "Court of Fontaine", php: 275, mid: "3/%", high: 70 },
        { name: "Liffey Region", php: 175, mid: "2/%", high: 45 },
        { name: "Fontaine Research Institute Region", php: 230, mid: "2.5/%", high: 60 },
        { name: "Erinnyes Forest", php: 180, mid: "2/%", high: 45 },
        { name: "Morte Region", php: 200, mid: "2.5/%", high: 50 },
        { name: "Nostoi Region", php: 90, mid: "1/%", high: 25 },
        { name: "Sea of Bygone Eras", php: 300, mid: "3.5/%", high: 75 },
      ],
    },
    {
      region: "Natlan",
      areas: [
        { name: "Coatepec Mountain", php: 235, mid: "2.5/%", high: 60 },
        { name: "Basin of Unnumbered Flames", php: 165, mid: "2/%", high: 40 },
        { name: "Tequemecan Valley", php: 225, mid: "2.5/%", high: 55 },
        { name: "Toyac Springs", php: 170, mid: "2/%", high: 45 },
        { name: "Quahuacan Cliff", php: 125, mid: "1.5/%", high: 30 },
        { name: "Tezcatepetonco Range", php: 150, mid: "2/%", high: 40 },
        { name: "Ochkanatlan", php: 280, mid: "3/%", high: 70 },
        { name: "Atocpan", php: 250, mid: "3/%", high: 65 },
        { name: "Ancient Sacred Mountain", php: 285, mid: "3/%", high: 70 },
        { name: "Easybreeze Holiday Resort", php: 350, mid: "4/%", high: 90 },
      ],
    },
    {
      region: "Nod-Krai",
      areas: [
        { name: "Hiisi Island", php: 150, mid: "1.75/%", high: 40 },
        { name: "Paha Isle", php: 200, mid: "2.5/%", high: 50 },
        { name: "Lempo Isle", php: 300, mid: "3.5/%", high: 75 },
        { name: "Voidsea Outlook", php: 175, mid: "2/%", high: 45 },
        { name: "Wavechaser Plain", php: 200, mid: "2.5/%", high: 50 },
        { name: "Ashveil Peak", php: 150, mid: "1.75/%", high: 40 },
      ],
    },
    {
      region: "Snezhnaya",
      areas: [
        { name: "Volkodka Tundra", php: 350, mid: "3.5/%", high: 90 },
        { name: "Everfrozen Earth", php: 400, mid: "4/%", high: 100 },
        { name: "Fellfrost Peak", php: 350, mid: "3.5/%", high: 90 },
        { name: "Flamefeather Valley", php: 200, mid: "2/%", high: 50 },
        { name: "White Birch Snowgrave", php: 250, mid: "2.5/%", high: 65 },
      ],
    },
  ],
  oculiPerPiece: [
    { name: "Anemoculus (Mondstadt)", php: 2, note: "price with compass" },
    { name: "Geoculus (Liyue)", php: 2, note: "price with compass" },
    { name: "Electroculus (Inazuma)", php: 2.5, note: "price with compass" },
    { name: "Dendroculus (Sumeru)", php: 2.5, note: "price with compass" },
    { name: "Hydroculus (Fontaine)", php: 3, note: "price with compass" },
    { name: "Pyroculus (Natlan)", php: 3, note: "price with compass" },
    { name: "Oceanid Oculus (Nod-Krai)", php: 3, note: "price with compass" },
  ],
  offeringItemsPerPiece: [
    { name: "Crimson Agate", php: 2.5 },
    { name: "Lumenspar", php: 2.5 },
    { name: "Purify Plume", php: 3 },
    { name: "Aranara", php: 3 },
    { name: "Spirit Carp", php: 3 },
  ],
  oculiFootnote: "Price without compass must be charged an effort fee (recommended minimum 30 PHP per area).",
};

const EXPLORATION_BUNDLES = {
  note: "Full region bundles: all world quests, all achievements, namecards, all oculi, and max offerings for the region. Excludes Archon Quests.",
  items: [
    { name: "Mondstadt Bundle", sub: "includes Temple of Space", php: 3000, usd: 60, eur: 52 },
    { name: "Liyue Bundle", sub: "includes Chenyu Vale", php: 3000, usd: 60, eur: 52 },
    { name: "Inazuma Bundle", sub: "includes Enkanomiya", php: 3500, usd: 65, eur: 58 },
    { name: "Sumeru Bundle", php: 5000, usd: 100, eur: 87 },
    { name: "Fontaine Bundle", sub: "includes Sea of Bygone Eras", php: 4000, usd: 80, eur: 70 },
    { name: "Natlan Bundle", sub: "includes Ancient Sacred Mountain", php: 4000, usd: 80, eur: 70 },
    { name: "Nod-Krai Bundle", sub: "includes Frost Moon", php: 4000, usd: 80, eur: 70 },
    { name: "Snezhnaya 7.0 Bundle", php: 2000, usd: 40, eur: 35 },
  ],
};

const FROST_MOON_DATA = {
  note: "Pricing is to reach 100% areas only and does not include any world quest. Pricing may vary with current progress.",
  worldQuest: { name: "Moon Gazing World Quest", php: 350, usd: 7.5, eur: 6.5 },
  areas: [
    {
      name: "Duananna Pit",
      tiers: [
        { label: "0% to 50%", php: 50, usd: 1, eur: 0.9 },
        { label: "51% to 80% (per %)", php: 1, usd: 0.02, eur: 0.01 },
        { label: "81% and up", php: 15, usd: 0.8, eur: 0.7 },
      ],
    },
    {
      name: "Moontide Sea",
      tiers: [
        { label: "0% to 50%", php: 350, usd: 6, eur: 5.2 },
        { label: "51% to 80% (per %)", php: 3.5, usd: 0.07, eur: 0.06 },
        { label: "81% and up", php: 90, usd: 1.8, eur: 1.6 },
      ],
    },
    {
      name: "Lunar Highlands",
      tiers: [
        { label: "0% to 50%", php: 550, usd: 10, eur: 8.7 },
        { label: "51% to 80% (per %)", php: 5.5, usd: 0.12, eur: 0.9 },
        { label: "81% and up", php: 140, usd: 2.5, eur: 2.2 },
      ],
    },
    {
      name: "Dark Side of the Moon",
      tiers: [
        { label: "0% to 50%", php: 200, usd: 4, eur: 3.5 },
        { label: "51% to 80% (per %)", php: 3.5, usd: 0.05, eur: 0.04 },
        { label: "81% and up", php: 90, usd: 1, eur: 0.9 },
      ],
    },
  ],
  bundle: { name: "6.7 Bundle", sub: "World Quests, 100% areas, Oculi, Max offerings", php: 1500, usd: 26, eur: 22.5 },
};

/* ---------------------------------------------------------------------- */
/* II. WORLD QUESTS                                                       */
/* ---------------------------------------------------------------------- */

const WORLD_QUESTS_DATA = {
  regions: [
    {
      region: "Mondstadt",
      quests: [
        { name: "Break the Sword Cemetery Seal", php: 30 },
        { name: "Time and Wind", php: 30 },
        { name: "In the Mountains", php: 60 },
        { name: "A Land Entombed", php: 25 },
      ],
    },
    {
      region: "Liyue",
      quests: [
        { name: "The Chi of Yore", php: 50 },
        { name: "Chasm Delvers", php: 200 },
        { name: "Chenyu's Blessing of Sunken Jade", php: 200 },
        { name: "The Cloud Padded Path to the Chiwawa", php: 20 },
        { name: "A Wangshan Walk to Remember", php: 55 },
      ],
    },
    {
      region: "Inazuma",
      quests: [
        { name: "Sacred Sakura Cleansing Ritual", php: 150 },
        { name: "Tatara Tales (full 7 days)", php: 80 },
        { name: "Orobashi's Legacy (5 parts)", php: 125 },
        { name: "Seirai Stormchasers (4 parts)", php: 150 },
        { name: "Through the Mists (4 days)", php: 180 },
        { name: "The Moon-Bathed Deep", php: 150 },
        { name: "The Still Water's Flow", php: 40 },
        { name: "Sakura Arborism", php: 50 },
        { name: "From Dusk to Dawn in Byakuyakoku", php: 200 },
        { name: "Erebos' Secret", php: 75 },
        { name: "Collection of Dragons and Snakes", php: 50 },
      ],
    },
    {
      region: "Sumeru",
      quests: [
        { name: "Aranyaka (full questline, all subquests)", php: 600 },
        { name: "Aranyaka + Aranyaka book completion", php: 700 },
        { name: "Legends of the Stone Lock", php: 65 },
        { name: "Static Views (parts I & II)", php: 50 },
        { name: "Golden Slumber", php: 200 },
        { name: "Old Notes and New Friends", php: 250 },
        { name: "Dual Evidence (ONNF part 2)", php: 150 },
        { name: "Afratu's Dilemma", php: 50 },
        { name: "The Dirge of Bilqis", php: 250 },
        { name: '"The Falcon" Series', php: 100 },
        { name: "Apocalypse Lost", php: 50 },
        { name: "Khvarena of Good and Evil", php: 280 },
        { name: "Pale Fire", php: 50 },
        { name: "Lightcall Resonance", php: 30 },
        { name: "Monumental Study", php: 35 },
      ],
    },
    {
      region: "Fontaine",
      quests: [
        { name: "Ancient Colors", php: 120 },
        { name: "Ann of the Nazissenkreuz", php: 150 },
        { name: "Aqueous Tidemarks", php: 50 },
        { name: "Book of Esoteric Revelations", php: 40 },
        { name: "Unfinished Comedy", php: 200 },
        { name: "Road to the Singularity", php: 50 },
        { name: "Fontaine Research Institute Chronicles", php: 150 },
        { name: "In the Search of Lost Time (4 parts)", php: 80 },
        { name: "Treacherous Light of the Depths", php: 80 },
        { name: "In the Wake of Narcissus", php: 250 },
        { name: "The Wild Fairy of Erinnyes", php: 120 },
        { name: "Questioning Melusine and Answering", php: 225 },
        { name: "Canticles of Harmony (4 Acts)", php: 200 },
      ],
    },
    {
      region: "Natlan",
      quests: [
        { name: "Tales of Dreams Plucked From Fire", php: 50 },
        { name: "Shadows of the Mountains", php: 120 },
        { name: "Between Pledge and Forgettance", php: 75 },
        { name: "To the Night, What is the Night's", php: 45 },
        { name: "Ripe for Trouble", php: 40 },
        { name: "Lost Traveler in the Ashen Realm", php: 250 },
        { name: "The Mystery of Tecoloapan Beach", php: 65 },
        { name: "Open Your Heart to Me", php: 50 },
        { name: "Quest Chains: Path to the Flaming Peaks / Chronicler of the Crumbling City / A Finale Emberforged", php: 250 },
        { name: "The Way Into the Mountain", php: 60 },
        { name: "The World is Your Canvas (full part)", php: 150 },
      ],
    },
    {
      region: "Nod-Krai",
      quests: [
        { name: "Polkka Beneath the Moon's Oracle", php: 200 },
        { name: "Colors of Emptiness", php: 45 },
        { name: "East of the Moon, West of the Sun", php: 200 },
        { name: "Nightingale's Song", php: 250 },
        { name: "Return to Sender", php: 75 },
        { name: "Meeting Point quests (per quest, 6 total)", php: 25 },
      ],
    },
  ],
  extras: [
    {
      group: "Story Quests",
      items: [
        { name: "Story Quest Act I", php: 50 },
        { name: "Story Quest Act II", php: 60 },
      ],
    },
    {
      group: "Hangout Events",
      items: [
        { name: "Full hangout, 5 endings", php: 50 },
        { name: "Full hangout, 6 endings", php: 55 },
        { name: "Per ending", php: 10 },
      ],
    },
    {
      group: "Tribe Quests",
      items: [
        { name: "Act I", php: 20 },
        { name: "Act II", php: 25 },
        { name: "Act III", php: 50 },
        { name: "Full tribe quest line", php: 90 },
      ],
    },
    {
      group: "Minor Quests",
      items: [
        { name: "Quest under 10 minutes", php: 25, phpMax: 60, note: "25-60 depending on quest" },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* III. ARCHON QUESTS                                                     */
/* ---------------------------------------------------------------------- */

const ARCHON_QUESTS_DATA = [
  {
    chapter: "Prologue - Mondstadt",
    acts: [
      { name: "Act I: The Outlander Who Caught the Wind", php: 30 },
      { name: "Act II: For a Tomorrow Without Tears", php: 65 },
      { name: "Act III: Song of the Dragon and Freedom", php: 50 },
    ],
  },
  {
    chapter: "Chapter I - Liyue",
    acts: [
      { name: "Act I: Of the Land Amidst Monoliths", php: 60 },
      { name: "Act II: Farewell, Archaic Lord", php: 70 },
      { name: "Act III: A New Star Approaches", php: 85 },
      { name: "Prelude: Bough Keeper - Dainsleif", php: 25 },
      { name: "Act IV: We Will Be Reunited", php: 45 },
    ],
  },
  {
    chapter: "Chapter II - Inazuma",
    acts: [
      { name: "Prologue: Autumn Winds, Scarlet Leaves", php: 40 },
      { name: "Act I: The Immovable God and the Eternal Euthymia", php: 105 },
      { name: "Act II: Stillness, The Sublimation of Silence", php: 30 },
      { name: "Act III: Omnipresence Over Mortals", php: 90 },
      { name: "Act IV: Requiem of the Echoing Depths", php: 40 },
    ],
  },
  {
    chapter: "Chapter III - Sumeru",
    acts: [
      { name: "Act I: Through Mists of Smoke and Fire", php: 60 },
      { name: "Act II: The Morn a Thousand Roses Brings", php: 65 },
      { name: "Act III: Dreams, Emptiness, Deception", php: 40 },
      { name: "Act IV: King Deshret and the Three Magi", php: 85 },
      { name: "Act V: Akasha Pulses, the Kalpa Flame Rises", php: 95 },
      { name: "Act VI: Caribert", php: 45 },
    ],
  },
  {
    chapter: "Chapter IV - Fontaine",
    acts: [
      { name: "Act I: Prelude of Blancheur and Noir", php: 120 },
      { name: "Act II: As Light Rain Falls Without Rest", php: 90 },
      { name: "Act III: To the Stars Shining in the Deep", php: 75 },
      { name: "Act IV: Cataclysm's Awakening", php: 90 },
      { name: "Act V: Masquerade of the Guilty", php: 145 },
      { name: "Act VI: Bedtime Story", php: 45 },
    ],
  },
  {
    chapter: "Chapter V - Natlan",
    acts: [
      { name: "Act I: Flowers Resplendent on the Sun-Bathed Path", php: 60 },
      { name: "Act II: Black Stone Under a White Storm", php: 60 },
      { name: "Act III: Beyond the Smoke and Mirrors", php: 100 },
      { name: "Act IV: The Rainbow Destined to Burn", php: 110 },
      { name: "Interlude: All Fires Fuel the Flame", php: 35 },
      { name: "Act V: Incandescent Ode of Resurrection", php: 140 },
      { name: "Act VI: A Space and Time For You", php: 75 },
    ],
  },
  {
    chapter: "Song of the Welkin Moon",
    acts: [
      { name: "Prelude: The Journey Home", php: 90 },
      { name: "Act I: A Dance of Snowy Tides and Hymns", php: 135 },
      { name: "Act II: Elegy of Dust and Lamplight", php: 105 },
      { name: "Act III: A Nation That Doesn't Exist", php: 85 },
      { name: "Act IV: An Elegy for Faded Moonlight", php: 125 },
      { name: "Act V: A Nocturne of the Far North", php: 95 },
      { name: "Act VI: Melting Moonlight in the Morn", php: 85 },
      { name: "Act VII: A Traveler on a Winter's Night", php: 90 },
      { name: "Act VIII: True Moon", php: 125 },
      { name: "Act IX: As All Falls to Emptiness", php: 100 },
      { name: "Act X: Truth Amongst the Pages of Prophecy", php: 160 },
    ],
  },
  {
    chapter: "Chapter VII - Snezhnaya",
    acts: [
      { name: "Act I: Everwinter Without Mercy", php: 155, usd: 3, eur: 2.6 },
      { name: "Act II: Wraith's Nocturne", php: 160, usd: 3.2, eur: 2.8 },
    ],
  },
  {
    chapter: "Interlude Chapters",
    acts: [
      { name: "Act I: The Crane Returns on the Wind", php: 55 },
      { name: "Act II: Perilous Trail", php: 85 },
      { name: "Act III: Inversion of Genesis", php: 85 },
      { name: "Act IV: Paralogism", php: 75 },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/* IV. MAINTENANCE (subscription-style packages)                          */
/* ---------------------------------------------------------------------- */

const MAINTENANCE_DATA = {
  tiers: [
    {
      title: "Daily",
      note: "1 day",
      options: [
        { name: "Commissions only", includes: "Daily commissions", php: 15 },
        { name: "160+ resin burn only", includes: "Spend your daily resin", php: 15 },
        { name: "Commissions + resin burn", includes: "Both of the above", php: 25 },
      ],
    },
    {
      title: "Weekly",
      note: "7 days / 1 week",
      options: [
        { name: "Commissions only", includes: "7 days of commissions", php: 80 },
        { name: "160+ resin burn only", includes: "7 days of resin burn", php: 80 },
        { name: "Commissions + resin burn", includes: "Both of the above", php: 125 },
      ],
    },
    {
      title: "Monthly",
      note: "30 days / 4.2 weeks",
      options: [
        { name: "Basic", includes: "Commissions + resin burn", php: 350 },
        { name: "Standard", includes: "Basic + Spiral Abyss", php: 450 },
        { name: "Plus", includes: "Standard + Imaginarium Theater + Stygian Onslaught", php: 800 },
        { name: "Full", includes: "Plus + Major & Minor events", php: 1000 },
      ],
    },
    {
      title: "Patch cycle",
      note: "42 days / 6 weeks",
      options: [
        { name: "Basic", includes: "Commissions + resin burn", php: 500 },
        { name: "Standard", includes: "Basic + Spiral Abyss", php: 650 },
        { name: "Plus", includes: "Standard + Imaginarium Theater + Stygian Onslaught", php: 1000 },
        { name: "Full", includes: "Plus + Major & Minor events", php: 1200 },
      ],
    },
  ],
  addOns: [
    { name: "3/3 Trounce Domains", php: 25 },
    { name: "3/3 Bounties", php: 15 },
    { name: "3/3 Requests / Selenic Chronicles", php: 5 },
  ],
};

/* ---------------------------------------------------------------------- */
/* V. MISCELLANEOUS                                                       */
/* ---------------------------------------------------------------------- */

const MISC_DATA = [
  {
    group: "Events (general)",
    items: [
      { name: "Minor event", php: 90 },
      { name: "Major event (no exploration)", php: 250 },
      { name: "Exploration event", php: 500, note: "starting at 500, may go up depending on scope" },
    ],
  },
  {
    group: "Primohunt",
    items: [
      { name: "Per wish", php: 35 },
      { name: "Per 10 pulls", php: 350 },
    ],
  },
  {
    group: "Spiral Abyss",
    items: [
      { name: "Per cycle", php: 250 },
      { name: "Floor 1-8 (per floor)", php: 20 },
      { name: "Floor 9-10 (per floor)", php: 50 },
      { name: "Floor 11", php: 70 },
      { name: "Floor 12", php: 90 },
    ],
  },
  {
    group: "Map Unlocking",
    items: [
      { name: "Waypoint", php: 2 },
      { name: "Domain (puzzle unlock)", php: 5 },
      { name: "Statue of the Seven", php: 10 },
    ],
  },
  {
    group: "Fishing",
    items: [
      { name: "Full R5 fishing rod", php: 200 },
      { name: "R1 fishing rod", php: 90 },
      { name: "Per refinement", php: 30 },
      { name: "Fishing, per 15 pcs of fish", php: 30 },
    ],
  },
  {
    group: "Other Materials",
    items: [
      { name: "Crystalfly (per 30 pcs)", php: 30 },
      { name: "Wood (per 25 pcs)", php: 25 },
      { name: "Mob farming (per piece)", php: 1, note: "1-3 PHP depending on material" },
      { name: "Local specialties (per 3 pcs)", php: 35 },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/* VI. EVENTS - freely add/remove as time-limited events rotate           */
/* ---------------------------------------------------------------------- */

const EVENTS_DATA = [
  {
    name: "Great Expeditionist Challenge",
    type: "Major event",
    php: 350,
    usd: 5.6,
    eur: 6.5,
    status: null,
  },

  {
    name: "Trial of the Bastion",
    type: "Minor event",
    php: 170,
    usd: 3.3,
    eur: 2.85,
    status: "Not yet live",
  },


];
const REVIEWS_DATA = [
  {
    name: "Mr. Cupid",
    handle: "mistercupid",
    text: "Great service and fast completion of my order. The process was smooth, professional, and communication was excellent throughout. The commission was completed successfully and exceeded my expectations. Highly recommended to anyone looking for a Genshin Piloting Services.",
  },

  {
    name: "Justnothome",
    handle: "v01og",
    text: "I've been availing Pixelle's services for month now, with big tasks, and small ones, she never failed to complete everything properly and fast! In-fact, she did commisions that would have taken me weeks, in only a few days. She always goes above and beyond, especially with such affordable prices! I really recommend this for anyone wanting their account piloted!",
  },
];
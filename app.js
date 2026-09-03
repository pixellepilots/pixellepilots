/* ==========================================================================
   PixellePilots site logic
   --------------------------------------------------------------------------
   EDIT ME LATER:
   - Discord invite / PayPal.me link: see CONFIG below.
   - All prices live in data.js, not here.
   - DISCOUNT_RATE below is the Christmas promo (5% off) — applied only to
     the cart's final total, never to individual item prices. Set it to 0
     to remove the discount without touching anything else.
   - Reviews are stored in the visitor's own browser only (localStorage) as
     a pending queue until this site gets a real shared backend. See the
     "REVIEWS" section below for details on upgrading this later.
   ========================================================================== */

const CONFIG = {
  discordInvite: "https://discord.gg/ZBAaHmCU6F",
  paypalMe: "https://paypal.me/caseydarelle",
  reviewApprovalPassword: "pixelle2026", // change this any time - simple local gate for approving reviews
};

const DISCOUNT_RATE = 0.05; // Christmas promo: 5% off, applied only to the final cart total

let currentCurrency = "PHP";
let cart = []; // { id, name, sub, php, usd, eur, qty }
let cartIdCounter = 0;

/* ---------------------------------------------------------------------- */
/* Currency                                                                */
/* ---------------------------------------------------------------------- */

function setCurrency(cur) {
  currentCurrency = cur;
  document.querySelectorAll(".currency-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.cur === cur);
  });
  renderAllCategoryModalsIfOpen();
  renderCart();
}

/* ---------------------------------------------------------------------- */
/* Cart                                                                    */
/* ---------------------------------------------------------------------- */

function addToCart(item) {
  cartIdCounter += 1;
  cart.push({
    id: cartIdCounter,
    name: item.name,
    sub: item.sub || "",
    php: item.php,
    usd: item.usd,
    eur: item.eur,
  });
  renderCart();
  flashCartFab();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  renderCart();
}

function cartTotalPhp() {
  return cart.reduce((sum, c) => sum + c.php, 0);
}

function flashCartFab() {
  const fab = document.getElementById("cartFab");
  if (!fab) return;
  fab.style.transform = "scale(1.08)";
  setTimeout(() => (fab.style.transform = "scale(1)"), 150);
}

function renderCart() {
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
  const countFabEl = document.getElementById("cartCountFab");
  if (countFabEl) countFabEl.textContent = cart.length;

  const listEl = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  const emptyEl = document.getElementById("cartEmpty");
  const actionsEl = document.getElementById("checkoutActions");
  if (!listEl) return;

  listEl.innerHTML = "";
  if (cart.length === 0) {
    emptyEl.style.display = "block";
    actionsEl.style.display = "none";
    totalEl.style.display = "none";
    return;
  }
  emptyEl.style.display = "none";
  actionsEl.style.display = "flex";
  totalEl.style.display = "flex";

  cart.forEach((c) => {
    const row = document.createElement("div");
    row.className = "cart-line";
    const priceStr = formatPrice(c, currentCurrency);
    row.innerHTML = `
      <div class="cl-name">${escapeHtml(c.name)}${c.sub ? `<small>${escapeHtml(c.sub)}</small>` : ""}</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span>${priceStr}</span>
        <button class="cart-remove" title="Remove" onclick="removeFromCart(${c.id})">&times;</button>
      </div>`;
    listEl.appendChild(row);
  });

  // Discount is applied only here, to the final cart total — individual
  // item prices shown above and in every category modal stay unchanged.
  const originalTotalItem = { php: cartTotalPhp() };
  const discountedTotalItem = { php: cartTotalPhp() * (1 - DISCOUNT_RATE) };
  totalEl.innerHTML = `
    <div style="width:100%;">
      <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--muted);text-decoration:line-through;">
        <span>Subtotal</span><span>${formatPrice(originalTotalItem, currentCurrency)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;">
        <span>Total (5% off)</span><span>${formatPrice(discountedTotalItem, currentCurrency)}</span>
      </div>
    </div>`;

  const discordMsg = buildCartMessage();
  document.getElementById("discordCheckoutBtn").onclick = () => {
    navigator.clipboard && navigator.clipboard.writeText(discordMsg).catch(() => {});
    window.open(CONFIG.discordInvite, "_blank");
  };
  document.getElementById("paypalCheckoutBtn").href = CONFIG.paypalMe;
}

function buildCartMessage() {
  let msg = "Hi Pixelle! Here's what I'd like to order:\n";
  cart.forEach((c) => {
    msg += `- ${c.name}${c.sub ? " (" + c.sub + ")" : ""}: ${formatPrice(c, currentCurrency)}\n`;
  });
  const subtotal = { php: cartTotalPhp() };
  const discounted = { php: cartTotalPhp() * (1 - DISCOUNT_RATE) };
  msg += `Subtotal: ${formatPrice(subtotal, currentCurrency)}\n`;
  msg += `Total (5% off applied): ${formatPrice(discounted, currentCurrency)}`;
  return msg;
}

function toggleCartPanel(forceOpen) {
  const panel = document.getElementById("cartPanel");
  const open = forceOpen !== undefined ? forceOpen : !panel.classList.contains("open");
  panel.classList.toggle("open", open);
}

/* ---------------------------------------------------------------------- */
/* Utilities                                                               */
/* ---------------------------------------------------------------------- */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function itemRow(item, subLabel, disabled) {
  const priceStr = formatPrice(item, currentCurrency);
  const btn = disabled
    ? `<button class="add-btn" disabled title="Not live yet">Add</button>`
    : `<button class="add-btn" onclick='addToCart(${JSON.stringify(item).replace(/'/g, "&#39;")})'>Add</button>`;
  return `
    <div class="item-row">
      <div class="item-name">${escapeHtml(item.name)}${subLabel ? `<small>${escapeHtml(subLabel)}</small>` : ""}</div>
      <div class="item-price">${priceStr}</div>
      ${btn}
    </div>`;
}

/* ---------------------------------------------------------------------- */
/* Modal rendering per category                                           */
/* ---------------------------------------------------------------------- */

let openModalId = null;

function openModal(id) {
  openModalId = id;
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  openModalId = null;
}
function renderAllCategoryModalsIfOpen() {
  // Re-render currently open modal's prices when currency changes
  if (openModalId === "modalExploration") renderExplorationModal();
  if (openModalId === "modalWorldQuests") renderWorldQuestsModal();
  if (openModalId === "modalArchon") renderArchonModal();
  if (openModalId === "modalMaintenance") renderMaintenanceModal();
  if (openModalId === "modalMisc") renderMiscModal();
  if (openModalId === "modalEvents") renderEventsModal();
}

function renderExplorationModal() {
  const el = document.getElementById("explorationBody");
  let html = `<p class="subgroup-note">${EXPLORATION_DATA.note}</p>`;

  html += `<div class="subgroup-title">Region bundles (full completion, best value)</div>`;
  html += `<p class="subgroup-note">${EXPLORATION_BUNDLES.note}</p>`;
  EXPLORATION_BUNDLES.items.forEach((it) => {
    html += itemRow(it, it.sub);
  });

  EXPLORATION_DATA.regions.forEach((region) => {
    html += `<div class="subgroup-title">${escapeHtml(region.region)}</div>`;
    region.areas.forEach((area) => {
      const refBits = [];
      if (area.mid) refBits.push(`mid-progress: ${area.mid}`);
      if (area.high) refBits.push(`81%+: ${formatPrice({ php: area.high }, currentCurrency)}`);
      const sub = refBits.length ? refBits.join(" \u2022 ") : "";
      html += itemRow({ name: area.name, php: area.php }, sub);
    });
  });

  html += `<div class="subgroup-title">Frost Moon (Nod-Krai) area breakdown</div>`;
  html += `<p class="subgroup-note">${FROST_MOON_DATA.note}</p>`;
  html += itemRow(FROST_MOON_DATA.worldQuest, "world quest");
  FROST_MOON_DATA.areas.forEach((area) => {
    const first = { name: area.name, php: area.tiers[0].php, usd: area.tiers[0].usd, eur: area.tiers[0].eur };
    const restLabel = area.tiers.slice(1).map((t) => `${t.label}: ${formatPrice(t, currentCurrency)}`).join(" \u2022 ");
    html += itemRow(first, `${area.tiers[0].label} \u2022 ${restLabel}`);
  });
  html += itemRow(FROST_MOON_DATA.bundle, FROST_MOON_DATA.bundle.sub);

  html += `<div class="subgroup-title">Oculi (per piece, with compass)</div>`;
  html += `<p class="subgroup-note">${EXPLORATION_DATA.oculiFootnote}</p>`;
  EXPLORATION_DATA.oculiPerPiece.forEach((it) => {
    html += itemRow(it, it.note);
  });

  html += `<div class="subgroup-title">Offering items (per piece)</div>`;
  EXPLORATION_DATA.offeringItemsPerPiece.forEach((it) => {
    html += itemRow(it);
  });

  el.innerHTML = html;
}

function renderWorldQuestsModal() {
  const el = document.getElementById("worldQuestsBody");
  let html = "";
  WORLD_QUESTS_DATA.regions.forEach((region) => {
    html += `<div class="subgroup-title">${escapeHtml(region.region)}</div>`;
    region.quests.forEach((q) => {
      html += itemRow(q);
    });
  });
  WORLD_QUESTS_DATA.extras.forEach((group) => {
    html += `<div class="subgroup-title">${escapeHtml(group.group)}</div>`;
    group.items.forEach((it) => {
      html += itemRow(it, it.note);
    });
  });
  el.innerHTML = html;
}

function renderArchonModal() {
  const el = document.getElementById("archonBody");
  let html = "";
  ARCHON_QUESTS_DATA.forEach((chapter) => {
    html += `<div class="subgroup-title">${escapeHtml(chapter.chapter)}</div>`;
    chapter.acts.forEach((act) => {
      html += itemRow(act);
    });
  });
  el.innerHTML = html;
}

function renderMaintenanceModal() {
  const el = document.getElementById("maintenanceBody");
  let html = "";
  MAINTENANCE_DATA.tiers.forEach((tier) => {
    html += `<div class="package-tier">
      <h4>${escapeHtml(tier.title)}</h4>
      <div class="tier-note">${escapeHtml(tier.note)}</div>
      <div class="package-options">`;
    tier.options.forEach((opt) => {
      const priceStr = formatPrice(opt, currentCurrency);
      html += `<div class="package-option">
        <div class="po-info">
          <div class="po-name">${escapeHtml(opt.name)}</div>
          <div class="po-includes">${escapeHtml(opt.includes)}</div>
        </div>
        <div class="item-price">${priceStr}</div>
        <button class="add-btn" onclick='addToCart(${JSON.stringify({ name: tier.title + ": " + opt.name, php: opt.php }).replace(/'/g, "&#39;")})'>Add</button>
      </div>`;
    });
    html += `</div></div>`;
  });
  html += `<div class="subgroup-title">Add-on options</div>`;
  MAINTENANCE_DATA.addOns.forEach((it) => {
    html += itemRow(it);
  });
  el.innerHTML = html;
}

function renderMiscModal() {
  const el = document.getElementById("miscBody");
  let html = "";
  MISC_DATA.forEach((group) => {
    html += `<div class="subgroup-title">${escapeHtml(group.group)}</div>`;
    group.items.forEach((it) => {
      html += itemRow(it, it.note);
    });
  });
  el.innerHTML = html;
}

function renderEventsModal() {
  const el = document.getElementById("eventsBody");
  let html = `<p class="subgroup-note">Time-limited events — check back often, these rotate as new events go live.</p>`;
  EVENTS_DATA.forEach((ev) => {
    const sub = ev.type + (ev.status ? ` \u2022 ${ev.status}` : "");
    html += itemRow(ev, sub, ev.status === "Not yet live");
  });
  el.innerHTML = html;
}

/* ---------------------------------------------------------------------- */
/* REVIEWS
   ------------------------------------------------------------------------
   Reviews are hardcoded in data.js (REVIEWS_DATA) and rendered directly by
   the inline script at the bottom of index.html. There is no submit form
   or backend — this was intentionally simplified since only Pixelle adds
   reviews, after getting permission from each reviewer over Discord.
   ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Christmas theme: falling snow                                          */
/* ---------------------------------------------------------------------- */

function spawnSnow(count) {
  const container = document.getElementById("snowfall");
  if (!container) return;
  const flakes = ["\u2744", "\u2745", "\u2746"];
  for (let i = 0; i < count; i++) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.fontSize = (0.7 + Math.random() * 1.3) + "rem";
    flake.style.animationDuration = (8 + Math.random() * 10) + "s";
    flake.style.animationDelay = "-" + (Math.random() * 10) + "s";
    flake.style.setProperty("--drift", (Math.random() * 100 - 50) + "px");
    container.appendChild(flake);
  }
}

/* ---------------------------------------------------------------------- */
/* Init                                                                    */
/* ---------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  spawnSnow(45);
});
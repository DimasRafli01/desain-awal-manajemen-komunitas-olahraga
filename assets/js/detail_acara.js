// Data dummy peserta & anggota
const eventMembers = Array.from({ length: 8 }, (_, i) => ({
  name: `Anggota ${i + 1}`,
  avatar: "",
}));

const attendedParticipants = [
  "Bambang Sugilang",
  "Bembeng Sugeleng",
];

// Elemen Navigasi Utama
const mainTabBtns = document.querySelectorAll(".main-tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const bottomActionWrapper = document.getElementById("bottom-action-wrapper");
const mainActionBtn = document.getElementById("main-action-btn");

// Elemen Tab Jadwal
const dayPills = document.querySelectorAll(".day-pill");

// Elemen Tab Anggota
const hostListEl = document.getElementById("event-host-list");
const memberGridEl = document.getElementById("event-member-grid");

// Elemen Tab Absensi
const absensiSubtabBtns = document.querySelectorAll(".absensi-subtab-btn");
const subpanelKonfirmasi = document.getElementById("subpanel-konfirmasi");
const subpanelHadir = document.getElementById("subpanel-hadir");
const attendedListEl = document.getElementById("attended-list");

// Elemen Tab Biaya
const courtFeeInput = document.getElementById("court-fee-input");
const globalExpensesContainer = document.getElementById("global-expenses-container");
const addGlobalExpenseBtn = document.getElementById("add-global-expense-btn");
const totalCostText = document.getElementById("total-cost-text");
const splitResultBox = document.getElementById("split-result-box");
const perPersonCostEl = document.getElementById("per-person-cost");

// Elemen Pop-up Undang Teman
const invitePopup = document.getElementById("invite-popup");
const inviteBackdrop = document.getElementById("invite-backdrop");
const closeInviteBtn = document.getElementById("close-invite-btn");
const copyInviteBtn = document.getElementById("copy-invite-btn");
const inviteLinkText = document.getElementById("invite-link-text");

let currentMainTab = "jadwal";
const confirmedParticipantCount = 10;

// Helper Avatar Lingkaran
function createAvatarHTML(name, avatarUrl = "") {
  return `
    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D6D9DE] overflow-hidden relative shrink-0 border-2 border-white/15 flex items-center justify-center mx-auto">
      <svg class="w-8 h-8 text-[#64748B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
      <img
        src="${avatarUrl}"
        alt="${name}"
        class="absolute inset-0 w-full h-full object-cover"
        onerror="this.style.display='none'"
      />
    </div>
  `;
}

// Render Daftar Host & Anggota
function renderMembers() {
  hostListEl.innerHTML = `<div class="shrink-0">${createAvatarHTML("Host")}</div>`;
  memberGridEl.innerHTML = eventMembers
    .map((member) => createAvatarHTML(member.name, member.avatar))
    .join("");
}

// Render Daftar Peserta Hadir
function renderAttendedList() {
  attendedListEl.innerHTML = attendedParticipants
    .map((name, index) => `<li>${index + 1}. ${name}</li>`)
    .join("");
}

// Ganti Tab Utama (Jadwal, Anggota, Absensi, Biaya)
function switchMainTab(targetTab) {
  currentMainTab = targetTab;

  mainTabBtns.forEach((btn) => {
    const isActive = btn.dataset.tab === targetTab;
    btn.classList.toggle("text-[#C4F135]", isActive);
    btn.classList.toggle("text-white", !isActive);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== `panel-${targetTab}`);
  });

  // Atur tombol bawah sesuai desain masing-masing tab
  if (targetTab === "jadwal" || targetTab === "anggota") {
    bottomActionWrapper.classList.remove("hidden");
    mainActionBtn.textContent = "Undang Teman";
  } else if (targetTab === "biaya") {
    bottomActionWrapper.classList.remove("hidden");
    mainActionBtn.textContent = "Hitung Biaya";
  } else {
    // Pada tab Absensi tidak ada tombol hijau bawah
    bottomActionWrapper.classList.add("hidden");
  }
}

mainTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => switchMainTab(btn.dataset.tab));
});

// Interaksi Pilihan Hari pada Tab Jadwal
dayPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    dayPills.forEach((p) => {
      p.className =
        "day-pill w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-white text-white font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition cursor-pointer";
    });
    pill.className =
      "day-pill w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#162536] bg-[#C4F135] text-[#162536] font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition cursor-pointer";
  });
});

// Interaksi Sub-tab pada Tab Absensi
absensiSubtabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSub = btn.dataset.subtab;

    absensiSubtabBtns.forEach((b) => {
      const active = b.dataset.subtab === targetSub;
      b.classList.toggle("text-[#C4F135]", active);
      b.classList.toggle("text-white", !active);
    });

    subpanelKonfirmasi.classList.toggle("hidden", targetSub !== "konfirmasi");
    subpanelHadir.classList.toggle("hidden", targetSub !== "hadir");
  });
});

// Helper Format & Parsing Rupiah
function parseRupiah(str) {
  const digits = String(str).replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function formatRupiah(num) {
  return num.toLocaleString("id-ID");
}

function updateTotalCost() {
  const courtFee = parseRupiah(courtFeeInput.value);
  let globalTotal = 0;

  document.querySelectorAll(".global-fee-input").forEach((input) => {
    globalTotal += parseRupiah(input.value);
  });

  const grandTotal = courtFee + globalTotal;
  totalCostText.textContent = `Rp${formatRupiah(grandTotal)}`;
  return grandTotal;
}

// Auto-format titik ribuan saat mengetik nominal
function attachCurrencyFormatter(inputEl) {
  inputEl.addEventListener("input", () => {
    const raw = parseRupiah(inputEl.value);
    inputEl.value = raw > 0 ? formatRupiah(raw) : "";
    updateTotalCost();
  });
}

attachCurrencyFormatter(courtFeeInput);
document.querySelectorAll(".global-fee-input").forEach(attachCurrencyFormatter);

// Tambah baris Biaya Global baru saat tombol + diklik
addGlobalExpenseBtn.addEventListener("click", () => {
  const row = document.createElement("div");
  row.className = "global-expense-row pt-1";
  row.innerHTML = `
    <input
      type="text"
      placeholder="Nama pengeluaran (mis. Kok / Bola)"
      class="w-full max-w-md bg-transparent border-b border-white/30 text-white placeholder-white/50 text-sm sm:text-base pb-1 mb-2 focus:outline-none focus:border-[#C4F135]"
    />
    <div class="flex items-center gap-3 max-w-md">
      <div class="flex-1 flex items-center h-[44px] sm:h-[48px] px-3.5 rounded-lg bg-[#D6D6D3] text-[#111827]">
        <span class="font-bold text-base sm:text-lg mr-3 select-none">Rp</span>
        <input
          type="text"
          inputmode="numeric"
          placeholder="0"
          class="global-fee-input w-full bg-transparent text-base sm:text-lg font-medium focus:outline-none"
        />
      </div>
      <button type="button" class="remove-expense-btn w-9 h-9 text-white/70 hover:text-red-400 text-xl font-bold cursor-pointer">
        &times;
      </button>
    </div>
  `;

  globalExpensesContainer.appendChild(row);
  const newInput = row.querySelector(".global-fee-input");
  attachCurrencyFormatter(newInput);

  row.querySelector(".remove-expense-btn").addEventListener("click", () => {
    row.remove();
    updateTotalCost();
  });
});

// Aksi Tombol Bawah ("Undang Teman" atau "Hitung Biaya")
mainActionBtn.addEventListener("click", () => {
  if (currentMainTab === "biaya") {
    const total = updateTotalCost();
    const perPerson = Math.ceil(total / confirmedParticipantCount);
    perPersonCostEl.textContent = `Rp${formatRupiah(perPerson)} / orang`;
    splitResultBox.classList.remove("hidden");
  } else {
    invitePopup.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }
});

// Tutup & Salin Link Pop-up Undang Teman
function closeInvitePopup() {
  invitePopup.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

closeInviteBtn.addEventListener("click", closeInvitePopup);
inviteBackdrop.addEventListener("click", closeInvitePopup);

copyInviteBtn.addEventListener("click", () => {
  navigator.clipboard?.writeText(inviteLinkText.textContent.trim());
  copyInviteBtn.textContent = "Tersalin!";
//   setTimeout(() => {
//     copyInviteBtn.textContent = "Salin";
//   }, 1500);
});

// Inisialisasi tampilan awal
renderMembers();
renderAttendedList();
updateTotalCost();
const items = [
  {
    id: 1,
    title: "FUNMATCH FUTSAL",
    date: "20 Nov 2026",
    location: "Pajus",
    image: "assets/img/futsal.jpg",
    headerSchedule: "JUMAT, NOV 20 @16:00",
    dayName: "Kamis",
    fullAddress: "Jl. Candi Borobudur No.2, Medan Petisah, Sumatera Utara, Indonesia",
    hosts: [
      { name: "Host 1", avatar: "" },
      { name: "Host 2", avatar: "" },
    ],
    participants: [
      { name: "Peserta 1", avatar: "" },
      { name: "Peserta 2", avatar: "" },
    ],
  },
  {
    id: 2,
    title: "FUNMATCH BADMINTON",
    date: "20 Nov 2026",
    location: "Pajus",
    image: "assets/img/badminton.jpg",
    headerSchedule: "JUMAT, NOV 20 @19:00",
    dayName: "Jumat",
    fullAddress: "GOR Pajus, Jl. Jamin Ginting, Padang Bulan, Medan",
    hosts: [{ name: "Host 1", avatar: "" }],
    participants: [
      { name: "Peserta 1", avatar: "" },
      { name: "Peserta 2", avatar: "" },
    ],
  },
];

// Elemen Pencarian
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resultsContainer = document.getElementById("event-results");

// Elemen Bottom Sheet Detail
const eventModal = document.getElementById("event-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalDatetime = document.getElementById("modal-datetime");
const modalHosts = document.getElementById("modal-hosts");
const modalDay = document.getElementById("modal-day");
const modalAddress = document.getElementById("modal-address");
const modalParticipants = document.getElementById("modal-participants");
const joinEventBtn = document.getElementById("join-event-btn");

// Elemen Pop-up Sukses
const successPopup = document.getElementById("success-popup");
const confirmRedirectBtn = document.getElementById("confirm-redirect-btn");

function renderAvatars(people) {
  return people
    .map(
      (person) => `
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D6D9DE] overflow-hidden relative shrink-0 border border-black/10 flex items-center justify-center">
        <svg class="w-7 h-7 text-[#64748B]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
        <img
          src="${person.avatar}"
          alt="${person.name}"
          class="absolute inset-0 w-full h-full object-cover"
          onerror="this.style.display='none'"
        />
      </div>
    `
    )
    .join("");
}

function openEventDetail(eventId) {
  const eventData = items.find((item) => item.id === eventId);
  if (!eventData) return;

  modalDatetime.textContent = eventData.headerSchedule;
  modalDay.textContent = eventData.dayName;
  modalAddress.textContent = eventData.fullAddress;
  modalHosts.innerHTML = renderAvatars(eventData.hosts);
  modalParticipants.innerHTML = renderAvatars(eventData.participants);

  eventModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeEventDetail() {
  eventModal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function renderCards(data) {
  if (data.length === 0) {
    resultsContainer.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <p class="text-[#162536] font-semibold text-base">Hasil tidak ditemukan</p>
        <p class="text-[#64748B] text-sm mt-1">Coba kata kunci lain untuk menemukan acara.</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = data
    .map(
      (item) => `
      <article
        data-event-id="${item.id}"
        class="event-card group relative h-[175px] sm:h-[195px] rounded-[20px] overflow-hidden bg-[#162536] shadow-md cursor-pointer"
      >
        <img
          src="${item.image}"
          alt="${item.title}"
          class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15"></div>

        <div class="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-end">
          <h2 class="text-white text-lg sm:text-xl font-bold tracking-wide uppercase">
            ${item.title}
          </h2>

          <div class="mt-2.5 flex items-center justify-between gap-2">
            <div class="flex items-center gap-4 sm:gap-5 text-white text-xs sm:text-sm font-medium">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#FACC15] shrink-0" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>${item.date}</span>
              </div>

              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#FACC15] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                <span>${item.location}</span>
              </div>
            </div>

            <button
              type="button"
              data-event-id="${item.id}"
              aria-label="Detail ${item.title}"
              class="open-detail-btn w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 border border-white/25 text-white flex items-center justify-center group-hover:bg-[#C4F135] group-hover:text-[#162536] group-hover:border-[#C4F135] transition cursor-pointer shrink-0"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function handleSearch() {
  const keyword = searchInput.value.toLowerCase().trim();
  clearBtn.classList.toggle("hidden", keyword.length === 0);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword)
  );

  renderCards(filtered);
}

searchInput.addEventListener("input", handleSearch);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  handleSearch();
});

cancelBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.blur();
  handleSearch();
});

resultsContainer.addEventListener("click", (event) => {
  const trigger = event.target.closest(".open-detail-btn, .event-card");
  if (!trigger) return;

  const eventId = Number(trigger.dataset.eventId);
  openEventDetail(eventId);
});

closeModalBtn.addEventListener("click", closeEventDetail);
modalBackdrop.addEventListener("click", closeEventDetail);

// Saat tombol "Minta Bergabung" diklik -> tampilkan pop-up -> alihkan ke index.html
let redirectTimer = null;

joinEventBtn.addEventListener("click", () => {
  closeEventDetail();
  successPopup.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

  // redirectTimer = setTimeout(() => {
  //   window.location.href = "/beranda_berisi.html";
  // }, 1800);
});

confirmRedirectBtn.addEventListener("click", () => {
  clearTimeout(redirectTimer);
  window.location.href = "./beranda_berisi.html";
});

// Tampilkan semua kartu saat halaman pertama kali dibuka
renderCards(items);


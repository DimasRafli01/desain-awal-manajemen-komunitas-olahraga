const availableCommunities = [
    {
        id: 1,
        name: "Badminton asoy",
        members: 15,
        image: "assets/img/badminton.jpg",
        day: "Sabtu",
        address: "GOR Pajus, Jl. Jamin Ginting, Padang Bulan, Medan",
        hosts: [{ name: "Host 1", avatar: "" }],
        memberList: Array.from({ length: 8 }, (_, i) => ({
            name: `Anggota ${i + 1}`,
            avatar: "",
        })),
    },
    {
        id: 2,
        name: "Futsal no kaleng2",
        members: 45,
        image: "assets/img/futsal.jpg",
        day: "Kamis",
        address: "Jl. Candi Borobudur No.2, Medan Petisah, Sumatera Utara, Indonesia",
        hosts: [{ name: "Host 1", avatar: "" }],
        memberList: Array.from({ length: 8 }, (_, i) => ({
            name: `Anggota ${i + 1}`,
            avatar: "",
        })),
    },
];

// Elemen Modal 1: Temukan Komunitas Baru
const openDiscoverBtn = document.getElementById("open-discover-btn");
const discoverModal = document.getElementById("discover-modal");
const discoverBackdrop = document.getElementById("discover-backdrop");
const closeDiscoverBtn = document.getElementById("close-discover-btn");
const communityListContainer = document.getElementById("new-community-list");
const discoverSearchInput = document.getElementById("discover-search-input");

// Elemen Modal 2: Detail Komunitas
const detailModal = document.getElementById("community-detail-modal");
const detailBackdrop = document.getElementById("detail-backdrop");
const closeDetailBtn = document.getElementById("close-detail-btn");
const detailImg = document.getElementById("detail-community-img");
const detailName = document.getElementById("detail-community-name");
const detailHosts = document.getElementById("detail-hosts");
const detailMembers = document.getElementById("detail-members");
const detailDay = document.getElementById("detail-day");
const detailAddress = document.getElementById("detail-address");

// Elemen Tab Anggota & Aktivitas
const tabAnggotaBtn = document.getElementById("tab-anggota-btn");
const tabAktivitasBtn = document.getElementById("tab-aktivitas-btn");
const tabAnggotaPanel = document.getElementById("tab-anggota-panel");
const tabAktivitasPanel = document.getElementById("tab-aktivitas-panel");
const joinBtnWrapper = document.getElementById("join-btn-wrapper");

// Elemen Tombol Gabung & Pop-up Konfirmasi
const joinCommunityBtn = document.getElementById("join-community-btn");
const successPopup = document.getElementById("success-popup");
const confirmRedirectBtn = document.getElementById("confirm-redirect-btn");

function renderAvatarCircle(person) {
    return `
    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D6D9DE] overflow-hidden relative shrink-0 border border-black/10 flex items-center justify-center mx-auto">
      <svg class="w-8 h-8 text-[#64748B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
      <img
        src="${person.avatar}"
        alt="${person.name}"
        class="absolute inset-0 w-full h-full object-cover"
        onerror="this.style.display='none'"
      />
    </div>
  `;
}

function renderNewCommunities(list) {
    if (list.length === 0) {
        communityListContainer.innerHTML = `
      <div class="py-12 text-center">
        <p class="text-[#162536] font-semibold text-base">Komunitas tidak ditemukan</p>
        <p class="text-[#64748B] text-sm mt-1">Coba kata kunci nama komunitas lain.</p>
      </div>
    `;
        return;
    }

    communityListContainer.innerHTML = list
        .map(
            (item) => `
      <div
        data-community-id="${item.id}"
        class="discover-item group flex items-center gap-5 sm:gap-6 cursor-pointer rounded-2xl p-1.5 -mx-1.5 hover:bg-black/5 transition"
      >
        <div class="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden bg-[#D6D9DE] shrink-0 shadow-sm">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div class="min-w-0 flex-1">
          <h3 class="text-[19px] sm:text-2xl font-semibold text-black leading-snug truncate">
            ${item.name}
          </h3>

          <div class="mt-2 flex items-center gap-2.5 text-[#162536] text-base sm:text-lg font-semibold">
            <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>${item.members}</span>
          </div>
        </div>
      </div>
    `
        )
        .join("");
}

function switchDetailTab(tabName) {
    if (tabName === "anggota") {
        tabAnggotaBtn.classList.remove("text-[#22364A]");
        tabAnggotaBtn.classList.add("text-[#F46A25]");

        tabAktivitasBtn.classList.remove("text-[#F46A25]");
        tabAktivitasBtn.classList.add("text-[#22364A]");

        tabAnggotaPanel.classList.remove("hidden");
        tabAktivitasPanel.classList.add("hidden");
        joinBtnWrapper.classList.remove("hidden");
    } else {
        tabAktivitasBtn.classList.remove("text-[#22364A]");
        tabAktivitasBtn.classList.add("text-[#F46A25]");

        tabAnggotaBtn.classList.remove("text-[#F46A25]");
        tabAnggotaBtn.classList.add("text-[#22364A]");

        tabAktivitasPanel.classList.remove("hidden");
        tabAnggotaPanel.classList.add("hidden");
        joinBtnWrapper.classList.add("hidden");
    }
}

function openDiscoverModal() {
    discoverSearchInput.value = "";
    renderNewCommunities(availableCommunities);
    discoverModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeDiscoverModal() {
    discoverModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

function openDetailModal(communityId) {
    const community = availableCommunities.find((c) => c.id === communityId);
    if (!community) return;

    detailImg.src = community.image;
    detailImg.alt = community.name;
    detailName.textContent = community.name;
    detailDay.textContent = community.day;
    detailAddress.textContent = community.address;

    detailHosts.innerHTML = community.hosts
        .map((host) => `<div class="shrink-0">${renderAvatarCircle(host)}</div>`)
        .join("");

    detailMembers.innerHTML = community.memberList
        .map((member) => renderAvatarCircle(member))
        .join("");

    switchDetailTab("anggota");

    discoverModal.classList.add("hidden");
    detailModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeDetailModal() {
    detailModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

// Event Modal 1
openDiscoverBtn.addEventListener("click", openDiscoverModal);
closeDiscoverBtn.addEventListener("click", closeDiscoverModal);
discoverBackdrop.addEventListener("click", closeDiscoverModal);

discoverSearchInput.addEventListener("input", (event) => {
    const keyword = event.target.value.toLowerCase().trim();
    const filtered = availableCommunities.filter((item) =>
        item.name.toLowerCase().includes(keyword)
    );
    renderNewCommunities(filtered);
});

// Klik item komunitas pada Modal 1 -> buka Modal 2
communityListContainer.addEventListener("click", (event) => {
    const card = event.target.closest(".discover-item");
    if (!card) return;
    const id = Number(card.dataset.communityId);
    openDetailModal(id);
});

// Event Modal 2 & Pergantian Tab
closeDetailBtn.addEventListener("click", closeDetailModal);
detailBackdrop.addEventListener("click", closeDetailModal);
tabAnggotaBtn.addEventListener("click", () => switchDetailTab("anggota"));
tabAktivitasBtn.addEventListener("click", () => switchDetailTab("aktivitas"));

// Klik "Minta Bergabung" -> tutup detail -> munculkan pop-up -> alihkan ke komunitas.html
let redirectTimer = null;

joinCommunityBtn.addEventListener("click", () => {
    closeDetailModal();
    successPopup.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    //   redirectTimer = setTimeout(() => {
    //     window.location.href = "komunitas_berisi.html";
    //   }, 1800);
});

confirmRedirectBtn.addEventListener("click", () => {
    clearTimeout(redirectTimer);
    window.location.href = "komunitas_berisi.html";
});

// Render awal
renderNewCommunities(availableCommunities);
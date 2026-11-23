const dayCircles = document.querySelectorAll(".day-circle");
const visibilitySelect = document.getElementById("event-visibility");
const visibilityIcon = document.getElementById("visibility-icon");
const createEventForm = document.getElementById("create-event-form");
const eventNameInput = document.getElementById("event-name");
const eventTimeInput = document.getElementById("event-time");
const eventLocationInput = document.getElementById("event-location");

// Elemen Pop-up 1: Konfirmasi "Anda yakin?"
const confirmPopup = document.getElementById("confirm-event-popup");
const confirmBackdrop = document.getElementById("confirm-backdrop");
const confirmSummaryText = document.getElementById("confirm-summary-text");
const cancelConfirmBtn = document.getElementById("cancel-confirm-btn");
const proceedCreateBtn = document.getElementById("proceed-create-btn");

// Elemen Pop-up 2: "Acara Berhasil Dibuat!"
const createdPopup = document.getElementById("event-created-popup");
const summaryText = document.getElementById("event-summary-text");

let selectedDay = "";

// 1. Interaksi Pilihan Hari (Lingkaran Putus-putus)
dayCircles.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedDay = btn.dataset.day;

    dayCircles.forEach((circle) => {
      circle.className =
        "day-circle w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-white text-white font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition cursor-pointer";
    });

    btn.className =
      "day-circle w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#162536] bg-[#C4F135] text-[#162536] font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition cursor-pointer";
  });
});

// 2. Ubah ikon gembok otomatis saat Visibilitas diganti antara Privat / Publik
visibilitySelect.addEventListener("change", () => {
  if (visibilitySelect.value === "Publik") {
    visibilityIcon.innerHTML = `
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.5-1.9" />
    `;
  } else {
    visibilityIcon.innerHTML = `
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    `;
  }
});

// Helper tutup pop-up konfirmasi
function closeConfirmPopup() {
  confirmPopup.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

// 3. Klik LANJUTKAN -> Munculkan Pop-up 1 ("Anda yakin?")
createEventForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = eventNameInput.value.trim() || "Acara Baru";
  const time = eventTimeInput.value || "13:00";
  const location = eventLocationInput.value.trim() || "Lokasi terpilih";
  const dayLabel = selectedDay ? `hari ${selectedDay}, ` : "";

  confirmSummaryText.textContent = `Apakah kamu yakin ingin membuat acara "${name}" pada ${dayLabel}pukul ${time} WIB di ${location}?`;
  confirmPopup.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});

// 4. Klik Batal pada Pop-up 1
cancelConfirmBtn.addEventListener("click", closeConfirmPopup);
confirmBackdrop.addEventListener("click", closeConfirmPopup);

// 5. Klik Buat Acara pada Pop-up 1 -> Tutup Pop-up 1 & Munculkan Pop-up 2 ("Acara Berhasil Dibuat!")
proceedCreateBtn.addEventListener("click", () => {
  const name = eventNameInput.value.trim() || "Acara Baru";
  const time = eventTimeInput.value || "13:00";
  const location = eventLocationInput.value.trim() || "Lokasi terpilih";
  const dayLabel = selectedDay ? `hari ${selectedDay}, ` : "";

  confirmPopup.classList.add("hidden");

  summaryText.textContent = `"${name}" berhasil dijadwalkan ${dayLabel}pukul ${time} WIB di ${location}.`;
  createdPopup.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});
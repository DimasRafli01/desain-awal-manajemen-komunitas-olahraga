const nameInput = document.getElementById("community-name-input");
const privacyCheckboxes = document.querySelectorAll(".privacy-checkbox");
const submitBtn = document.getElementById("submit-community-btn");
const createdPopup = document.getElementById("created-popup");
const createdDesc = document.getElementById("created-community-desc");

function validateForm() {
  const hasName = nameInput.value.trim().length > 0;
  const selectedPrivacy = Array.from(privacyCheckboxes).find((cb) => cb.checked);

  if (hasName && selectedPrivacy) {
    submitBtn.disabled = false;
    submitBtn.className =
      "w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#C4F135] hover:brightness-95 text-[#162536] font-bold text-base sm:text-lg tracking-wide uppercase shadow-md active:scale-[0.99] transition cursor-pointer";
  } else {
    submitBtn.disabled = true;
    submitBtn.className =
      "w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#F4F5F0] text-[#9E9E9A] font-bold text-base sm:text-lg tracking-wide uppercase transition cursor-not-allowed";
  }
}

// Pastikan hanya satu kotak centang (Privat atau Publik) yang terpilih
privacyCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      privacyCheckboxes.forEach((other) => {
        if (other !== checkbox) other.checked = false;
      });
    }
    validateForm();
  });
});

nameInput.addEventListener("input", validateForm);

// Tampilkan pop-up saat tombol LANJUTKAN diklik
submitBtn.addEventListener("click", () => {
  if (submitBtn.disabled) return;

  const communityName = nameInput.value.trim();
  const privacy = Array.from(privacyCheckboxes).find((cb) => cb.checked)?.value || "";

  createdDesc.textContent = `Komunitas "${communityName}" (${privacy}) telah dibuat. Yuk mulai buat acara pertamamu!`;
  createdPopup.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});
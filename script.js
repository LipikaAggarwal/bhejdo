
// ==================================
// BHEJDO.ME - WEBSITE INTERACTIONS
// ==================================

// Replace these with your actual UPI details.
const UPI_ID = "lipika.aggarwal@ptyes";
const PAYEE_NAME = "Your Name";

let selectedAmount = 50;

const amountButtons = document.querySelectorAll(".amount");
const customAmount = document.getElementById("customAmount");
const paymentHint = document.getElementById("paymentHint");
const payButton = document.getElementById("payButton");
const toast = document.getElementById("toast");


// TOAST MESSAGE

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}


// AMOUNT SELECTION

function setAmount(amount) {
  selectedAmount = amount;
  customAmount.value = "";

  amountButtons.forEach(button => {
    button.classList.toggle(
      "selected",
      Number(button.dataset.amount) === amount
    );
  });

  paymentHint.textContent =
    `Selected: ₹${amount} · No pressure. Bas dil se. ♡`;
}


// AMOUNT BUTTON EVENTS

amountButtons.forEach(button => {
  button.addEventListener("click", () => {
    setAmount(Number(button.dataset.amount));
  });
});


// CUSTOM AMOUNT

customAmount.addEventListener("input", () => {

  amountButtons.forEach(button => {
    button.classList.remove("selected");
  });

  const amount = Number(customAmount.value);

  if (
    Number.isInteger(amount) &&
    amount > 0 &&
    amount <= 100000
  ) {
    selectedAmount = amount;

    paymentHint.textContent =
      `Selected: ₹${amount} · Wah, dil bada hai! ♡`;

  } else {

    paymentHint.textContent =
      "Enter a valid amount (₹1–₹1,00,000).";
  }

});


// PAYMENT BUTTON

payButton.addEventListener("click", () => {

  const amount = customAmount.value
    ? Number(customAmount.value)
    : selectedAmount;

  if (
    !Number.isInteger(amount) ||
    amount < 1 ||
    amount > 100000
  ) {
    showToast("Please choose a valid amount first 🥹");
    return;
  }

  // Demo mode until UPI ID is configured.

  if (
    !UPI_ID ||
    UPI_ID === "YOUR-UPI-ID@bank"
  ) {
    showToast(
      "Payment demo only! Add your UPI ID in script.js first."
    );
    return;
  }

  // Create UPI payment intent.

  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    am: amount.toFixed(2),
    cu: "INR",
    tn: "Voluntary contribution via bhejdo.me"
  });

  window.location.href =
    `upi://pay?${params.toString()}`;

});


// CURRENT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// MOBILE NAVIGATION

const menuToggle =
  document.getElementById("menuToggle");

const nav =
  document.getElementById("nav");

menuToggle.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});

nav.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


// SCROLL REVEAL ANIMATIONS

const revealItems = document.querySelectorAll(
  ".payment-card, .why-section, .fineprint"
);

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach(item => {
    observer.observe(item);
  });

} else {

  revealItems.forEach(item => {
    item.classList.add("is-visible");
  });

}

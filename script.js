// script.js
const startDate = new Date("2025-06-10");
const today = new Date();
const diffTime = today - startDate;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
document.getElementById("contador").textContent = `${diffDays} dias 💞`;

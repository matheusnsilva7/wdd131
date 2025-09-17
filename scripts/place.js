const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const wcEl = document.getElementById("windchill");
const yearEl = document.getElementById("year");
const lastEl = document.getElementById("lastmodified");

const tempC = 8;
const windKmh = 20;

function calculateWindChill(T, v) {
  return (13.12 + 0.6215 * T - 11.37 * Math.pow(v, 0.16) + 0.3965 * T * Math.pow(v, 0.16)
  );
}

if (tempEl) tempEl.textContent = tempC;
if (windEl) windEl.textContent = windKmh;

function displayWindChill() {
  const T = tempC;
  const v = windKmh;
  if (T <= 10 && v > 4.8) {
    const wc = calculateWindChill(T, v);
    wcEl.textContent = `${wc.toFixed(1)} °C`;
  } else {
    wcEl.textContent = "N/A";
  }
}

function setFooterDates() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastEl) lastEl.textContent = document.lastModified || "Unknown";
}

displayWindChill();
setFooterDates();

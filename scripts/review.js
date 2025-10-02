let count = Number(localStorage.getItem("reviewCount")) || 0;
count++;

localStorage.setItem("reviewCount", count);

document.getElementById("reviewCount").textContent = count;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById(
  "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;

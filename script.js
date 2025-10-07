const bodyElement = document.body;

const mainElement = document.createElement("main");
bodyElement.appendChild(mainElement);

const sectionElement = document.createElement("section");
mainElement.appendChild(sectionElement);

const inputDate = document.createElement("input");
inputDate.setAttribute("id", "inputDate");
inputDate.setAttribute("type", "date");
inputDate.setAttribute("max", "2025-12-14");

const title = document.createElement("h1");
title.textContent = "Cronómetro";

const subtitle = document.createElement("h2");
subtitle.textContent = `Tiempo desde hoy hasta mi cumpleaños`;

const table = document.createElement("table");
const tableTitles = ["Meses", "Días", "Horas", "Minutos", "Segundos"];
const tableElements = ["months", "days", "hours", "minutes", "seconds"];

for (let i = 0; i < 2; i++) {
  const file = document.createElement("tr");
  if (i == 0) {
    for (let j = 0; j < 5; j++) {
      const column = document.createElement("th");
      column.textContent = `${tableTitles[j]}`;
      file.appendChild(column);
    }
  } else {
    for (let j = 0; j < 5; j++) {
      const column = document.createElement("td");
      column.setAttribute("id", `${tableElements[j]}Column`);
      column.textContent = "0";
      file.appendChild(column);
    }
  }
  table.appendChild(file);
}

const daysLeft = document.createElement("h3");

const birthdayDate = new Date("2025-10-07");
birthdayDate.setHours(11, 36, 0);
const limitDate = document.createElement("h3");
limitDate.textContent = `${birthdayDate.toLocaleDateString()}`;
sectionElement.appendChild(limitDate);

sectionElement.appendChild(title);
sectionElement.appendChild(subtitle);
sectionElement.appendChild(limitDate);
sectionElement.appendChild(table);
sectionElement.appendChild(daysLeft);
sectionElement.appendChild(inputDate);

let dateNow = new Date();
let currentDate = new Date();

let minDay = String(dateNow.getDate()).padStart(2, "0");
let minMonth = String(dateNow.getMonth() + 1).padStart(2, "0");
let minYear = dateNow.getFullYear();
let minDate = `${minYear}-${minMonth}-${minDay}`;
inputDate.setAttribute("min", minDate);

const timeToChange = 1000;

counter();

function counter() {
  let counterDays = 0;
  let counterMonths = 0;
  let counterHours = 0;
  let counterMinutes = 0;
  let counterSeconds = 0;

  daysLeft.textContent = ``;

  let birthYear = birthdayDate.getFullYear();
  let currentYear = currentDate.getFullYear();
  let birthMonth = birthdayDate.getMonth();
  let currentMonth = currentDate.getMonth();

  const monthColumn = document.getElementById("monthsColumn");
  const daysColumn = document.getElementById("daysColumn");
  const hoursColumn = document.getElementById("hoursColumn");
  const minutesColumn = document.getElementById("minutesColumn");
  const secondsColumn = document.getElementById("secondsColumn");

  if (currentDate <= birthdayDate) {
    let monthsLeft = (birthYear - currentYear) * 12 + birthMonth - currentMonth;
    if (currentDate.getDate() > birthdayDate.getDate()) {
      monthsLeft--;
    }
    if (monthsLeft < 0) {
      monthsLeft = 0;
    }
    counterMonths = monthsLeft;

    if (currentDate.getDate() < birthdayDate.getDate()) {
      counterDays = birthdayDate.getDate() - currentDate.getDate();
    } else {
      const dayInMonth = new Date(birthYear, birthMonth, 0).getDate();
      counterDays = dayInMonth - currentDate.getDate() + birthdayDate.getDate();
    }

    counterHours = 24 - currentDate.getHours();
    if (counterHours > 0) counterDays--;

    counterMinutes = 60 - currentDate.getMinutes();
    if (counterMinutes > 0) counterHours--;

    counterSeconds = 60 - currentDate.getSeconds();
    if (counterSeconds > 0) counterMinutes--;

    let differenceDate = birthdayDate - currentDate;
    if (differenceDate <= 0) {
      clearInterval(intervalDate);
    }

    if (counterMonths >= 1) {
      table.style.color = "#16a34a";
    } else if (counterMonths <= 0 && counterDays < 7) {
      table.style.color = "#ef4444";
    } else {
      table.style.color = "#fbbf24";
    }
    currentDate = new Date(currentDate.getTime() + timeToChange);
  } else {
    table.style.color = "#ef4444";
    counterDays = 0;
    counterMonths = 0;
    counterHours = 0;
    counterMinutes = 0;
    counterSeconds = 0;
    daysLeft.style.color = "#ef4444";
    daysLeft.textContent = `La fecha actual no puede ser mayor que la fecha máxima`;
  }

  monthColumn.textContent = `${counterMonths}`;
  daysColumn.textContent = `${counterDays}`;
  hoursColumn.textContent = `${counterHours}`;
  minutesColumn.textContent = `${counterMinutes} `;
  secondsColumn.textContent = `${counterSeconds} `;
}

const intervalDate = setInterval(() => {
  counter();
}, timeToChange);

inputDate.addEventListener("change", (e) => {
  let dateString = e.target.value;
  currentDate = new Date(dateString);
  const now = new Date();
  currentDate.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  counter();
});

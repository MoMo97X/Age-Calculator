// getting input fields
const input = {
  day: document.getElementById("day"),
  month: document.getElementById("month"),
  year: document.getElementById("year"),
};

// results container's.
const results = {
  year: document.getElementById("years"),
  month: document.getElementById("months"),
  day: document.getElementById("days"),
};

// getting error message div's
const error = {
  day: document.getElementById("day-error"),
  month: document.getElementById("month-error"),
  year: document.getElementById("year-error"),
};

// getting labels
const label = {
  day: document.getElementById("label-day"),
  month: document.getElementById("label-month"),
  year: document.getElementById("label-year"),
};

function resetUi() {
  const keys = ["day", "month", "year"];

  keys.forEach((key) => {
    error[key].textContent = "";
    input[key].classList.remove("red");
    label[key].classList.remove("error-message");
    results[key].textContent = "--";
  });
  document.getElementById("inputs").textContent = "";
}

function setError(key, message) {
  input[key].classList.add("red");
  label[key].classList.add("error-message");
  error[key].textContent = message;
}

function isRealCalendarDate(day, month, year) {
  const check = new Date(year, month - 1, day);
  return (
    check.getFullYear() === year &&
    check.getMonth() === month - 1 &&
    check.getDate() === day
  );
}

function errorCheck(day, month, year) {
  let state = false;

  // days verification
  if (input.day.value === "") {
    setError("day", "This field is required");
    state = true;
  } else if (!Number.isInteger(day)) {
    setError("day", "must be a number");
    state = true;
  } else if (input.day.value < 1 || input.day.value > 31) {
    setError("day", "Must be a valid day");
    state = true;
  }

  // months verification
  if (input.month.value === "") {
    setError("month", "This field is required");
    state = true;
  } else if (!Number.isInteger(month)) {
    setError("month", "must be a number");
    state = true;
  } else if (input.month.value < 1 || input.month.value > 12) {
    setError("month", "Must be a valid month");
    state = true;
  }

  // years verification
  if (input.year.value === "") {
    setError("year", "This field is required");
    state = true;
  } else if (!Number.isInteger(year)) {
    setError("year", "must be a number");
    state = true;
  } else if (input.year.value > year) {
    setError("year", "must be in the past");
    state = true;
  }

  if (!isRealCalendarDate(day, month, year)) {
    document.getElementById("inputs").textContent = `must be a valid date`;
    state = true;
  }

  return state;
}

function ageCalc() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  resetUi();

  let isValid = errorCheck(
    Number(input.day.value),
    Number(input.month.value),
    Number(input.year.value),
  );

  if (!isValid) {
    let year = currentYear - input.year.value;
    let month = currentMonth - input.month.value;
    let day = currentDay - input.day.value;

    if (day < 0) {
      month = month - 1;
      const daysInPrevMonth = new Date(
        currentYear,
        currentMonth - 1,
        0,
      ).getDate();
      day += daysInPrevMonth;
    }

    if (month < 0) {
      year = year - 1;
      month += 12;
    }

    // this shouldn't run in every case !.
    if (day < 10) {
      results.day.textContent = String(day).padStart(2, "0");
    } else {
      results.day.textContent = day;
    }

    if (month < 10) {
      results.month.textContent = String(month).padStart(2, "0");
    } else {
      results.month.textContent = month;
    }

    results.year.textContent = year;
  }
}

const sendBtn = document.getElementById("btn");
sendBtn.addEventListener("click", ageCalc);

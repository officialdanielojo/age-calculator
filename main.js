// To get the days, month and year.
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");

// For the error message
const date = document.querySelectorAll(".date");
const error = document.querySelectorAll(".error");
const dateBorder = document.querySelectorAll(".date-border");

// For the button
const calculatorButton = document.querySelector("#calculateButton");

// Function to calculate age
function calculateAge() {
  // Get input values
  const inputDay = parseInt(day.value);
  const inputMonth = parseInt(month.value);
  const inputYear = parseInt(year.value);

  // Validate input for empty input
  if (isNaN(inputDay) || isNaN(inputMonth) || isNaN(inputYear)) {
    for (let i = 0; i < date.length; i++) {
      date[i].style.color = "red";
    }

    for (let i = 0; i < error.length; i++) {
      error[i].style.display = "block";
    }

    for (let i = 0; i < dateBorder.length; i++) {
      dateBorder[i].style.border = "1px solid red";
    }
    return;
  } else {
    for (let i = 0; i < date.length; i++) {
      date[i].style.color = "";
    }
    for (let i = 0; i < error.length; i++) {
      error[i].style.display = "";
    }
    for (let i = 0; i < dateBorder.length; i++) {
      dateBorder[i].style.border = "";
    }
  }

  // Get current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  const currentYear = currentDate.getFullYear();

  // Array to get days
  const daysInNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const leapYearDay = [29];

  const monthsNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Function to get the leap year
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  if (inputDay > daysInNum[inputMonth - 1] && isLeapYear(inputYear)) {
    daysInNum[1] = 29;
  }

  if (
    inputDay > daysInNum[inputMonth - 1] ||
    inputYear > currentYear ||
    (inputMonth > currentMonth && inputYear >= currentYear)
  ) {
    for (let i = 0; i < date.length; i++) {
      date[i].style.color = "red";
    }

    for (let i = 0; i < error.length; i++) {
      error[i].style.display = "block";
      error[i].innerText = "Input a valid date";
    }

    for (let i = 0; i < dateBorder.length; i++) {
      dateBorder[i].style.border = "1px solid red";
    }
    return;
  }

  // Calculate age
  let ageYear = currentYear - inputYear;
  let ageMonth = currentMonth - inputMonth;
  let ageDay = currentDay - inputDay;

  // Adjust for negative age components
  if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
    ageYear--;
    ageMonth += 12;
  }
  if (ageDay < 0) {
    const daysInPrevMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageDay += daysInPrevMonth;
    ageMonth--;
  }
  if (inputYear === currentYear) {
    ageYear = 0;
  }

  // Display the calculated age
  document.querySelector("#days").textContent = ageDay;
  document.querySelector("#months").textContent = ageMonth;
  document.querySelector("#years").textContent = ageYear;
}

// When button is clicked
calculatorButton.addEventListener("click", calculateAge);

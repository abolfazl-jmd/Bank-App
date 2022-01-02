// *? ALL OUR ELEMENTS THAT WE ARE GOING TO USE IN THIS PROJECT
const loginWrapper = document.querySelector(".login__wrapper");
const usernameInput = document.querySelector(".username");
let usernameErrorMsg = document.querySelector(".username__error");
const passwordInput = document.querySelector(".password");
let passwordErrorMsg = document.querySelector(".password__error");
const loginSubmitBtn = document.querySelector(".submit--btn");
const bankAppContainer = document.querySelector(".main__caontainer");
const titles = document.querySelector(".title__wrapper");
const forms = document.querySelectorAll(".form");
const navbar = document.querySelector(".navbar");
const modals = document.querySelectorAll(".modals");
const closeModalIcons = document.querySelectorAll(".icon--close");
const userImage = document.querySelector(".user__image");
const movementsDiv = document.querySelector(".movements");
const balanceLabel = document.querySelector(".balance");
const exitAccountBtn = document.querySelector(".modal__exit--submit");
const exitUsernameInput = document.querySelector(".exit__input--username");
const exitPasswordInput = document.querySelector(".exit__input--password");
const loanInputAmount = document.querySelector(".loan__input--amount");
const loanBtn = document.querySelector(".modal__loan--submit");
const transferBtn = document.querySelector(".modal__transfer--submit");
const recieverAccUsername = document.querySelector(
  ".transfer__input--username"
);
const transferAmount = document.querySelector(".transfer__input--amount");
const labelDate = document.querySelector(".date");
const labelTime = document.querySelector(".time");

// ** CHANGING THE LOGIN PAGE AND SIGN UP BT CLICKING AT THEIR TITLES
const switchForm = function (e) {
  // *! WE need to add the hidden class to both forms first loop over the array
  forms.forEach((form) => {
    form.classList.add("form--deactive");

    // *? NOW WE NEED TO MAKE ONE OF THEM CISIBLE USING THE DATA SET WE GAVE BOTH TITLES AND FORMS
    let clicked = e.target.closest(".title__option");

    // handling null
    if (!clicked) return;

    if (clicked.dataset.set === form.dataset.set) {
      form.classList.remove("form--deactive");
    }
  });
};

titles.addEventListener("click", switchForm);
// ---------------------------------------------------------------------------------------------

// * OPENING AND CLOSING OUR ACTION MODALS FUNCTION
navbar.addEventListener("click", (e) => {
  // *? IN THIS WAY WE GET OUR OPTION DIV WHETHER IT'S LICKED ON THE a LINK OR ICONS
  let clicked = e.target.closest(".options");

  // HANDLING WHEN IT BECAME NULL
  if (!clicked) return;

  modals.forEach((modal) => {
    modal.classList.add("hidden");

    if (modal.dataset.set === clicked.dataset.set) {
      modal.classList.remove("hidden");
    }
  });
});

// CLOSING THE MODALS WHEN CLICKED ON THE CLOSE ICONS

closeModalIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    let parentElement = e.target.closest(".modals");
    parentElement.classList.add("hidden");
  });
});

// ----------------------------------------------------------------------------------------------

// ** THESE ARE GOING TO BE UR FAKE DATA FOR THIS BEAUTIFUL APP
// Data
const account1 = {
  owner: "Emilia Clarck",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2020-09-01T13:15:33.035Z",
    "2020-09-30T09:48:16.867Z",
    "2020-10-25T06:04:23.907Z",
    "2021-10-25T14:18:46.235Z",
    "2021-10-05T16:33:06.386Z",
    "2021-11-10T14:43:26.374Z",
    "2021-11-29T18:49:59.371Z",
    "2021-11-30T12:01:20.894Z",
  ],
  locale: "en-GB",
  currency: "EUR",
  profile: "./assets/pictures/Emilia Clark.jpg",
};

const account2 = {
  owner: "Arman Ahmadi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2020-09-01T13:15:33.035Z",
    "2020-09-30T09:48:16.867Z",
    "2020-10-25T06:04:23.907Z",
    "2021-10-25T14:18:46.235Z",
    "2021-10-05T16:33:06.386Z",
    "2021-11-10T14:43:26.374Z",
    "2021-11-29T18:49:59.371Z",
    "2021-11-30T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
  profile: "./assets/pictures/Arman Ahmadi.jfif",
};

const account3 = {
  owner: "Abolfazl Jamshidi",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2021-09-01T13:15:33.035Z",
    "2021-09-30T09:48:16.867Z",
    "2021-10-25T06:04:23.907Z",
    "2021-10-25T14:18:46.235Z",
    "2021-10-05T16:33:06.386Z",
    "2021-11-10T14:43:26.374Z",
    "2021-11-29T18:49:59.371Z",
    "2021-11-30T12:01:20.894Z",
  ],
  currency: "IRR",
  locale: "fa-IR",
  profile: "./assets/pictures/Abolfazl Jamshidi.jpeg",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90, -1500, 3000, -700],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2021-09-01T13:15:33.035Z",
    "2021-09-30T09:48:16.867Z",
    "2021-10-25T06:04:23.907Z",
    "2021-10-25T14:18:46.235Z",
    "2021-10-05T16:33:06.386Z",
    "2021-11-10T14:43:26.374Z",
    "2021-11-29T18:49:59.371Z",
    "2021-11-30T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
  profile: "./assets/pictures/Srah Smith.jpg",
};

const accounts = [account1, account2, account3, account4];

////////////////// FUNCTIONS ////////////////////////////////////

// TIME AND DATE FUNCS
const now = new Date();

// options for Intl
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "short",
  year: "numeric",
};

// * CREATING A USERNAME FOR EVERY ACCOUNT
const createUsername = function (accs) {
  accs.forEach((acc) => {
    // creating the username
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createUsername(accounts);

// FORMATTED DATE FUNCTION
const formattedDate = function (date, locale) {
  // calculating how many days have passed from the movement
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDaysPassed(new Date(), date);

  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// FORMATTING THE NUMBERS OF MOVEMENTS
const formatNum = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// * SHOWING THE MOVEMENTS OF THE ACCOUNTS FUNCTION
const displayMovements = function (acc) {
  acc.movements.forEach((movement, i) => {
    // *? WE SHOULD DEFINE IF THE MOV NUBER IS A DEPOSITE OR WITHDRAWL
    let mov = movement > 0 ? "deposite" : "withdrawl";

    // creating a new date and giving the date from our account object
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formattedDate(date, acc.locale);

    const formatNumValue = formatNum(movement, acc.locale, acc.currency);

    const movementTime =
      acc.movementsDates[i].split("T")[1].split(".")[0] ||
      `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`;

    // * CREATING THE HTML MARKUP
    const htmlMarkup = `<div class="movement">
    <div class="cash__description">
      <h2 class="cash__amount">${formatNumValue}</h2>
      <div class="cash__label ${mov}">${mov}</div>
    </div>

    <dive class="time__details">
      <p class="movement__date">${displayDate}</p>
      <p class="movement__time">${movementTime}</p>
    </dive>
  </div>

  <hr />`;

    movementsDiv.insertAdjacentHTML("afterbegin", htmlMarkup);
  });
};

// displayMovements(account1);

// * DISPLAYING THE BALANCE AMOUNT OF THE ACCOUNT
const displayBalance = function (acc) {
  // We want to add a property named balance to account as well as showing it
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  balanceLabel.textContent = `${formatNum(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

// displayBalance(account1);

// UPDATING THE IMAGE OF THE USER
const updateUserImage = function (acc) {
  userImage.src = acc.profile;
};

const displayMainDate = function (acc) {
  labelDate.textContent = new Intl.DateTimeFormat(acc.locale, options).format(
    now
  );
};

// *! WE NEED A FUNC TO UPDATE THE UI BY CALLING OUR MADE FUNCS

const updateUI = function (acc) {
  displayMainDate(acc);

  displayMovements(acc);

  updateUserImage(acc);

  displayBalance(acc);
};

// --------------------------------- SUBMIT BUTTON FUNC ---------------------------
// * We define a global ariable because we need it in other situations
let currentAccount;

// ** SIMPLE LOGIN VALIDATION
const showBankPage = function (e) {
  e.preventDefault();

  // * CHECK TO SEE IF THE USER'S PASSWORD IS NOT ONLY IN THE OBJECT OF THE ACCOUNT BUT ALSO GREATER THAN 7 CHARS

  if (passwordInput.value.length < 3) {
    passwordErrorMsg.textContent = "Password is too short!";
    passwordInput.innerHTML = usernameInput.innerHTML = "";
  }

  // * CHECK TO SEE IF THE USER'S USERNAME IS IN OUR OBJECT OF ACCOUNTS
  currentAccount = accounts.find((acc) => acc.username === usernameInput.value);

  if (!currentAccount) {
    usernameErrorMsg.textContent = "Please, enter a valid username!";
  }
  // console.log(currentAccount);

  if (+passwordInput.value === currentAccount.pin) {
    // WE SHOULD REMOVE THE HIDDEN CLASS FROM THE BANK PAGE AND ADD IT TO THE LOGIN PAGE

    bankAppContainer.classList.remove("hidden");
    loginWrapper.classList.add("hidden");

    // * we should create a welcome message for the user with its name in it
    let usernameWelcome = currentAccount.owner.split(" ")[0];

    document.querySelector(
      ".welcme__msg"
    ).innerHTML = `Welcome, ${usernameWelcome}`;

    usernameInput.innerHTML = passwordInput.innerHTML = "";
    updateUI(currentAccount);
  }
};

loginSubmitBtn.addEventListener("click", showBankPage);

// TRANSFERING MONEY TO OTHER ACCOUNTS
transferBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let amount = +transferAmount.value;
  // WE SHOULD FIND THE ACCOUNT THAT THE USER HAS GIVEN US
  const recieverAccount = accounts.find(
    (acc) => acc.username === recieverAccUsername.value
  );

  if (amount > 0 && amount < currentAccount.balance) {
    // ADDING THE AMOUNT TO THE ACCOUNT
    recieverAccount.movements.push(amount);
    recieverAccount.movementsDates.push(now.toUTCString());

    // WE SHOULD SUBTRACT THE SAME AMOUNT FROM THE ACCOUNT
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(now.toUTCString());
    document.querySelector(".transfer__error").textContent = " ";
  } else {
    document.querySelector(".transfer__error").textContent = "Not enough money";
  }
  transferAmount.textContent = recieverAccUsername.textContent = "";

  updateUI(currentAccount);
});

// GETTING THE LOAN FUNCTION
let loanCounter = 0;
loanBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // ? WE NEED TO GIVE THE AMOUNT OF MONEY REQUESTED WITH AT LEAST 5 SECONDS DELAY AND A CONDITION THAT THE MONEY SHOULD BE LESS THAN THE 3 TIMES OF THE BALANCE AMOUNT

  // * A NEW FEATURE WE WANT TO ADD IS IF THE USER HAS REQUESTED ONCE AND GOT THE LOAN, THE USER CANNOT GET THE LOAN AGAIN

  const loanAmount = +loanInputAmount.value;

  if (
    loanAmount > 0 &&
    loanAmount <= currentAccount.balance * 3 &&
    loanCounter < 1
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(now.toUTCString());

      console.log(loanCounter);
      updateUI(currentAccount);
    }, 5000);
  } else {
    document.querySelector(".loan__error").textContent =
      "Sorry! You can get loan only once.";

    // making the message vanish
    setTimeout(() => {
      document.querySelector(".loan__error").textContent = "";
    }, 2000);
  }
  loanCounter++;

  loanInputAmount.innerHTML = "";
});

// CLOSING ACCOUNT FUNCTION
exitAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // *! WE SHOULD CHECK TO SEE IF THE CURRENT ACCOUNT USERNAME AND PASS MATCH WITH THE USER'S INPUTS

  if (
    exitUsernameInput.value === currentAccount.username &&
    +exitPasswordInput.value === currentAccount.pin
  ) {
    bankAppContainer.classList.add("hidden");
    loginWrapper.classList.remove("hidden");
  }

  exitUsernameInput.innerHTML = exitPasswordInput.innerHTML = "";
});

// // Showing the time
// function displayCurrentTime() {
//   let now = new Date();
//   let h = now.getHours();
//   let m = now.getMinutes();
//   let s = now.getSeconds();
//   let session = "A.M";

//   if (h >= 13) {
//     h = h - 12;
//     session = "P.M";
//   }

//   h = h < 10 ? `0${h}` : h;
//   m = m < 10 ? `0${m}` : m;
//   s = s < 10 ? `0${s}` : s;

//   const time = `${h} : ${m} : ${s} : ${session}`;

//   labelTime.innerHTML = time;
// }
// setInterval(() => {
//   displayCurrentTime();
// }, 1000);

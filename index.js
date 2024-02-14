'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Idrees Faiz',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const display = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
          <div class="movements__value">${mov} PKR</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
display(account1.movements);

const calcBalance = function (acc) {
  labelBalance.innerHTML = '';
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance} PKR`;
};
//  calcBalance(account1.movements);
//  ////////////////////////////////

const calcSummary = function (acc) {
  const incom = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incom} PKR`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${out} PKR`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest}`;
};
//  calcSummary(account1.movements);

const createUser = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUser(accounts);

let currentACC;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentACC = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentACC?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back , ${
      currentACC.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';

    update(currentACC);
  }
});

const update = function (acc) {
  display(acc.movements);
  calcBalance(acc);
  calcSummary(acc);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiveAcc &&
    currentACC.balance >= amount &&
    receiveAcc?.username !== currentACC.username
  ) {
    currentACC.movements.push(-amount);
    receiveAcc.movements.push(amount);
    console.log('huryy');
    inputTransferAmount.value = inputTransferTo.value = '';
    update(currentACC);
  }

  console.log(amount, receiveAcc);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentACC.username &&
   Number( inputClosePin.value) === currentACC.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentACC.username
    );
    inputCloseUsername.value = inputClosePin.value = ''
     console.log(index);

     accounts.splice(index,1)
     containerApp.style.opacity = 0
  }
 

  console.log('hy');
});

// console.log(accounts);

// const deposit  = movements.filter(function(mov){
//   return mov > 0
// })
// console.log(deposit);
// console.log(movements);

// const withdrawal = movements.filter(mov => mov > 0)
// console.log(  withdrawal);

// const balance  =  movements.reduce(function(acc,cur,i,arr){

// console.log(`iteration ${i} : ${acc}`);
// return  acc+cur
// },0)

// console.log(balance);

// const max = movements.reduce(function(acc,mov){
//   if(acc>mov){
//     return acc
//   }else{
//     return mov
//   }
// })

// console.log(max);

// const euro = 1.2;

// const totaldeposit = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euro/100)
//   .reduce((acc, mov) => acc + mov, 0);

//   console.log(totaldeposit);

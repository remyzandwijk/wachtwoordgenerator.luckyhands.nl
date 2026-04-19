// Generate macOS Passwords style passwords

const letters = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

const getRandomInt = (max) => {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

const shuffle = (arr) => {
  for (let i = arr.length -1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generatePassword = (length = 18) => {
  let password = [];

  // Required characters
  password.push(letters[getRandomInt(letters.length)].toUpperCase());
  password.push(digits[getRandomInt(digits.length)]);

  for (let i = 0; i < (length - 2); i++) {
    password.push(letters[getRandomInt(letters.length)]);
  }

  // Shuffle password
  password = shuffle(password);

  // Insert dash every six characters
  return password.join("").match(/.{1,6}/g).join('-');
};

const passwordTxt = document.getElementById("password");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");

window.addEventListener("load", () => {
  passwordTxt.value = generatePassword();
});

generateBtn.addEventListener("click", () => {
  passwordTxt.value = generatePassword();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordTxt.value);
  passwordTxt.style.backgroundColor = 'green';
  setTimeout(() => {
    passwordTxt.style.backgroundColor = 'white';
  }, 300)
});

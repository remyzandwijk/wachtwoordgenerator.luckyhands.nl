/* Generate macOS Keychain style passwords */
const numOfDigits = 1;
const numOfCapitals = 1;
const totalLength = 18;

const passwordTxt = document.getElementById("password");
const generateBtn = document.getElementById("generate");

document.body.onload = () => {
  passwordTxt.value = generatePassword();
};

generateBtn.addEventListener("click", () => {
  passwordTxt.value = generatePassword();
});

String.prototype.shuffle = function () {
  var a = this.split(""), n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a.join("");
}

const generatePassword = () => {
  let password = "";
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var digits = "0123456789";

  for (let i = 0; i < numOfCapitals; i++) {
    password += alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase();
  }

  for (let i = 0; i < numOfDigits; i++) {
    password += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  for (let i = 0; i < (totalLength - numOfCapitals - numOfDigits); i++) {
    password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  /* Shuffle password string */
  password = password.shuffle();

  /* Insert dash every six characters */
  return password.match(/.{1,6}/g).join('-');
};

const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordTxt.value);
  passwordTxt.style.backgroundColor = 'green';
  setTimeout(() => {
    passwordTxt.style.backgroundColor = 'white';
  }, 300)
});

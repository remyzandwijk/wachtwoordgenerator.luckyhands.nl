/* Generate macOS Keychain style passwords */
const numOfDigits = 1;
const numOfLetters = 1;
const totalLength = 18;

const passwordTxt = document.getElementById("password");
const generateBtn = document.getElementById("generate");


document.body.onload = () => {
  passwordTxt.value = generatePassword();
};


generateBtn.addEventListener("click", () => {
  passwordTxt.value = generatePassword();
});


const shuffle_array = (input) => {
  for (let i = input.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [input[i], input[j]] = [input[j], input[i]];
  }
  return input;
};


const generatePassword = () => {
  let password = [];
  var alphabet = shuffle_array(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                                "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
  var digits = shuffle_array(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

 
  for (let i = 0; i < numOfLetters; i++) {
    password.push(alphabet.pop().toUpperCase());
  }

  for (let i = 0; i < numOfDigits; i++) {
    password.push(digits.pop());
  }

  for (let i = 0; i < (totalLength - numOfLetters - numOfDigits); i++) {
    password.push(alphabet.pop());
  }

  /* Shuffle password array and convert to string */
  password_string = shuffle_array(password).join("");

  /* Insert dash every six characters */
  return password_string.match(/.{1,6}/g).join('-');
};


const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordTxt.value);
  passwordTxt.style.backgroundColor = 'green';
  setTimeout(() => {
    passwordTxt.style.backgroundColor = 'white';
  }, 300)
});

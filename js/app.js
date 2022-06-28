// kiruvchi sonni belgilab olish olish
const kiruvchiSon = document.querySelector(".dollor .inputNumber");
// chiquvchi sonni belgilab olish
const chiquvchiSon = document.querySelector(".dollor .outputValue");

// select qilish oynasi elementlarni tanlab olish
const options = document.querySelectorAll(".custom-select label");
const mask = document.querySelector("#selected");
const clickOpen = document.querySelector(".options");
const symbol = document.querySelector(".symbol");
const abbr = document.querySelector(".abbr");

// ekarnni istalgan joyiga bosganda options oynasini yopish
document.body.addEventListener(
  "click",
  () => {
    clickOpen.style.height = "0";
  },
  true
);

// mask ustiga bosganda optionlarni chiqarish
mask.addEventListener("click", () => {
  clickOpen.style.height = "120px";
});

// optionlarni ichiga kirish
options.forEach((element) => {
  element.onchange = function (e) {
    outToTop(e);
  };
});

// qaysi valyutani ko'rsatganini aniqlab olish uchun o'zgaruvchi
let whichMoney;

// qaysi valyuta tanlanganiga qarab UI oynani o'zgartirish
// va whichMoneyga qaysi summani tanlaganini taminlash
function outToTop(e) {
  const node = e.target;
  mask.innerHTML = node.dataset.name;
  abbr.innerHTML = node.value;
  symbol.innerHTML = node.dataset.symbol;

  // ichidagi biror element tanlanganda oyna yopiladi
  clickOpen.style.height = "0";

  // qiymatni parstdan olish un tanyinlash
  whichMoney = node.value;

  // yangi valyta tanlaganda qiymatlarni olib tashlansh
  kiruvchiSon.value = "";
  chiquvchiSon.value = "";
}

// Ekranda animatsiya turishi davomiyligi
const element = document.querySelector(".loader-container");
element.style.transition = "all 0.5s ease 0s";

// var kechikish = setTimeout(deleteLoader, 3000);

function deleteLoader() {
  element.style.opacity = "0";

  document.querySelector(".footer").style.display = "none";

  element.addEventListener("transitionend", () => {
    element.style.display = "none";
  });

  //   clearTimeout(kechikish);
}

let data = {};

// api manzilini olish
const api_url =
  "http://api.currencylayer.com/live?access_key=9412aeb3cb14d090f02bf6a8714c1f4f&currencies=UZS,RUB,EUR,CNY,KRW,JPY&format=1";

// JSON qabul qilib olish va dataga tayinlash
async function mainConvertor() {
  fetch(api_url)
    .then((response) => response.json())
    .then((exchange) => {
      data = exchange;
      deleteLoader();
    })
    .catch((e) => {
      document.body.innerHTML =
        "<h3 style='text-align:center; font-size:30px;'>Xatolik yuz berdi!!! <br> Iltimos sahifani yangilang</h3>";
    });
}

mainConvertor();
kiruvchiSon.addEventListener("keyup", (e) => {
  // agar foydalonuvchi nol raqami yozsa uni olib tashlash
  if (e.key == "0" && kiruvchiSon.value == "0") {
    kiruvchiSon.value = "";
  }

  if (typeof whichMoney === "undefined") {
    checkValyutaError();
  } else if (whichMoney === "USD") {
    let k = kiruvchiSon.value * data.quotes.USDUZS * 1;
    chiquvchiSon.value = k.toFixed(2);
  } else if (whichMoney === "EUR") {
    let k;
    chiquvchiSon.value = (
      (kiruvchiSon.value * data.quotes.USDUZS) /
      data.quotes.USDEUR
    ).toFixed(2);
  } else if (whichMoney === "RUB") {
    chiquvchiSon.value = (
      (kiruvchiSon.value * data.quotes.USDUZS) /
      data.quotes.USDRUB
    ).toFixed(2);
  } else if (whichMoney === "CNY") {
    chiquvchiSon.value = (
      (kiruvchiSon.value * data.quotes.USDUZS) /
      data.quotes.USDCNY
    ).toFixed(2);
  } else if (whichMoney === "KRW") {
    chiquvchiSon.value = (
      (kiruvchiSon.value * data.quotes.USDUZS) /
      data.quotes.USDKRW
    ).toFixed(2);
  } else if (whichMoney === "JPY") {
    chiquvchiSon.value = (
      (kiruvchiSon.value * data.quotes.USDUZS) /
      data.quotes.USDJPY
    ).toFixed(2);
  }

  if (kiruvchiSon.value == "") chiquvchiSon.value = "";
  chiquvchiSon.placeholder = "0";
});

// foydalanuvchi valyutani tanlamasa
function checkValyutaError() {
  mask.style.animation = "0.8s shakeX ease";
  kiruvchiSon.value = "";
  kiruvchiSon.placeholder = "0";

  mask.addEventListener("animationend", () => {
    mask.style.animation = "";
  });
}

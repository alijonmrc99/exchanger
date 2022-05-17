// chart malumotlani olish uchun API

const api_url_usd =
  "https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=USD&to_symbol=UZS&apikey=PLAAJCHWGNZTCYRY";

// let sana = [];
let sana = [];
let dataOfUSD = [];

async function getValueUSD() {
  const response = await fetch(api_url_usd);
  const data = await response.json();
  const mana = data["Time Series FX (Monthly)"];
  if (mana !== undefined) sana = Object?.keys(mana);
  else document.body.innerHTML = data.Note;
  let count = 0;
  for (let item in mana) {
    dataOfUSD[count] = mana[item]["4. close"];
    count++;
  }
  console.log(dataOfUSD);
}

const api_url_jpy =
  "https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=JPY&to_symbol=UZS&apikey=PLAAJCHWGNZTCYRY";

let dataOfJPY = [];

async function getValueJPY() {
  const response = await fetch(api_url_jpy);
  const data = await response.json();
  const mana = data["Time Series FX (Monthly)"];

  let count = 0;

  for (let item in mana) {
    dataOfJPY[count] = mana[item]["4. close"];
    count++;
    // console.log(dataOfJPY );
  }
}

const api_url_eur =
  "https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=EUR&to_symbol=UZS&apikey=PLAAJCHWGNZTCYRY";

let dataOfEUR = [];

async function getValueEUR() {
  const response = await fetch(api_url_eur);
  const data = await response.json();
  const mana = data["Time Series FX (Monthly)"];

  let count = 0;

  for (let item in mana) {
    dataOfEUR[count] = mana[item]["4. close"];
    count++;
    // console.log(dataOfEUR );
  }
}

const api_url_cny =
  "https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=CNY&to_symbol=UZS&apikey=21XTTGBDL2CBO627";

let dataOfCNR = [];

async function getValueKRW() {
  const response = await fetch(api_url_cny);
  const data = await response.json();
  const mana = data["Time Series FX (Monthly)"];

  let count = 0;

  //   console.log(data);
  for (let item in mana) {
    dataOfCNR[count] = mana[item]["4. close"];
    count++;
    // console.log(dataOfCNR);
  }
}

const api_url_rub =
  "https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=RUB&to_symbol=UZS&apikey=PLAAJCHWGNZTCYRY";

let dataOfRUB = [];
async function getValueRUB() {
  const response = await fetch(api_url_rub);
  const data = await response.json();
  const mana = data["Time Series FX (Monthly)"];
  console.log(mana);
  let count = 0;

  for (let item in mana) {
    dataOfRUB[count] = mana[item]["4. close"];
    count++;
  }
  deleteLoader();
}

getValueUSD();
getValueEUR();
getValueJPY();
getValueKRW();
getValueRUB();

let myChart = document.getElementById("myChart").getContext("2d");
let chartTwo = document.getElementById("chart-two").getContext("2d");

function drawChart() {
  sana.reverse();
  dataOfUSD.reverse();
  dataOfJPY.reverse();
  dataOfEUR.reverse();
  dataOfCNR.reverse();
  dataOfRUB.reverse();
  let chart = new Chart(myChart, {
    // diagramma turini tanlash
    type: "line", // bar hozirontalBar pie line doughnot radar polarArea
    // bizning ma'lumotlar bazamiz uchun ma'lumotlar
    data: {
      labels: sana,
      datasets: [
        {
          label: "Dollor o'sish diagrammasi",
          backgroundColor: "rgba(252,81,84)",
          borderColor: "rgb(33,151,33)",
          borderWidth: 1,
          pointBackgroundColor: "rgb(33,151,211)",
          pointHoverBackgroundColor: "#f0f",
          fill: false,
          data: dataOfUSD,
        },
        {
          label: "Yevro o'sish diagrammasi",
          backgroundColor: "rgba(252,81,235)",
          // borderColor: 'rgb(59,19,55)',
          fill: false,
          pointBackgroundColor: "rgb(255,221,0)",
          pointHoverBackgroundColor: "#f0f",
          borderColor: "rgb(252,81,235)",
          borderWidth: 1,
          hoverBorderWidth: 3,
          hoverBackgroundColor: "",
          data: dataOfEUR,
        },
      ],
    },
    // Konfiguratsidan parametrlarni to'g'irlash
    options: {
      title: {
        display: true,
        text: "Yevra va Dollorning so'mga nisbatan diagrammasi (2014-2020)",
      },
    },
  });
  //   console.log(dataOfRUB);
  let chart2 = new Chart(chartTwo, {
    // diagramma turini tanlash
    type: "line", // bar hozirontalBar pie line doughnot radar polarArea
    // bizning ma'lumotlar bazamiz uchun ma'lumotlar
    data: {
      labels: sana,
      datasets: [
        {
          label: "Yuan o'sish diagrammasi",
          borderColor: "rgba(252, 81, 84, 1)",
          pointBackgroundColor: "rgb(255,221,0)",
          pointHoverBackgroundColor: "#f00",
          fill: false,
          borderWidth: 1,
          hoverBorderWidth: 2,
          hoverBackgroundColor: "",
          data: dataOfJPY,
        },
        {
          label: "Yuan o'sish diagrammasi",
          fill: false,
          pointBackgroundColor: "rgb(255,221,0)",
          pointHoverBackgroundColor: "#f0f",
          borderColor: "rgb(80,26,27)",
          borderWidth: 1,
          hoverBorderWidth: 2,
          hoverBackgroundColor: "",
          data: dataOfCNR,
        },
        {
          label: "Rubl o'sish diagrammasi",
          borderColor: "rgb(247, 76, 229)",
          pointBackgroundColor: "rgb(58,226,206)",
          pointHoverBackgroundColor: "#f00",
          pointHoverBorderColor: "#f00",
          borderWidth: 1,
          hoverBorderWidth: 2,
          hoverBackgroundColor: "",
          data: dataOfRUB,
          fill: false,
        },
      ],
    },
    // Konfiguratsidan parametrlarni to'g'irlash
    options: {
      title: {
        display: true,
        text: "Yen Won va Rublning so'mga nisbatan diagrammasi (2014-2020)",
      },
      layout: {
        padding: {
          left: 0,
          top: 50,
          right: 0,
          bottom: 50,
        },
      },
    },
  });
}

// Ekranda animatsiya turishi davomiyligi
const element = document.querySelector(".loader-container");
element.style.transition = "all 0.5s ease 0s";

// var kechikish = setTimeout(deleteLoader, 1500)

function deleteLoader() {
  element.style.opacity = "0";

  drawChart();

  element.addEventListener("transitionend", () => {
    element.style.display = "none";
  });

  // clearTimeout(kechikish);
}

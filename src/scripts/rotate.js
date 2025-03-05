import { startShuffle } from "./script.js"
const win = "💎"
const lose = "💩"
let winningCard = Math.floor(Math.random() * (4 - 1))

const cards = [...document.querySelectorAll("[data-card]")]
const startButton = document.querySelector("[data-start]")
const icons = [...document.querySelectorAll("[data-icons]")]
const allIcons = [...document.querySelectorAll("[data-icon]")]

function showAllCards() {
  cards.forEach((card) => card.classList.remove("clouse"))
}

function hideAllCards() {
  cards.forEach((card) => card.classList.add("clouse"))
}

// Начало игры
showAllCards()

// При клике — раскрываем все карты (финал)
cards.forEach((card) => {
  card.addEventListener("click", () => {
    showAllCards()
  })
})

async function startGame() {
  hideAllCards()
  setTimeout(() => {
    startShuffle()
    changeVictoryCard()
  }, 800)
}

// Сбрасываем все карты до состояния lose
function resetAllCards() {
  for (let i = 0; i < allIcons.length; i++) {
    allIcons[i].innerText = lose
  }
}

// Рандомно выбираем победную карту
function changeVictoryCard() {
  resetAllCards()

  winningCard = Math.floor(Math.random() * (4 - 1))

  for (let i = 0; i < icons[winningCard].children.length; i++) {
    icons[winningCard].children[i].innerText = win
  }
}

resetAllCards()
changeVictoryCard()

startButton.addEventListener("click", () => startGame())

import { startShuffle } from "./script.js"
import { createNeonConfetti } from "./confetti.js"
const win = "💎"
const lose = "💩"
let winningCard = Math.floor(Math.random() * (4 - 1))
let gameWasPlayed = false

const cards = [...document.querySelectorAll("[data-card]")]
const startButton = document.querySelector("[data-start]")
const icons = [...document.querySelectorAll("[data-icons]")]
const allIcons = [...document.querySelectorAll("[data-icon]")]
const locking = document.querySelectorAll("[data-locking]")

// Блокируем экран на время перемешивания
const screenLock = () => locking[0].classList.add("locking-active")

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
    if (gameWasPlayed) {
      if (card.children[0].children[1].innerText === win) {
        console.log(win)
        createNeonConfetti()
      } else {
        console.log(lose)
      }
      gameWasPlayed = false
    }
  })
})

async function startGame() {
  hideAllCards()
  screenLock()
  setTimeout(() => {
    startShuffle()
    changeVictoryCard()
  }, 800)
  gameWasPlayed = true
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

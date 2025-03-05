import { startShuffle } from "./mixing.js"
import { createConfetti, showModal, winObj, loseObj } from "./modal.js"

const win = "💎"
const lose = "💩"
let winningCard = Math.floor(Math.random() * (4 - 1))
let gameWasPlayed = false

const cardsArr = [...document.querySelectorAll("[data-card]")]
const startButton = document.querySelector("[data-start]")
const icons = [...document.querySelectorAll("[data-icons]")]
const allIcons = [...document.querySelectorAll("[data-icon]")]
const locking = document.querySelectorAll("[data-locking]")

// Блокируем экран на время перемешивания
const screenLock = () => locking[0].classList.add("locking-active")

function showAllCards() {
  cardsArr.forEach((card) => card.classList.remove("clouse"))
}

function hideAllCards() {
  cardsArr.forEach((card) => card.classList.add("clouse"))
}

// При клике — раскрываем все карты (финал)
cardsArr.forEach((card) => {
  card.addEventListener("click", () => {
    showAllCards()
    if (gameWasPlayed) {
      if (card.children[0].children[1].innerText === win) {
        console.log(win)
        createConfetti()
        showModal(winObj)
      } else {
        showModal(loseObj)
      }
      gameWasPlayed = false
    }
  })
})

showAllCards()

function startGame() {
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

startButton.addEventListener("click", () => startGame())

resetAllCards()
changeVictoryCard()

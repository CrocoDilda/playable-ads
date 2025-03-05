const cards = [...document.querySelectorAll("[data-card]")]

function showAllCards() {
  cards.forEach((card) => card.classList.remove("flipped"))
}

function hideAllCards() {
  cards.forEach((card) => card.classList.add("flipped"))
}

// Начало игры
showAllCards()

setTimeout(() => {
  hideAllCards() // Через 3 секунды прячем
}, 3000)

// При клике — раскрываем все карты (финал)
cards.forEach((card) => {
  card.addEventListener("click", () => {
    showAllCards()
  })
})

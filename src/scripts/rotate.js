const cards = document.querySelectorAll("[data-card]")
const startButton = document.querySelector("[data-start]")
const container = document.querySelector("[data-list]")

const shuffleDuration = 4000 // Время анимации в ms
const stepsCount = 18 // Количество обменов
let positions = calculatePositions()
let stepWidth = positions[1]

// Вычисляем стартовые позиции карт
function calculatePositions() {
  const containerWidth = container.offsetWidth
  const cardWidth = cards[0].offsetWidth
  const totalGaps = cards.length - 1
  const padding = 40
  const gap = (containerWidth - cardWidth * cards.length) / totalGaps
  return [...cards].map((_, i) => i * (cardWidth + gap - padding))
}

function generateShuffleSequence(count) {
  const sequence = []
  let lastPair = null

  for (let i = 0; i < count; i++) {
    let pair
    do {
      const a = Math.floor(Math.random() * cards.length)
      let b = Math.floor(Math.random() * cards.length)
      while (b === a) b = Math.floor(Math.random() * cards.length)
      pair = a < b ? [a, b] : [b, a]
    } while (lastPair && pair[0] === lastPair[0] && pair[1] === lastPair[1])

    sequence.push(pair)
    lastPair = pair
  }

  console.log(sequence)
  return sequence
}

generateShuffleSequence(40)

function swapCards(index1, index2) {
  const pos1X = (index2 - index1) * stepWidth
  const pos2X = (index1 - index2) * stepWidth
  cards[index1].style.transform = `translateX(${pos1X}px)`
  cards[index2].style.transform = `translateX(${pos2X}px)`
  ;[positions[index1], positions[index2]] = [pos1X, pos2X]
  ;[cards[index1], cards[index2]] = [cards[index2], cards[index1]]
}

function startShuffle() {
  positions = calculatePositions()
  stepWidth = positions[1]

  const shuffleSequence = generateShuffleSequence(stepsCount)
  const stepDuration = shuffleDuration / stepsCount

  cards.forEach((card) => {
    card.style.transition = `transform ${stepDuration}ms ease-in-out`
  })

  let step = 0

  function nextStep() {
    if (step >= shuffleSequence.length) {
      setTimeout(
        () => cards.forEach((card) => (card.style.transform = "")),
        stepDuration / 2
      )
      return
    }

    const [a, b] = shuffleSequence[step]

    swapCards(a, b)

    step++
    setTimeout(nextStep, stepDuration)
  }

  nextStep()
}

startButton.addEventListener("click", startShuffle)

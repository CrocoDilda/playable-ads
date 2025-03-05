export function createNeonConfetti() {
  const confettiContainer = document.createElement("div")
  confettiContainer.classList.add("neon-confetti-container")
  document.body.appendChild(confettiContainer)

  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement("div")
    confetti.classList.add("neon-confetti")
    confetti.style.left = `${Math.random() * 100}vw`
    confetti.style.backgroundColor = getRandomNeonColor()
    confetti.style.boxShadow = `0 0 12px ${confetti.style.backgroundColor}`
    confettiContainer.appendChild(confetti)

    // Запуск отдельной анимации падения для каждого конфетти
    const duration = 3 + Math.random() * 2
    confetti.style.animation = `fall ${duration}s ease-out forwards, sparkle 2.5s infinite alternate ease-in-out`
    confetti.style.animationDelay = `${Math.random()}s`
  }

  setTimeout(() => {
    confettiContainer.remove()
  }, 7000)
}

function getRandomNeonColor() {
  const colors = ["#ff00ff", "#00ffff", "#ff0099", "#33ff33", "#ff3300"]
  return colors[Math.floor(Math.random() * colors.length)]
}

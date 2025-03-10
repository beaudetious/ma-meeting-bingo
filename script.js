const themeKey = 'meeting-bingo-theme'
const themeButton = document.getElementById('theme')
let activeTheme
const tileTemplate = document.getElementById('cell')
const card = document.getElementById('card')
const body = document.querySelector('body')
const tileOptions = [
  'You are muted',
  'Virtual background',
  'Dog barking',
  'Cat says hello',
  'Waving or clapping',
  'Coloring / drawing / journaling',
  'Can you hear me now?',
  'Walking / outside',
  'Tada / celebrate emoji is shared',
  'Can you see my screen?',
  'Timekeeper forgets to reset time',
  'Member shares too long',  
  'Eating during the call',
  'Running out of coffee or tea', 
  'Heart emoji / hand symbol is shared',
  'Mispronounced name',
  'Cooking during the meeting',
  'Day one share',
  'Kids in the background',
  'Clapping emoji / hand gesture is shared',
  'Thumbs up emoji / hand gesture is shared',  
  'What\'s the topic?',
  'Sorry, was talking on mute',
  'Honest / deep / vulnurable share',
  'I never heard of MA before',
  'Sad / crying face emoji is shared',  
  'Cat moons the camera',
  'Mentioned sponsor / sponsee',
  'Video shows just the top of the head',
  'Sorry I was late',
  'Somebody shares MA updates',
  'Yawn',
  'Driving',
  'Member with more than a year attends',
  'Relapsed / absent member returned',
  'Member achieves new step',
  'Member celebrating milestone',
  'Used a common 12 Step slogan',
  'Oops, cross talk',
  'Ceiling or floor camera',
  'Thank you for your service',
  'Awkward silence',
  'I\'m just rambling',
  'Newcomer shares',
  'We see you',
  'Pop culture reference or quote',
  'Burning desire shared',
  'You stay for the parking lot',
  'Numbers are shared',
  'A newcomer is attending',
  'I am grateful for this group',
  'Member is grooming themselves',
  'Praying emoji / hand gesture is shared',
  'Common withdrawal symptom is shared',
  'Nodding in agreement',
  'Video is on, chair is empty',
  'Cannabinoid Hyperemesis Syndrome (CHS) mentioned',
  'You shared',
  'You read a reading',
]

function generateCard() {
  'use strict'
  const tiles = Array(25)
  let i = 0;
  while (i < 25) {
    let option;
    if (i === 12) { option = 'FREE' }
    while(!option) {
      const index = getRandomInt(0, tileOptions.length - 1)
      const tile = tileOptions[index]
      if (!tiles.includes(tile)) { option = tile }
    }
    tiles[i] = option
    i++
  }
  
  card.innerHTML = '';
  tiles.forEach((option, i) => {
    const cell = tileTemplate.content.cloneNode(true)
    const label = cell.querySelector('label')
    if (i === 12) { label.classList.add('free')}
    const text = document.createTextNode(option)
    const span = cell.querySelector('span')
    span.appendChild(text)
    card.appendChild(cell)
  })
}

function getRandomInt(min, max) {
  'use strict'
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setTheme(newTheme) {
  if (newTheme === 'dark') { body.classList.remove('light') }
  if (newTheme === 'light') { body.classList.add('light') }
  activeTheme = newTheme
  localStorage.setItem(themeKey, newTheme)
}

function toggleTheme() {
  themeButton.innerHTML = `switch to ${activeTheme} theme`
  const newTheme = activeTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
}

function clearCard() {
  Array.from(card.querySelectorAll('input')).forEach((input, i) => {
    if (i === 12) { return }
    input.checked = false;
  })
}

(() => {
  'use strict'
  generateCard()

  let theme = localStorage.getItem(themeKey)
  if (
    !theme 
    && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    theme = 'light' 
  } else if (!theme) {
    theme = 'dark'
  }
  themeButton.innerHTML = `switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
  setTheme(theme)

  const year = new Date().getFullYear();
  const yearContainer = document.getElementById('year')
  yearContainer.innerText = year === 2024 ? year : `2024 - ${year}`

})()

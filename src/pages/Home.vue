<template>
  <div class="container">
    <h1>Реши квадратное уравнение</h1>

    <div class="equation-box">
      <p><strong>{{ equationText }}</strong></p>
    </div>

    <div class="input-group">
      <label for="x1">Введите корень x₁:</label>
      <input id="x1" v-model="userX1" type="text" placeholder="например, -7" />

      <label for="x2">Введите корень x₂:</label>
      <input
        id="x2"
        v-model="userX2"
        type="text"
        placeholder="например, 3/4"
        @keyup.enter="handleButtonClick"
      />
    </div>

    <div class="button-group">
      <button @click="handleButtonClick" class="primary">
        {{ buttonText }}
      </button>
    </div>

    <div v-if="resultMessage" class="result">
      {{ resultMessage }}
    </div>

    <div class="progress">
      <span>Решено уравнений:</span> <strong>{{ solvedCount }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const a = ref(1)
const b = ref(1)
const c = ref(1)
const userX1 = ref('')
const userX2 = ref('')
const realRoots = ref([0, 0])
const resultMessage = ref('')
const isSolved = ref(false) // Флаг для отслеживания состояния (решено или нет)
const solvedCount = ref(0) // Счётчик решённых уравнений

const buttonText = computed(() => (isSolved.value ? 'Новое уравнение' : 'Проверить'))

const equationText = computed(() => {
    const part = (coef, variable, showSign = true) => {
        if (coef === 0) return ''
        const abs = Math.abs(coef)
        const sign = coef > 0 ? (showSign ? ' + ' : '') : ' - '
        const val = abs === 1 && variable !== '' ? '' : abs
        return `${sign}${val}${variable}`
    }

    return `${part(a.value, 'x²', false)}${part(b.value, 'x')}${part(c.value, '', true)} = 0`
})

function saveProgressToLocalStorage() {
    localStorage.setItem('solvedCount', solvedCount.value)
}

function loadProgressFromLocalStorage() {
    const savedCount = localStorage.getItem('solvedCount')
    if (savedCount) {
        solvedCount.value = parseInt(savedCount, 10)
    }
}

function saveEquationToLocalStorage() {
    const equationData = {
        a: a.value,
        b: b.value,
        c: c.value,
        realRoots: realRoots.value,
        isSolved: isSolved.value,
    }
    localStorage.setItem('currentEquation', JSON.stringify(equationData))
}

function loadEquationFromLocalStorage() {
    const savedData = localStorage.getItem('currentEquation')
    if (savedData) {
        const { a: savedA, b: savedB, c: savedC, realRoots: savedRoots, isSolved: savedSolved } = JSON.parse(savedData)
        a.value = savedA
        b.value = savedB
        c.value = savedC
        realRoots.value = savedRoots
        isSolved.value = savedSolved
    } else {
        generateEquation()
    }
}

function generateEquation() {
  function getRandomInt(min, max, excludeZero = false) {
    let x
    do x = Math.floor(Math.random() * (max - min + 1)) + min
    while (excludeZero && x === 0)
    return x
  }

  // Устанавливаем флаги для вероятностей
  const isAEqualToOne = Math.random() < 0.8 // 60% вероятность для a = 1
  const isBZero = Math.random() < 0.1       // 20% вероятность для b = 0
  const isCZero = Math.random() < 0.1       // 20% вероятность для c = 0

  while (true) {
    a.value = isAEqualToOne ? 1 : getRandomInt(-5, 5, true)
    b.value = isBZero ? 0 : getRandomInt(-15, 15)
    c.value = isCZero ? 0 : getRandomInt(-50, 50)

    const D = b.value * b.value - 4 * a.value * c.value
    if (D >= 0 && Math.sqrt(D) % 1 === 0) {
      const x1 = (-b.value + Math.sqrt(D)) / (2 * a.value)
      const x2 = (-b.value - Math.sqrt(D)) / (2 * a.value)
      realRoots.value = [x1, x2].sort()
      break
    }
  }

  // Сброс состояния
  userX1.value = ''
  userX2.value = ''
  resultMessage.value = ''
  isSolved.value = false
  saveEquationToLocalStorage()
}

function parseExpr(expr) {
    try {
        const cleaned = expr.replace(/\s/g, '').replace(/√(\d+)/g, 'Math.sqrt($1)')
        return eval(cleaned)
    } catch {
        return NaN
    }
}

function checkAnswer() {
    const tol = 1e-6
    let r1Text = userX1.value.replace(',', '.')
    let r2Text = userX2.value.replace(',', '.')

    if (r2Text === '') {
        r1Text = r2Text
    }

    const r1 = parseExpr(r1Text)
    const r2 = parseExpr(r2Text)

    if (isNaN(r1) || isNaN(r2)) {
        resultMessage.value = '⚠️ Не удалось распознать корни.'
        return
    }

    const inputSorted = [r1, r2].sort()
    const correct = Math.abs(inputSorted[0] - realRoots.value[0]) < tol &&
        Math.abs(inputSorted[1] - realRoots.value[1]) < tol

    resultMessage.value = correct
        ? '✅ Верно!'
        : `❌ Неверно, попробуй ещё!` // Правильные корни: ${realRoots.value[0]} и ${realRoots.value[1]}`

    if (correct) {
        isSolved.value = true // Устанавливаем состояние "решено"
        solvedCount.value++ // Увеличиваем счётчик
        saveProgressToLocalStorage() // Сохраняем прогресс
        saveEquationToLocalStorage()
    }
}

function handleButtonClick() {
    if (isSolved.value) {
        generateEquation() // Генерация нового уравнения
    } else {
        checkAnswer() // Проверка ответа
    }
}

onMounted(() => {
    loadProgressFromLocalStorage()
    loadEquationFromLocalStorage()
})
</script>

<style>
/* Общий стиль */
:root {
  --primary-color: #007BFF;
  --primary-hover: #0056b3;
  --secondary-color: #6c757d;
  --background-color: #f9f9f9;
  --text-color: #333;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --font-family: 'Arial', sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 600px;
  margin: auto;
  padding: 2em;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
}

h1 {
  font-size: 2em;
  margin-bottom: 1em;
  color: var(--text-color);
}

.progress {
  font-size: 1.2em;
  margin-top: 1.5em; /* Добавлен отступ сверху */
  color: var(--secondary-color);
}

.equation-box {
  background-color: var(--background-color);
  padding: 1.5em;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 1.5em;
}

.equation-box p {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
}

.input-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  display: block;
  font-size: 1em;
  margin-bottom: 0.5em;
  color: var(--text-color);
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  box-sizing: border-box;
  margin-bottom: 1em;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.button-group {
  display: flex;
  justify-content: center;
}

button {
  padding: 12px 20px;
  font-size: 1em;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button.primary {
  background-color: var(--primary-color);
  color: white;
}

button.primary:hover {
  background-color: var(--primary-hover);
  transform: scale(1.05);
}

.result {
  margin-top: 1.5em;
  padding: 1em;
  background: var(--background-color);
  border-radius: var(--border-radius);
  font-size: 1.2em;
  color: var(--text-color);
  box-shadow: var(--box-shadow);
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 480px) {
  .container {
    padding: 1em;
  }

  h1 {
    font-size: 1.5em;
  }

  .equation-box p {
    font-size: 1.2em;
  }

  input {
    font-size: 0.9em;
    padding: 10px;
  }

  button {
    font-size: 0.9em;
    padding: 10px 15px;
  }

  .result {
    font-size: 1em;
  }
}
</style>
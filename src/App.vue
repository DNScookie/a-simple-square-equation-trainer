<template>
  <div class="container">
    <h1>Реши уравнение</h1>
    <p><strong>{{ equationText }}</strong></p>

    <label>Корень x₁:</label>
    <input v-model="userX1" type="text" placeholder="например, -1+√2" />

    <label>Корень x₂:</label>
    <input v-model="userX2" type="text" placeholder="например, 3/2" />

    <button @click="checkAnswer">Проверить</button>
    <button @click="generateEquation">Новое уравнение</button>

    <div class="result">{{ resultMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const a = ref(1)
const b = ref(1)
const c = ref(1)
const userX1 = ref('')
const userX2 = ref('')
const realRoots = ref([0, 0])
const resultMessage = ref('')

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

function generateEquation() {
  function getRandomInt(min, max, excludeZero = false) {
    let x
    do x = Math.floor(Math.random() * (max - min + 1)) + min
    while (excludeZero && x === 0)
    return x
  }

  while (true) {
    a.value = getRandomInt(-5, 5, true)
    b.value = getRandomInt(-10, 10)
    c.value = getRandomInt(-10, 10)
    const D = b.value * b.value - 4 * a.value * c.value
    if (D >= 0 && Math.sqrt(D) % 1 === 0) {
      const x1 = (-b.value + Math.sqrt(D)) / (2 * a.value)
      const x2 = (-b.value - Math.sqrt(D)) / (2 * a.value)
      realRoots.value = [x1, x2].sort()
      break
    }
  }

  userX1.value = ''
  userX2.value = ''
  resultMessage.value = ''
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
  const r1 = parseExpr(userX1.value)
  const r2 = parseExpr(userX2.value)

  if (isNaN(r1) || isNaN(r2)) {
    resultMessage.value = '⚠️ Не удалось распознать корни.'
    return
  }

  const inputSorted = [r1, r2].sort()
  const correct = Math.abs(inputSorted[0] - realRoots.value[0]) < tol &&
                  Math.abs(inputSorted[1] - realRoots.value[1]) < tol

  resultMessage.value = correct
    ? '✅ Верно!'
    : `❌ Неверно. Правильные корни: ${realRoots.value[0]} и ${realRoots.value[1]}`
}

generateEquation()
</script>

<style>
.container {
  max-width: 480px;
  margin: auto;
  padding: 1em;
  font-family: sans-serif;
}
input, button {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
  font-size: 16px;
}
.result {
  margin-top: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>

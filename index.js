function* wordEvery (word, n) {
  while (true) {
    for (let i = 0; i < n - 1; i++) yield ''
    yield word
  }
}

const fizz = () => wordEvery('fizz', 3)
const buzz = () => wordEvery('buzz', 5)

function* zip (...its) {
  while (true) yield its.map(it => it.next().value).join('')
}

function* itnum (it, max) {
  let i = 0
  for (const value of it) {
    if (++i > max) break
    yield value || `${i}`
  }
}

const fizzbuzz = n => itnum(zip(fizz(), buzz()), n)

module.exports = (n = 100) => {
  for (const f of fizzbuzz(n)) console.log(f)
}

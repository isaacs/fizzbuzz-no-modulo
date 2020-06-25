const t = require('tap')
const logs = []
console.log = m => logs.push(m)
t.afterEach(cb => {
  logs.length = 0
  cb()
})

const fizzbuzz = require('../')
const check = (t, n, logs) => {
  t.plan(n)
  logs.forEach((l, i) => {
    i++
    t.equal(l, !(i % 5) && !(i % 3) ? 'fizzbuzz' : !(i % 3) ? 'fizz' : !(i % 5) ? 'buzz' : String(i))
  })
}

t.test('library with arg', t => {
  fizzbuzz(10)
  check(t, 10, logs)
})

t.test('library without arg', t => {
  fizzbuzz()
  check(t, 100, logs)
})

t.test('cli with number arg', t => {
  process.argv[2] = 10
  require('../cli.js')
  check(t, 10, logs)
  delete require.cache[require.resolve('../cli.js')]
})

t.test('cli no number arg', t => {
  process.argv[2] = 'not a number'
  require('../cli.js')
  check(t, 100, logs)
  delete require.cache[require.resolve('../cli.js')]
})

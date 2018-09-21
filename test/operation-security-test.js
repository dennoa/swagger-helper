const test = require('ava')
const { getOperation } = require('..')

test('should include security on authenticated operations', t => {
  const op = getOperation({ reqBody: 'test' })
  t.is(typeof op.security, 'undefined')
})

test('should not include security on unauthenticated operations', t => {
  const op = getOperation({ reqBody: 'test', no401: true })
  t.deepEqual(op.security, [])
})

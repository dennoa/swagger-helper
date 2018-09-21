const test = require('ava')
const { getOperation } = require('..')

test('should allow specification of a single tag', t => {
  const options = { tag: 'test' }
  const op = getOperation(options)
  t.deepEqual(op.tags, [options.tag])
})

test('should allow specification of multiple tags', t => {
  const options = { tag: ['test1', 'test2', 'test3'] }
  const op = getOperation(options)
  t.deepEqual(op.tags, options.tag)
})

test('should default to empty string when no tag has been specified', t => {
  const op = getOperation()
  t.deepEqual(op.tags, [''])
})

const test = require('ava')
const { getOperation } = require('..')

test('should allow specification of a summary', t => {
  const options = { summary: 'test' }
  const op = getOperation(options)
  t.is(op.summary, options.summary)
})

test('should default to empty string when no summary has been specified', t => {
  const op = getOperation()
  t.is(op.summary, '')
})

test('should default the description to the summary', t => {
  const options = { summary: 'test' }
  const op = getOperation(options)
  t.is(op.description, options.summary)
})

test('should allow specification of a description', t => {
  const options = { description: 'test desc' }
  const op = getOperation(options)
  t.is(op.description, options.description)
})

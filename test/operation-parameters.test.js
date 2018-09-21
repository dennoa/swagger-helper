const test = require('ava')
const { getOperation } = require('..')

test('should allow specification of a request body', t => {
  const op = getOperation({ reqBody: 'testBodyDef' })
  t.deepEqual(op.parameters, [{ name: 'request', in: 'body', schema: { $ref: '#/definitions/testBodyDef' } }])
})

test('should allow specification of a request parameter', t => {
  const op = getOperation({ param: 'testParam' })
  t.deepEqual(op.parameters, [{ $ref: '#/parameters/testParam' }])
})

test('should allow specification of multiple request parameters', t => {
  const op = getOperation({ param: ['testParam1', 'testParam2'] })
  t.deepEqual(op.parameters, [{ $ref: '#/parameters/testParam1' }, { $ref: '#/parameters/testParam2' }])
})

test('should allow specification of a request body and other parameters', t => {
  const op = getOperation({ reqBody: 'testBodyDef', param: ['testParam1', 'testParam2'] })
  t.deepEqual(op.parameters, [
    { $ref: '#/parameters/testParam1' },
    { $ref: '#/parameters/testParam2' },
    { name: 'request', in: 'body', schema: { $ref: '#/definitions/testBodyDef' } },
  ])
})

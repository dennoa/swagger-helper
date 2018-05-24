import test from 'ava'
import lib from '../lib'

const { getOperation } = lib

const statusCodes = ['204', '401', '404', '500']
statusCodes.forEach(code => {
  test(`should include a ${code} response by default`, t => {
    const op = getOperation()
    t.truthy(op.responses[code])
  })
})

test('should include a 400 response if there is a request body', t => {
  const op = getOperation({ reqBody: 'test' })
  t.truthy(op.responses['400'])
})

test('should include a 400 response if there is a request param', t => {
  const op = getOperation({ param: 'test' })
  t.truthy(op.responses['400'])
})

test('should allow the 400 response to be omitted', t => {
  const op = getOperation({ param: 'test', no400: true })
  t.is(typeof op.responses['400'], 'undefined')
})

test('should allow the 401 response to be omitted', t => {
  const op = getOperation({ no401: true })
  t.is(typeof op.responses['401'], 'undefined')
})

test('should allow the 404 response to be omitted', t => {
  const op = getOperation({ no404: true })
  t.is(typeof op.responses['404'], 'undefined')
})

test('should allow specification of a response body', t => {
  const op = getOperation({ resBody: 'testBodyDef' })
  t.deepEqual(op.responses['200'], { description: 'Success', schema: { $ref: '#/definitions/testBodyDef' } })
  t.is(typeof op.responses['204'], 'undefined')
})

const test = require('ava')
const swaggerHelper = require('..')

const { swagger } = swaggerHelper.getBase()

test('should support swagger 2.0', t => {
  t.is(swagger, '2.0')
})

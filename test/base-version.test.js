import test from 'ava'
import swaggerHelper from '..'

const { swagger } = swaggerHelper.getBase()

test('should support swagger 2.0', t => {
  t.is(swagger, '2.0')
})

import test from 'ava'
import lib from '../lib'

const { swagger } = lib.getBase()

test('should support swagger 2.0', t => {
  t.is(swagger, '2.0')
})

import test from 'ava'
import swaggerHelper from '..'

test('should allow title to be specified', t => {
  const title = 'Test API'
  const { info } = swaggerHelper.getBase({ title })
  t.is(info.title, title)
})

test('should allow description to be specified', t => {
  const description = 'My API'
  const { info } = swaggerHelper.getBase({ description })
  t.is(info.description, description)
})

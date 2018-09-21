const test = require('ava')
const swaggerHelper = require('..')

const { parameters } = swaggerHelper.getBase()

test('should provide a mongo _id path parameter', t => {
  t.is(parameters._id.in, 'path')
})

test('should provide the regex pattern for a valid mongo _id (24 hex chars)', t => {
  const regex = new RegExp(parameters._id.pattern)
  t.truthy(regex.test('0123456789abcdefABCDEF01'))
})
;['0123456789abcdefABCDEF0', '0123456789abcdefABCDEF012', '0123456789abcdefABCDEFG1'].forEach(invalid => {
  test(`should fail mongo _id validation for ${invalid}`, t => {
    const regex = new RegExp(parameters._id.pattern)
    t.falsy(regex.test(invalid))
  })
})
;['skip', 'limit'].forEach(param => {
  test(`should provide a ${param} query parameter`, t => {
    t.is(parameters[param].in, 'query')
  })

  test(`should specify int32 format for the ${param} parameter`, t => {
    t.is(parameters[param].format, 'int32')
  })
})

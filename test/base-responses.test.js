import test from 'ava'
import lib from '../lib'

const { responses } = lib.getBase()

const statusCodes = ['204', '400', '401', '404', '500']
statusCodes.forEach(code => {
  test(`should include a response for ${code}`, t => {
    t.truthy(responses[code])
  })
})

const test = require('ava')
const swaggerParser = require('swagger-parser')
const swaggerHelper = require('..')

test('should support adding custom operations to the swagger document', async t => {
  const swagger = swaggerHelper.getBase({
    title: 'Some title',
    description: 'Some description',
  })

  // Add user operations
  swagger.tags.push({ name: 'user', description: 'user stuff' })
  swagger.paths['/user'] = {
    post: swaggerHelper.getOperation({
      tag: 'user',
      summary: 'Create a user',
      reqBody: 'userModel',
      resBody: 'userModel',
      no404: true,
    }),
  }
  swagger.paths['/user/{username}'] = {
    get: swaggerHelper.getOperation({
      tag: 'user',
      summary: 'Get a user by username',
      param: 'username',
      resBody: 'userModel',
    }),
  }
  swagger.definitions.userModel = {
    type: 'object',
    properties: {
      _id: { type: 'string', description: 'Uniquely identifies the user', pattern: swagger.parameters._id.pattern },
      username: { type: 'string', description: 'Username for authentication' },
    },
  }
  swagger.parameters.username = {
    name: 'username',
    in: 'path',
    description: 'Identifies the user by their username',
    type: 'string',
    required: true,
  }

  const result = swaggerParser.validate(swagger)
  t.truthy(await result)
})

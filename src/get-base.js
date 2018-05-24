/* This is a base swagger 2.0 document.
 * Swagger snippets from other modules can be merged with this to form the complete definition associated with an api module.
 * See the spec here: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md
 */

/**
 * @param options
 * - title
 * - description
 */
const getBase = options => ({
  swagger: '2.0',
  info: {
    title: options.title || '',
    description: options.description || '',
    version: '1.0',
  },
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {},
  definitions: {},
  parameters: {
    _id: {
      name: '_id',
      in: 'path',
      description: 'Identifier',
      type: 'string',
      required: true,
      pattern: '^[0-9A-Fa-f]{24}$',
    },
    skip: {
      name: 'skip',
      in: 'query',
      description: 'Number of items to skip',
      type: 'integer',
      format: 'int32',
    },
    limit: {
      name: 'limit',
      in: 'query',
      description: 'Max number of items to return',
      type: 'integer',
      format: 'int32',
    },
  },
  responses: {
    204: { description: 'Success' },
    400: {
      description: 'Validation failure',
      schema: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'Identifies the failing validation mechanism',
                },
                dataPath: {
                  type: 'string',
                  description: 'The path to the invalid data',
                },
              },
            },
          },
        },
      },
    },
    401: { description: 'Unauthorised' },
    404: { description: 'Not found' },
    500: { description: 'Unexpected error' },
  },
  securityDefinitions: options.securityDefinitions || {
    Authorization: {
      type: 'apiKey',
      description: 'For authenticated requests, the Authorization Header contains: Bearer {{JWT}}',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [
    {
      Authorization: [],
    },
  ],
  tags: [],
})

export default function get(options) {
  return getBase(options || {})
}

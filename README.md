# swagger-helper

Help to create consistent swagger v2.0 documentation for an api. It makes a lot of assumptions in an attempt to be less verbose most of the time. Where it doesn't provide the flexibility required, just merge swagger fragments as you might otherwise do.

Refer to <https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md> for details of the specification.

It provides a method to get the base documentation containing the structural pieces and some common items. It also provides a method to get the documentation fragment for a specific operation - i.e. something like GET /user

See test/index.js for a contrived usage example.

## Example usage

1.  Get the base documentation. This returns a Javascript Object with the required swagger doc structure and some common bits such as security and standard responses. The intent is that swagger paths, definitions, etc. specific to each operation are added to this.

        import swaggerHelper from 'swagger-helper'

        // Get the base JSON with the swagger doc structure and some common bits.
        // This gives valid swagger documentation, just with no paths as yet

        const baseDoc = swaggerHelper.getBase({
          title: 'My api',
          description: 'I like my api',
        })

2. Get the documentation for an operation. This example shows how you might structure the document fragments for a specific entity (e.g. user). The resulting Javascript Object can be deep-merged into the base. The swagger operation spec is here: <https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject>. This helper supports the features most commonly used. There is reducing benefit in supporting more features as it starts to become as complex as just following the specification directly.

        const tag = 'user';

        const userDoc = {
          tags: [{ name: tag, description: tag }],
          paths: {
            '/user/{username}': {
              get: swaggerHelper.getOperation({
                tag,
                summary: 'Get a user by username',
                param: 'username',
                resBody: 'userModel',
              }),
            },
          },
          definitions: {
            userModel: {
              type: 'object',
              properties: {
                username: { type: 'string', description: 'The username' },
                firstName: { type: 'string', description: 'The user first name' },
                lastName: { type: 'string', description: 'The user last name' },
              },
            },
          },
          parameters: {
            username: {
              name: 'username',
              in: 'path',
              description: 'Identifies the user by username',
              type: 'string',
              required: true,
            },
          },
        }

3. Because each entity requires entries in multiple swagger doc locations (paths, defintiions, etc.), these need to be deep-merged with other entities into the base doc.

        import merge from 'deepmerge'

        const finalDoc = merge(baseDoc, userDoc)

## getBase(options)

1. title: A title for your api
2. description: A description for your api

## getOperation(options)

1. tag: The tag name(s). String or array.
1. summary: Short summary of the operation.
1. description: Longer description (defaults to summary if not specified).
1. reqBody: The name of the swagger definitions item holding the request body definition.
1. resBody: The name of the swagger definitions item holding the response body definition. If specified, this will be the 200 response. If not specified, 204 is the success response.
1. param: The name(s) of the request parameter swagger definition(s). String or array.
1. n0400: A 400 (validation error) response will be included unless this is set to true.
1. n0401: A 401 (auth failure) response will be included unless this is set to true.
1. n0404: A 404 (not found) response will be included unless this is set to true.

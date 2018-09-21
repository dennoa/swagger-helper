function toArray(thing) {
  return Array.isArray(thing) ? thing : [thing]
}

// NB: path and query parameters are ok but swagger ui does not like body parameters, need to use definitions for these
function getParameters(options) {
  const paramNames = options.param ? toArray(options.param) : []
  const params = paramNames.map(name => ({ $ref: `#/parameters/${name}` }))
  if (options.reqBody) {
    params.push({ name: 'request', in: 'body', schema: { $ref: `#/definitions/${options.reqBody}` } })
  }
  return params
}

const responseTemplate = {
  204: { $ref: '#/responses/204' },
  400: { $ref: '#/responses/400' },
  401: { $ref: '#/responses/401' },
  404: { $ref: '#/responses/404' },
  500: { $ref: '#/responses/500' },
}

function getResponses(options) {
  const responses = Object.assign({}, responseTemplate)
  if (options.resBody) {
    responses['200'] = { description: 'Success', schema: { $ref: `#/definitions/${options.resBody}` } }
    delete responses['204']
  }
  if (options.no400 || (!options.reqBody && !options.param)) {
    delete responses['400']
  }
  if (options.no401) {
    delete responses['401']
  }
  if (options.no404) {
    delete responses['404']
  }
  return responses
}

/**
 * @param options:
 * - tag: The tag name(s). String or array
 * - summary: Short summary
 * - description: Longer description (defaults to summary)
 * - reqBody: The name of the swagger definitions item holding the request body definition.
 * - resBody: The name of the swagger definitions item holding the response body definition. If not specified, 204 is the success response
 * - param: The name(s) of the request parameter swagger definition(s). String or array
 * - n0400: If truthy, no 400 response is included
 * - n0401: If truthy, no 401 response is included
 * - n0404: If truthy, no 404 response is included
 * @returns the operation definition
 */
const getOperation = options => ({
  tags: toArray(options.tag || ''),
  summary: options.summary || '',
  description: options.description || options.summary || '',
  parameters: getParameters(options),
  responses: getResponses(options),
})

const getUnauthenticatedOperation = options => Object.assign(getOperation(options), { security: [] })

module.exports = options => {
  const opts = options || {}
  return opts.no401 ? getUnauthenticatedOperation(opts) : getOperation(opts)
}

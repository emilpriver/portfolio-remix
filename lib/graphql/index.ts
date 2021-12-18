declare const GRAPHCMS_URL: string

export const client = (query: any, variables = {}) => fetch(GRAPHCMS_URL ?? process.env.GRAPHCMS_URL ?? '', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then((r) => r.json())
.then((r) => r.data)

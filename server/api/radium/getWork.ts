export default defineEventHandler(async (event) => {
  const params = getQuery(event)

  return 'foo'
})

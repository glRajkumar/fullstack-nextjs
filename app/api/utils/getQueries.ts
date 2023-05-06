
type queries = string | string[]

function getQueries(req: Request, queries: queries) {
  const { searchParams } = new URL(req.url)

  if (typeof queries === "string") {
    const value = searchParams.get(queries)
    return {
      [queries]: value || undefined
    }
  }

  const final: Record<string, string | undefined> = {}
  queries.forEach(query => {
    const value = searchParams.get(query)
    final[query] = value || undefined
  })

  return final
}

export default getQueries
import { useEffect, useState } from 'react'

const PAGE_SIZE = 4

// Fetches popular DEV.to articles for one tag, one page at a time.
// Returns the articles plus loading and error states, retry() and loadMore().
export function useArticles(tag) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [attempt, setAttempt] = useState(0) // changing it re-runs the effect, which is how retry works

  useEffect(() => {
    // AbortController cancels the request if the panel closes before the answer arrives.
    const controller = new AbortController()

    async function loadArticles() {
      setLoading(true)
      setError('')
      try {
        const url = `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&top=365&per_page=${PAGE_SIZE}&page=${page}`
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`the server answered ${response.status}`)
        const data = await response.json()

        setArticles(prev => {
          if (page === 1) return data
          const seen = new Set(prev.map(article => article.id))
          return [...prev, ...data.filter(article => !seen.has(article.id))]
        })
        setHasMore(data.length === PAGE_SIZE)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadArticles()
    return () => controller.abort()
  }, [tag, page, attempt])

  const retry = () => setAttempt(count => count + 1)
  const loadMore = () => setPage(current => current + 1)

  return { articles, loading, error, hasMore, retry, loadMore }
}

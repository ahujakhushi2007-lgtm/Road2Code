import { Heart, RotateCcw } from 'lucide-react'
import { useArticles } from '../hooks/useArticles'

// Live articles from the DEV.to API for one step's tag.
// Shows every state a network request can be in: loading, error, empty and loaded.
function StepArticles({ tag }) {
  const { articles, loading, error, hasMore, retry, loadMore } = useArticles(tag)

  return (
    <div className="articles">
      <p className="articles__source">
        Popular posts from the last year tagged{' '}
        <a href={`https://dev.to/t/${tag}`} target="_blank" rel="noopener noreferrer">#{tag}</a> on DEV.
      </p>

      {articles.length > 0 && (
        <ul className="articles__list">
          {articles.map(article => (
            <li key={article.id}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="article">
                <span className="article__title">{article.title}</span>
                <span className="article__meta">
                  <span>{article.user.name}</span>
                  <span>{article.reading_time_minutes} min read</span>
                  <span className="article__likes">
                    <Heart size={12} aria-hidden="true" /> {article.public_reactions_count}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <div className="articles__loading" aria-label="Loading articles">
          <span /><span /><span />
        </div>
      )}

      {error && (
        <div className="articles__error" role="alert">
          <p>Couldn't load articles ({error}). Check your internet connection, then try again.</p>
          <button className="btn btn--sm" onClick={retry}>
            <RotateCcw size={14} aria-hidden="true" /> Try again
          </button>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="panel-empty">No posts with this tag yet. Open the tag on DEV to browse older posts.</p>
      )}

      {!loading && !error && hasMore && articles.length > 0 && (
        <button className="btn btn--sm" onClick={loadMore}>Load more articles</button>
      )}
    </div>
  )
}

export default StepArticles

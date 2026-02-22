import { useNavigate, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function ArticleCard({ article }) {
  const { saveArticle, removeArticle, isArticleSaved } = useArticles();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const saved = isArticleSaved(article.url);

  const handleBookmarkClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (saved) {
      removeArticle(article.url);
    } else {
      saveArticle(article);
    }
  };

  return (
    <div className="article-card">
      <div className="article-header">
        <h3 className="article-title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        <button
          className={`bookmark-btn ${saved ? 'saved' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={saved ? 'Remove from saved' : 'Save article'}
          title={!isAuthenticated ? 'Login to save articles' : (saved ? 'Unsave' : 'Save')}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      {article.abstract && <p className="article-abstract">{article.abstract}</p>}

      <div className="article-meta">
        <span className="article-section">{article.section}</span>
        <span className="article-date">
          {article.published_date ? new Date(article.published_date).toLocaleDateString() : ''}
        </span>
      </div>
    </div>
  );
}

export default ArticleCard;

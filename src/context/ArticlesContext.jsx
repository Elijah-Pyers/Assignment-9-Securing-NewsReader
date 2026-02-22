import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user } = useAuth();

  // { username: [article, article...] }
  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
    return JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
  });

  useEffect(() => {
    localStorage.setItem('savedArticlesByUser', JSON.stringify(savedArticlesByUser));
  }, [savedArticlesByUser]);

  const username = user?.username;

  const getUserSavedArticles = () => {
    if (!username) return [];
    return savedArticlesByUser[username] || [];
  };

  const saveArticle = (article) => {
    if (!username) return;

    setSavedArticlesByUser((prev) => {
      const existing = prev[username] || [];
      if (existing.find((a) => a.url === article.url)) return prev;

      return {
        ...prev,
        [username]: [...existing, article],
      };
    });
  };

  const removeArticle = (url) => {
    if (!username) return;

    setSavedArticlesByUser((prev) => {
      const existing = prev[username] || [];
      return {
        ...prev,
        [username]: existing.filter((a) => a.url !== url),
      };
    });
  };

  const isArticleSaved = (url) => {
    if (!username) return false;
    const existing = savedArticlesByUser[username] || [];
    return existing.some((a) => a.url === url);
  };

  // Step 7 helper (admin)
  const getAllUserArticles = () => savedArticlesByUser;

  const value = useMemo(
    () => ({
      savedArticlesByUser,
      getUserSavedArticles,
      getAllUserArticles,
      saveArticle,
      removeArticle,
      isArticleSaved,
    }),
    [savedArticlesByUser, username]
  );

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>;
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) throw new Error('useArticles must be used within ArticlesProvider');
  return context;
};

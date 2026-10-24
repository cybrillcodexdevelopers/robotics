"use client";

import { useEffect, useState } from "react";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EcosystemShowcase() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/news?pageSize=3", { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load ecosystem updates.");
        }
        setArticles(data.articles.slice(0, 3));
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load ecosystem updates.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="ecosystem-showcase">
      <div className="ecosystem-showcase-inner">
        <div className="ecosystem-content">
          <span className="ecosystem-stars-extra" aria-hidden="true"></span>
          <p className="ecosystem-kicker">Ecosystem</p>
          <h2 className="ecosystem-heading">
            A Unified Ecosystem
            <br />
            Built For Every
            <br />
            Participant.
          </h2>
          <p className="ecosystem-description">
            Robert Network Research brings WLT research,
            <br />
            ecosystem tools, and project updates together
            <br />
            in one connected place.
          </p>
        </div>
        <div className="ecosystem-visual">
          <div className="ecosystem-news-list" aria-label="Latest ecosystem news">
            {loading ? <p className="ecosystem-news-message">Loading updates...</p> : null}
            {error ? <p className="ecosystem-news-message">{error}</p> : null}
            {!loading && !error && articles.map((article) => {
              const isExternal = !article.url.startsWith("/");
              return (
                <a
                  className="ecosystem-news-card"
                  href={article.url}
                  key={article.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span
                    className="ecosystem-news-image"
                    aria-hidden="true"
                    style={article.image ? { backgroundImage: `url("${article.image}")` } : undefined}
                  />
                  <span className="ecosystem-news-copy">
                    <span className="ecosystem-news-meta">
                      <span>{article.source}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </span>
                    <span className="ecosystem-news-title">{article.title}</span>
                    <span className="ecosystem-news-description">{article.description}</span>
                  </span>
                  <span className="ecosystem-news-arrow" aria-hidden="true">&#8599;</span>
                </a>
              );
            })}
            {!loading && !error && articles.length === 0 ? (
              <p className="ecosystem-news-message">No ecosystem updates are available right now.</p>
            ) : null}
            <a className="ecosystem-news-more" href="/news">
              View all news <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

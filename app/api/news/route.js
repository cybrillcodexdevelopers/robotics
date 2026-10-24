import { NextResponse } from "next/server";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const DEFAULT_QUERY = "cryptocurrency OR blockchain OR bitcoin OR web3";
const FALLBACK_ARTICLES = [
  {
    title: "World Liberty Token expands ecosystem updates for members and builders",
    description:
      "WLT is broadening its ecosystem with new product communications, community updates, and utility-focused milestones for the upcoming roadmap.",
    url: "/news",
    image: "/images/partnership.png",
    source: "WLT",
    publishedAt: "2025-01-15T12:00:00.000Z",
  },
  {
    title: "Tokenomics and ecosystem design continue to shape the next phase of WLT",
    description:
      "The project remains focused on transparent token distribution, utility planning, and community-first growth across mining, presale, and access features.",
    url: "/tokenomics",
    image: "/images/robert-network-research-coin.png",
    source: "WLT",
    publishedAt: "2025-01-10T12:00:00.000Z",
  },
  {
    title: "Community engagement and referral programs remain central to the roadmap",
    description:
      "Ongoing product updates emphasize user access, onboarding, and the next generation of ecosystem participation for supporters and contributors.",
    url: "/faq",
    image: "/images/robert-network-research-growth.png",
    source: "WLT",
    publishedAt: "2025-01-06T12:00:00.000Z",
  },
  {
    title: "WLT infrastructure continues to support secure access, rewards, and utility",
    description:
      "From wallet flows to staking and mining activity, the platform is designed to help users move through the ecosystem with clarity and confidence.",
    url: "/dashboard",
    image: "/images/robert-network-research-robot.png",
    source: "WLT",
    publishedAt: "2024-12-31T12:00:00.000Z",
  },
];

// NewsAPI results are cached briefly to stay within free-tier rate limits.
export const revalidate = 300;

function buildFallbackArticles(limit) {
  return FALLBACK_ARTICLES.slice(0, Math.max(1, Math.min(Number(limit) || 12, FALLBACK_ARTICLES.length)));
}

export async function GET(request) {
  const apiKey = process.env.NEWS_API_KEY;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || DEFAULT_QUERY;
  const pageSize = Math.min(Number(searchParams.get("pageSize")) || 12, 50);
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);

  if (!apiKey) {
    return NextResponse.json({
      success: true,
      totalResults: FALLBACK_ARTICLES.length,
      articles: buildFallbackArticles(pageSize),
      source: "fallback",
    });
  }

  const url = new URL(NEWS_API_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", String(pageSize));
  url.searchParams.set("page", String(page));

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": apiKey },
      next: { revalidate },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        totalResults: FALLBACK_ARTICLES.length,
        articles: buildFallbackArticles(pageSize),
        source: "fallback",
      });
    }

    const articles = (data.articles || [])
      .filter((article) => article.title && article.title !== "[Removed]")
      .map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        source: article.source?.name || "Unknown",
        publishedAt: article.publishedAt,
      }));

    return NextResponse.json({
      success: true,
      totalResults: data.totalResults || articles.length,
      articles,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      totalResults: FALLBACK_ARTICLES.length,
      articles: buildFallbackArticles(pageSize),
      source: "fallback",
    });
  }
}

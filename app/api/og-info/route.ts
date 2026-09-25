function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMeta(html: string, key: string, attr: "property" | "name") {
  const patterns = [
    new RegExp(
      `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["'][^>]*>`,
      "i",
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtmlEntities(match[1]);
  }
  return null;
}

function extractTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : null;
}

function resolveUrl(value: string | null, base: URL) {
  if (!value) return null;
  try {
    return new URL(value, base).toString();
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return Response.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return Response.json(
      { error: "유효한 URL이 아닙니다." },
      { status: 400 },
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return Response.json(
      { error: "http 또는 https 주소만 지원합니다." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnobiteLinkBot/1.0)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return Response.json(
        { error: "링크를 불러오지 못했습니다." },
        { status: 502 },
      );
    }

    const html = await response.text();

    const title =
      extractMeta(html, "og:title", "property") ??
      extractTitleTag(html) ??
      parsedUrl.hostname;
    const description =
      extractMeta(html, "og:description", "property") ??
      extractMeta(html, "description", "name");
    const thumbnailUrl = resolveUrl(
      extractMeta(html, "og:image", "property"),
      parsedUrl,
    );

    return Response.json({
      url: parsedUrl.toString(),
      title,
      description,
      thumbnailUrl,
    });
  } catch {
    return Response.json(
      { error: "링크 정보를 가져오지 못했습니다." },
      { status: 502 },
    );
  }
}

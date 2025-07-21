export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Augment Code - AI Coding Assistant News</title>
    <description>Latest updates from the world's #1 AI coding assistant platform</description>
    <link>https://augmentcode.in</link>
    <atom:link href="https://augmentcode.in/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>team@augmentcode.in (Augment Code Team)</managingEditor>
    <webMaster>webmaster@augmentcode.in (Augment Code Webmaster)</webMaster>
    <category>Technology</category>
    <category>Programming</category>
    <category>AI</category>
    <category>Developer Tools</category>
    
    <item>
      <title>Augment Code Community Platform Launching Soon</title>
      <description>The ultimate AI coding assistant platform is coming. Join thousands of developers using the world's most advanced AI programming tools.</description>
      <link>https://augmentcode.in</link>
      <guid>https://augmentcode.in/news/platform-launching-soon</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>AI Coding Assistant</category>
      <category>Programming Tools</category>
    </item>
    
    <item>
      <title>Best GitHub Copilot Alternative - Augment Code</title>
      <description>Discover why Augment Code is the superior alternative to GitHub Copilot with better AI assistance and completely free access.</description>
      <link>https://augmentcode.in/github-copilot-alternative</link>
      <guid>https://augmentcode.in/github-copilot-alternative</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>GitHub Copilot Alternative</category>
      <category>AI Programming Assistant</category>
    </item>
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

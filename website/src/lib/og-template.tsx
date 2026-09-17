export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

interface OgImageParams {
  title: string
  description?: string
  category?: string
  author?: string
  authorLogin?: string
}

export const ogImageUrl = ({ title, description, category, author, authorLogin }: OgImageParams) => {
  const params = new URLSearchParams({ title })
  if (description) params.set('description', description)
  if (category) params.set('category', category)
  if (author) params.set('author', author)
  if (authorLogin) params.set('authorLogin', authorLogin)
  return `/api/og?${params.toString()}`
}

interface OgTemplateProps {
  title: string
  description?: string
  category?: string
  author?: string
  authorImage?: string
}

export const OgTemplate = ({ title, description, category, author, authorImage }: OgTemplateProps) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#111110',
      backgroundImage: 'radial-gradient(1000px circle at 100% 0%, rgba(235,94,65,0.18), transparent 55%)',
      padding: '80px',
      color: '#ffffff',
      fontFamily: 'sans-serif',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', fontSize: 44, fontWeight: 800, color: '#EB5E41', letterSpacing: '-0.02em' }}>
        ARK
      </div>
      {category ? (
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 600,
            color: '#EB5E41',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {category}
        </div>
      ) : null}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
        }}
      >
        {title}
      </div>
      {description ? (
        <div
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            fontSize: 34,
            color: '#b5b3ad',
            lineHeight: 1.35,
            maxWidth: 960,
          }}
        >
          {description}
        </div>
      ) : null}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {author ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {authorImage ? (
            <img
              src={authorImage}
              alt={author}
              width={48}
              height={48}
              style={{ borderRadius: 999, border: '2px solid rgba(255,255,255,0.15)' }}
            />
          ) : null}
          <div style={{ display: 'flex', fontSize: 30, color: '#eeeeec', fontWeight: 600 }}>{author}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', fontSize: 28, color: '#8d8d86' }}>ark-ui.com</div>
      )}
      <div style={{ display: 'flex', fontSize: 28, color: '#8d8d86' }}>
        {author ? 'ark-ui.com' : 'Headless UI for React, Solid, Vue & Svelte'}
      </div>
    </div>
  </div>
)

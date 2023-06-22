import { generateHydrationScript, renderToString } from 'solid-js/web'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'

export function render(pageContext: any): unknown {
  const renderedPage = renderToString(() => <pageContext.Page></pageContext.Page>)
  return escapeInject`<!DOCTYPE html>
    <html lang="en">
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(renderedPage)}</div>
      </body>
    </html>`
}

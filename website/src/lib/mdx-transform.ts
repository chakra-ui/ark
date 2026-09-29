import { type ApiDocKey, getApiDoc } from '@zag-js/docs'

export function replaceContextType(text: string): string {
  const matches = text.matchAll(/<ContextType\s+id="([^"]+)"\s*\/>/g)

  if (!matches) return text

  for (const match of matches) {
    const id = match[1]

    try {
      const apiDoc = getApiDoc(id as ApiDocKey)

      // Generate API table only
      if (apiDoc.api && Object.keys(apiDoc.api).length > 0) {
        let apiTable = '**API:**\n\n'
        apiTable += '| Property | Type | Description |\n'
        apiTable += '|----------|------|-------------|\n'

        for (const [propName, propData] of Object.entries(apiDoc.api)) {
          const description = propData.description || ''
          apiTable += `| \`${propName}\` | \`${propData.type}\` | ${description} |\n`
        }

        text = text.replace(match[0], apiTable)
      }
    } catch {
      // components without a zag machine (Swap, Segment Group) have no context API.
      // The ContextType component renders nothing for these, so drop the tag.
      text = text.replace(match[0], '')
    }
  }

  return text
}

export const voidSVGTags = ['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline']
export const isVoidSVGTag = (tag: unknown) => typeof tag === 'string' && voidSVGTags.includes(tag)

export const voidHTMLTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link']
export const isVoidHTMLTag = (tag: unknown) => typeof tag === 'string' && voidHTMLTags.includes(tag)

export const isVoidTag = (tag: unknown) => isVoidSVGTag(tag) || isVoidHTMLTag(tag)

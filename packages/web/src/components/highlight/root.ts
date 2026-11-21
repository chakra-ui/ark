import { highlightWord, type HighlightChunk, type HighlightWordProps } from '@zag-js/highlight-word'

type Query = HighlightWordProps['query']

function chunkNode({ text, match }: HighlightChunk): Node {
  if (!match) return document.createTextNode(text)

  const mark = document.createElement('mark')
  mark.setAttribute('data-highlight-mark', '')
  mark.textContent = text

  return mark
}

export class HighlightElement extends HTMLElement {
  static observedAttributes = ['query', 'text', 'ignore-case', 'match-all', 'exact-match']

  #query: Query = ''
  #text: string | null = null

  get query(): Query {
    return this.#query
  }

  set query(value: Query) {
    this.#query = value ?? ''
    this.#render()
  }

  get text(): string {
    return this.#text ?? ''
  }

  set text(value: string) {
    this.#text = value
    this.#render()
  }

  get chunks(): HighlightChunk[] {
    return highlightWord({
      text: this.text,
      query: this.#query,
      ignoreCase: this.hasAttribute('ignore-case'),
      matchAll: this.hasAttribute('match-all') || undefined,
      exactMatch: this.hasAttribute('exact-match'),
    })
  }

  connectedCallback() {
    this.#text ??= this.getAttribute('text') ?? this.textContent ?? ''
    this.#render()
  }

  attributeChangedCallback(name: string, _previous: string | null, value: string | null) {
    if (name === 'query') this.#query = value ?? ''
    if (name === 'text') this.#text = value ?? ''

    this.#render()
  }

  #render() {
    if (!this.isConnected || this.#text == null) return

    this.replaceChildren(...this.chunks.map(chunkNode))
  }
}

if (!customElements.get('ark-highlight')) customElements.define('ark-highlight', HighlightElement)

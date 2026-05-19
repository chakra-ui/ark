import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { HighlightBasicExample } from './examples/basic'
import { HighlightDynamicQueryExample } from './examples/dynamic-query'
import { HighlightExactMatchExample } from './examples/exact-match'
import { HighlightIgnoreCaseExample } from './examples/ignore-case'
import { HighlightMatchAllExample } from './examples/match-all'
import { HighlightMultipleExample } from './examples/multiple'
import { HighlightRepeatingTextExample } from './examples/repeating-text'
import { ArkHighlightComponent, highlightWord } from './highlight'

@Component({
  standalone: true,
  imports: [ArkHighlightComponent],
  template: `
    <p>
      <ark-highlight [query]="query()" [text]="text" markClass="highlighted" />
    </p>
  `,
})
class DynamicQueryHostComponent {
  readonly query = signal('component')
  readonly text = 'Each component is accessible. Each primitive is composable.'
}

@Component({
  standalone: true,
  imports: [ArkHighlightComponent],
  template: `
    <p>
      <ark-highlight
        query="@ark-ui.com"
        text="Contact us at support@ark-ui.com or sales@ark-ui.com for assistance."
        matchAll
      />
    </p>
  `,
})
class RepeatingTextHostComponent {}

@Component({
  standalone: true,
  imports: [ArkHighlightComponent],
  template: `
    <ark-highlight query="value" [text]="text()" />
  `,
})
class InvalidTextHostComponent {
  readonly text = signal<unknown>(42)
}

describe('highlightWord', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('returns chunked output for a basic string query', () => {
    const chunks = highlightWord({
      query: 'component',
      text: 'Ark UI is a headless component library for building accessible web applications.',
    })

    expect(chunks).toEqual([
      { text: 'Ark UI is a headless ', match: false },
      { text: 'component', match: true },
      { text: ' library for building accessible web applications.', match: false },
    ])
  })

  it('returns chunked output for multiple queries', () => {
    const chunks = highlightWord({
      query: ['React', 'Vue'],
      text: 'Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable.',
    })

    expect(chunks).toEqual([
      { text: 'Ark UI provides ', match: false },
      { text: 'React', match: true },
      { text: ', Solid, ', match: false },
      { text: 'Vue', match: true },
      { text: ', and Svelte components that are accessible and customizable.', match: false },
    ])
  })

  it('returns partial chunks unless exactMatch is true', () => {
    const text = 'The checkbox component renders a box element. Use combobox for autocomplete.'

    expect(highlightWord({ text, query: 'box', matchAll: true })).toEqual([
      { text: 'The check', match: false },
      { text: 'box', match: true },
      { text: ' component renders a ', match: false },
      { text: 'box', match: true },
      { text: ' element. Use combo', match: false },
      { text: 'box', match: true },
      { text: ' for autocomplete.', match: false },
    ])
    expect(highlightWord({ text, query: 'box', exactMatch: true, matchAll: true })).toEqual([
      { text: 'The checkbox component renders a ', match: false },
      { text: 'box', match: true },
      { text: ' element. Use combobox for autocomplete.', match: false },
    ])
  })

  it('returns case-insensitive chunks when ignoreCase is true', () => {
    const chunks = highlightWord({
      text: 'TypeScript provides static type checking. Using typescript helps catch errors early in development.',
      query: 'typescript',
      ignoreCase: true,
    })

    expect(chunks).toEqual([
      { text: 'TypeScript', match: true },
      {
        text: ' provides static type checking. Using typescript helps catch errors early in development.',
        match: false,
      },
    ])
  })

  it('does not match case differences without ignoreCase', () => {
    const chunks = highlightWord({ text: 'Hello World', query: 'hello' })
    expect(chunks).toEqual([{ text: 'Hello World', match: false }])
  })

  it('returns all repeated chunks when matchAll is true', () => {
    const chunks = highlightWord({
      text: 'Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.',
      query: 'component',
      matchAll: true,
    })

    expect(chunks).toEqual([
      { text: 'Each ', match: false },
      { text: 'component', match: true },
      { text: ' follows WAI-ARIA guidelines. Every ', match: false },
      { text: 'component', match: true },
      { text: ' is rigorously tested to ensure accessibility.', match: false },
    ])
  })

  it('returns only the first repeated chunk when matchAll is false', () => {
    const chunks = highlightWord({
      text: 'Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.',
      query: 'component',
      matchAll: false,
    })

    expect(chunks).toEqual([
      { text: 'Each ', match: false },
      { text: 'component', match: true },
      {
        text: ' follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.',
        match: false,
      },
    ])
  })

  it('returns chunked output for repeating text', () => {
    const chunks = highlightWord({
      query: '@ark-ui.com',
      text: 'Contact us at support@ark-ui.com or sales@ark-ui.com for assistance.',
      matchAll: true,
    })

    expect(chunks).toEqual([
      { text: 'Contact us at support', match: false },
      { text: '@ark-ui.com', match: true },
      { text: ' or sales', match: false },
      { text: '@ark-ui.com', match: true },
      { text: ' for assistance.', match: false },
    ])
  })

  it('updates rendered chunks when the query changes', () => {
    TestBed.configureTestingModule({ imports: [DynamicQueryHostComponent] })
    const fixture = TestBed.createComponent(DynamicQueryHostComponent)
    fixture.detectChanges()

    expect(markTexts(fixture.nativeElement)).toEqual(['component'])
    expect(fixture.nativeElement.querySelector('mark')?.className).toContain('highlighted')
    expect(fixture.nativeElement.textContent.trim()).toBe('Each component is accessible. Each primitive is composable.')

    fixture.componentInstance.query.set('primitive')
    fixture.detectChanges()

    expect(markTexts(fixture.nativeElement)).toEqual(['primitive'])
    expect(fixture.nativeElement.textContent.trim()).toBe('Each component is accessible. Each primitive is composable.')

    fixture.destroy()
  })

  it('renders repeating text chunks with one mark per match', () => {
    TestBed.configureTestingModule({ imports: [RepeatingTextHostComponent] })
    const fixture = TestBed.createComponent(RepeatingTextHostComponent)
    fixture.detectChanges()

    expect(fixture.nativeElement.textContent.trim()).toBe(
      'Contact us at support@ark-ui.com or sales@ark-ui.com for assistance.',
    )
    expect(markTexts(fixture.nativeElement)).toEqual(['@ark-ui.com', '@ark-ui.com'])

    fixture.destroy()
  })

  it('throws when the component text input is not a string', () => {
    TestBed.configureTestingModule({ imports: [InvalidTextHostComponent] })

    expect(() => {
      const fixture = TestBed.createComponent(InvalidTextHostComponent)
      fixture.detectChanges()
    }).toThrow('[ark-ui/highlight] text must be a string')
  })

  it('returns a single non-match chunk when there is no match', () => {
    const chunks = highlightWord({ text: 'Hello', query: 'World' })
    expect(chunks).toEqual([{ text: 'Hello', match: false }])
  })

  it.each([
    ['Basic', HighlightBasicExample],
    ['DynamicQuery', HighlightDynamicQueryExample],
    ['ExactMatch', HighlightExactMatchExample],
    ['IgnoreCase', HighlightIgnoreCaseExample],
    ['MatchAll', HighlightMatchAllExample],
    ['Multiple', HighlightMultipleExample],
    ['RepeatingText', HighlightRepeatingTextExample],
  ])('%s example mounts and renders highlighted text', (_name, example) => {
    TestBed.configureTestingModule({ imports: [example] })
    const fixture = TestBed.createComponent(example)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('mark')).not.toBeNull()
    expect(fixture.nativeElement.textContent.trim().length).toBeGreaterThan(0)

    fixture.destroy()
  })
})

function markTexts(element: HTMLElement): string[] {
  return Array.from(element.querySelectorAll('mark'), (mark) => mark.textContent ?? '')
}

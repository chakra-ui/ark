import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core'
import { type HighlightWordProps, highlightWord } from '@zag-js/highlight-word'

export { highlightWord } from '@zag-js/highlight-word'
export type * from '@zag-js/highlight-word'

const optionalBooleanAttribute = (value: unknown): boolean | undefined => {
  if (value == null) return undefined
  return booleanAttribute(value)
}

export interface HighlightProps extends HighlightWordProps {
  markClass?: string | string[] | Set<string> | Record<string, unknown> | null
}

@Component({
  selector: 'ark-highlight',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @for (chunk of chunks(); track $index) {
      @if (chunk.match) {
        <mark [ngClass]="markClass()" [textContent]="chunk.text"></mark>
      } @else {
        <span [textContent]="chunk.text"></span>
      }
    }
  `,
})
export class ArkHighlightComponent {
  readonly query = input.required<HighlightWordProps['query']>()
  readonly text = input.required<HighlightWordProps['text']>()
  readonly ignoreCase = input<boolean | undefined, unknown>(undefined, { transform: optionalBooleanAttribute })
  readonly matchAll = input<boolean | undefined, unknown>(undefined, { transform: optionalBooleanAttribute })
  readonly exactMatch = input<boolean | undefined, unknown>(undefined, { transform: optionalBooleanAttribute })
  readonly markClass = input<HighlightProps['markClass']>(undefined)

  protected readonly chunks = computed(() => {
    const text = this.text()
    if (typeof text !== 'string') {
      throw new Error('[ark-ui/highlight] text must be a string')
    }

    return highlightWord({
      query: this.query(),
      text,
      ignoreCase: this.ignoreCase(),
      matchAll: this.matchAll(),
      exactMatch: this.exactMatch(),
    })
  })
}

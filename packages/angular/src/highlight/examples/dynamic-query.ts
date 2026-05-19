import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { highlightWord } from '../public-api'

@Component({
  selector: 'highlight-dynamic-query-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <input
        type="text"
        placeholder="Search text..."
        [value]="query()"
        (input)="query.set($any($event.target).value)"
      />
      <p>
        @for (chunk of chunks(); track $index) {
          @if (chunk.match) {
            <mark [textContent]="chunk.text"></mark>
          } @else {
            <span [textContent]="chunk.text"></span>
          }
        }
      </p>
    </div>
  `,
  styles: [
    `
      .root {
        display: grid;
        gap: 12px;
      }

      input {
        max-width: 320px;
        border: 1px solid #d4d4d8;
        border-radius: 6px;
        padding: 8px 10px;
        font: inherit;
      }
    `,
  ],
})
export class HighlightDynamicQueryExample {
  readonly query = signal('component')

  readonly chunks = computed(() =>
    highlightWord({
      query: this.query(),
      text: 'With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue.',
    }),
  )
}

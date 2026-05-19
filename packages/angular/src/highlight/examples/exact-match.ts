import { ChangeDetectionStrategy, Component } from '@angular/core'
import { highlightWord } from '../public-api'

const text = 'The checkbox component renders a box element. Use combobox for autocomplete.'

@Component({
  selector: 'highlight-exact-match-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <section>
        <span>Partial Match</span>
        <p>
          @for (chunk of partialChunks; track $index) {
            @if (chunk.match) {
              <mark [textContent]="chunk.text"></mark>
            } @else {
              <span [textContent]="chunk.text"></span>
            }
          }
        </p>
      </section>

      <section>
        <span>Exact Match</span>
        <p>
          @for (chunk of exactChunks; track $index) {
            @if (chunk.match) {
              <mark [textContent]="chunk.text"></mark>
            } @else {
              <span [textContent]="chunk.text"></span>
            }
          }
        </p>
      </section>
    </div>
  `,
  styles: [
    `
      .root {
        display: grid;
        gap: 16px;
      }

      span {
        display: inline-block;
        margin-block-end: 4px;
        font-size: 12px;
        font-weight: 600;
      }
    `,
  ],
})
export class HighlightExactMatchExample {
  readonly partialChunks = highlightWord({ text, query: 'box', matchAll: true })
  readonly exactChunks = highlightWord({ text, query: 'box', exactMatch: true, matchAll: true })
}

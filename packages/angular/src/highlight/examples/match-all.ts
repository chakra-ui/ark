import { ChangeDetectionStrategy, Component } from '@angular/core'
import { highlightWord } from '../public-api'

const text = 'Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.'

@Component({
  selector: 'highlight-match-all-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <section>
        <span>Match All</span>
        <p>
          @for (chunk of allChunks; track $index) {
            @if (chunk.match) {
              <mark [textContent]="chunk.text"></mark>
            } @else {
              <span [textContent]="chunk.text"></span>
            }
          }
        </p>
      </section>

      <section>
        <span>Match First Only</span>
        <p>
          @for (chunk of firstChunks; track $index) {
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
export class HighlightMatchAllExample {
  readonly allChunks = highlightWord({ text, query: 'component', matchAll: true })
  readonly firstChunks = highlightWord({ text, query: 'component', matchAll: false })
}

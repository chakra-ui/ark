import { ChangeDetectionStrategy, Component } from '@angular/core'
import { highlightWord } from '../public-api'

@Component({
  selector: 'highlight-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      @for (chunk of chunks; track $index) {
        @if (chunk.match) {
          <mark [textContent]="chunk.text"></mark>
        } @else {
          <span [textContent]="chunk.text"></span>
        }
      }
    </p>
  `,
})
export class HighlightMultipleExample {
  readonly chunks = highlightWord({
    query: ['React', 'Vue'],
    text: 'Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable.',
  })
}

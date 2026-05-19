import { ChangeDetectionStrategy, Component } from '@angular/core'
import { highlightWord } from '../public-api'

@Component({
  selector: 'highlight-basic-example',
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
export class HighlightBasicExample {
  readonly chunks = highlightWord({
    query: 'component',
    text: 'Ark UI is a headless component library for building accessible web applications.',
  })
}

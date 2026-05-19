import { ChangeDetectionStrategy, Component } from '@angular/core'
import { highlightWord } from '../public-api'

@Component({
  selector: 'highlight-repeating-text-example',
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
export class HighlightRepeatingTextExample {
  readonly chunks = highlightWord({
    query: '@ark-ui.com',
    text: 'Contact us at support@ark-ui.com or sales@ark-ui.com for assistance.',
    matchAll: true,
  })
}

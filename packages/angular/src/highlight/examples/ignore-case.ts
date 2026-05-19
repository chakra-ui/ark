import { ChangeDetectionStrategy, Component } from '@angular/core'
import { highlightWord } from '../public-api'

@Component({
  selector: 'highlight-ignore-case-example',
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
export class HighlightIgnoreCaseExample {
  readonly chunks = highlightWord({
    text: 'TypeScript provides static type checking. Using typescript helps catch errors early in development.',
    query: 'typescript',
    ignoreCase: true,
  })
}

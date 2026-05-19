import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

@Component({
  selector: 'highlight-ignore-case-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <p class="Text">
      <ark-highlight
        text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
        query="typescript"
        ignoreCase
        markClass="Mark"
      />
    </p>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightIgnoreCaseExample {}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

@Component({
  selector: 'highlight-repeating-text-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <p class="Text">
      <ark-highlight
        query="@ark-ui.com"
        text="Contact us at support@ark-ui.com or sales@ark-ui.com for assistance."
        matchAll
        markClass="Mark"
      />
    </p>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightRepeatingTextExample {}

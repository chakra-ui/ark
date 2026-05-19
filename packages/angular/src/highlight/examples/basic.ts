import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

@Component({
  selector: 'highlight-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <p class="Text">
      <ark-highlight
        query="component"
        text="Ark UI is a headless component library for building accessible web applications."
        markClass="Mark"
      />
    </p>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightBasicExample {}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

@Component({
  selector: 'highlight-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <p class="Text">
      <ark-highlight
        [query]="['React', 'Vue']"
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
        markClass="Mark"
      />
    </p>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightMultipleExample {}

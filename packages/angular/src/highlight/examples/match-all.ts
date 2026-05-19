import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

const text = 'Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.'

@Component({
  selector: 'highlight-match-all-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <div class="Root">
      <section class="Section">
        <span class="Label">Match All</span>
        <p class="Text">
          <ark-highlight [text]="text" query="component" [matchAll]="true" markClass="Mark" />
        </p>
      </section>

      <section class="Section">
        <span class="Label">Match First Only</span>
        <p class="Text">
          <ark-highlight [text]="text" query="component" [matchAll]="false" markClass="Mark" />
        </p>
      </section>
    </div>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightMatchAllExample {
  readonly text = text
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

const text = 'The checkbox component renders a box element. Use combobox for autocomplete.'

@Component({
  selector: 'highlight-exact-match-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <div class="Root">
      <section class="Section">
        <span class="Label">Partial Match</span>
        <p class="Text">
          <ark-highlight [text]="text" query="box" [matchAll]="true" markClass="Mark" />
        </p>
      </section>

      <section class="Section">
        <span class="Label">Exact Match</span>
        <p class="Text">
          <ark-highlight [text]="text" query="box" [exactMatch]="true" [matchAll]="true" markClass="Mark" />
        </p>
      </section>
    </div>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightExactMatchExample {
  readonly text = text
}

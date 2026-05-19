import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkHighlightComponent } from '../public-api'
import { highlightExampleStyles } from '../highlight-example-styles'

@Component({
  selector: 'highlight-dynamic-query-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkHighlightComponent],
  template: `
    <div class="Root">
      <input
        class="Input"
        type="text"
        placeholder="Search text..."
        [value]="query()"
        (input)="query.set($any($event.target).value)"
      />
      <p class="Text">
        <ark-highlight [query]="query()" [text]="text" markClass="Mark" />
      </p>
    </div>
  `,
  styles: [highlightExampleStyles],
})
export class HighlightDynamicQueryExample {
  readonly query = signal('component')
  readonly text =
    'With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue.'
}

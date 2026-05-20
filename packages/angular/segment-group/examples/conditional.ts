import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkSegmentGroupIndicator,
  ArkSegmentGroupItem,
  ArkSegmentGroupItemControl,
  ArkSegmentGroupItemHiddenInput,
  ArkSegmentGroupItemText,
  ArkSegmentGroupRoot,
} from '../public-api'
import { segmentGroupExampleStyles } from '../segment-group-example-styles'

@Component({
  selector: 'segment-group-conditional-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSegmentGroupRoot,
    ArkSegmentGroupIndicator,
    ArkSegmentGroupItem,
    ArkSegmentGroupItemText,
    ArkSegmentGroupItemControl,
    ArkSegmentGroupItemHiddenInput,
  ],
  template: `
    <div class="stack">
      <button class="segment-group-toggle-button" type="button" (click)="toggle()">
        {{ show() ? 'Hide' : 'Show' }}
      </button>
      @if (show()) {
        <div arkSegmentGroupRoot defaultValue="React">
          <div arkSegmentGroupIndicator></div>
          @for (framework of frameworks; track framework) {
            <label arkSegmentGroupItem [value]="framework">
              <span arkSegmentGroupItemText>{{ framework }}</span>
              <div arkSegmentGroupItemControl></div>
              <input arkSegmentGroupItemHiddenInput />
            </label>
          }
        </div>
      }
    </div>
  `,
  styles: [segmentGroupExampleStyles],
})
export class SegmentGroupConditionalExample {
  readonly show = signal(false)
  readonly frameworks = ['React', 'Solid', 'Svelte', 'Vue']

  toggle(): void {
    this.show.update((show) => !show)
  }
}

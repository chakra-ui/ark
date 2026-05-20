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
  selector: 'segment-group-controlled-example',
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
    <div arkSegmentGroupRoot [(value)]="value">
      <div arkSegmentGroupIndicator></div>
      @for (framework of frameworks; track framework) {
        <label arkSegmentGroupItem [value]="framework">
          <span arkSegmentGroupItemText>{{ framework }}</span>
          <div arkSegmentGroupItemControl></div>
          <input arkSegmentGroupItemHiddenInput />
        </label>
      }
    </div>
  `,
  styles: [segmentGroupExampleStyles],
})
export class SegmentGroupControlledExample {
  readonly frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  readonly value = signal<string | null>(null)
}

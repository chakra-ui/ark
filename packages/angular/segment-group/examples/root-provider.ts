import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSegmentGroupIndicator,
  ArkSegmentGroupItem,
  ArkSegmentGroupItemControl,
  ArkSegmentGroupItemHiddenInput,
  ArkSegmentGroupItemText,
  ArkSegmentGroupRootProvider,
  useSegmentGroup,
} from '../public-api'
import { segmentGroupExampleStyles } from '../segment-group-example-styles'

@Component({
  selector: 'segment-group-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSegmentGroupRootProvider,
    ArkSegmentGroupIndicator,
    ArkSegmentGroupItem,
    ArkSegmentGroupItemText,
    ArkSegmentGroupItemControl,
    ArkSegmentGroupItemHiddenInput,
  ],
  template: `
    <div class="stack">
      <div arkSegmentGroupRootProvider [value]="segmentGroup">
        <div arkSegmentGroupIndicator></div>
        @for (framework of frameworks; track framework) {
          <label arkSegmentGroupItem [value]="framework">
            <span arkSegmentGroupItemText>{{ framework }}</span>
            <div arkSegmentGroupItemControl></div>
            <input arkSegmentGroupItemHiddenInput />
          </label>
        }
      </div>
      <output>selected: {{ segmentGroup.api().value }}</output>
    </div>
  `,
  styles: [segmentGroupExampleStyles],
})
export class SegmentGroupRootProviderExample {
  readonly frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  readonly segmentGroup = useSegmentGroup({ context: () => ({ defaultValue: 'React' }) })
}

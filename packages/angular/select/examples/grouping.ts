import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectClearTrigger,
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectIndicator,
  ArkSelectItem,
  ArkSelectItemGroup,
  ArkSelectItemGroupLabel,
  ArkSelectItemIndicator,
  ArkSelectItemText,
  ArkSelectLabel,
  ArkSelectPositioner,
  ArkSelectRoot,
  ArkSelectTrigger,
  ArkSelectValueText,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

interface Framework {
  label: string
  value: string
  type: string
}

@Component({
  selector: 'select-grouping-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkSelectRoot,
    ArkSelectLabel,
    ArkSelectControl,
    ArkSelectTrigger,
    ArkSelectValueText,
    ArkSelectClearTrigger,
    ArkSelectIndicator,
    ArkSelectPositioner,
    ArkSelectContent,
    ArkSelectItemGroup,
    ArkSelectItemGroupLabel,
    ArkSelectItem,
    ArkSelectItemText,
    ArkSelectItemIndicator,
    ArkSelectHiddenSelect,
  ],
  template: `
    <div arkSelectRoot #root="arkSelectRoot" [collection]="collection">
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText placeholder="Select a Framework"></span>
        </button>
        <div class="select-indicators">
          <button arkSelectClearTrigger>×</button>
          <span arkSelectIndicator>▾</span>
        </div>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent>
            @for (group of collection.group(); track group[0]) {
              <div arkSelectItemGroup>
                <span arkSelectItemGroupLabel>{{ group[0] }}</span>
                @for (item of group[1]; track item.value) {
                  <div arkSelectItem [item]="item">
                    <span arkSelectItemText>{{ item.label }}</span>
                    <span arkSelectItemIndicator>✓</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </ark-portal>
      <select arkSelectHiddenSelect></select>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectGroupingExample {
  readonly collection: ListCollection<Framework> = createListCollection<Framework>({
    items: [
      { label: 'React', value: 'react', type: 'JS' },
      { label: 'Solid', value: 'solid', type: 'JS' },
      { label: 'Vue', value: 'vue', type: 'JS' },
      { label: 'Panda', value: 'panda', type: 'CSS' },
      { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
    ],
    groupBy: (item) => item.type,
  })
}

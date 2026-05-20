import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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

interface Item {
  label: string
  value: string
  disabled?: boolean
}

@Component({
  selector: 'select-controlled-example',
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
    <div arkSelectRoot #root="arkSelectRoot" [collection]="collection" [(value)]="value">
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText>Select a Framework</span>
        </button>
        <div class="select-indicators">
          <button arkSelectClearTrigger>×</button>
          <span arkSelectIndicator>▾</span>
        </div>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent>
            <div arkSelectItemGroup>
              <span arkSelectItemGroupLabel>Frameworks</span>
              @for (item of collection.items; track item.value) {
                <div arkSelectItem [item]="item">
                  <span arkSelectItemText>{{ item.label }}</span>
                  <span arkSelectItemIndicator>✓</span>
                </div>
              }
            </div>
          </div>
        </div>
      </ark-portal>
      <select arkSelectHiddenSelect></select>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectControlledExample {
  readonly value = signal<string[] | undefined>([])
  readonly collection: ListCollection<Item> = createListCollection<Item>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
  })
}

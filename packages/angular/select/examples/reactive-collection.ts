import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectContent,
  ArkSelectControl,
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
  disabled?: boolean
}

const itemsBase: Framework[] = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

@Component({
  selector: 'select-reactive-collection-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSelectRoot,
    ArkSelectLabel,
    ArkSelectControl,
    ArkSelectTrigger,
    ArkSelectValueText,
    ArkSelectIndicator,
    ArkSelectPositioner,
    ArkSelectContent,
    ArkSelectItemGroup,
    ArkSelectItemGroupLabel,
    ArkSelectItem,
    ArkSelectItemText,
    ArkSelectItemIndicator,
  ],
  template: `
    <div>
      <div class="select-actions">
        <button class="select-button" type="button" (click)="number.set(number() + 1)">+</button>
        <button class="select-button" type="button" (click)="number.set(number() - 1)">-</button>
      </div>
      <div arkSelectRoot [collection]="collection()" [positioning]="{ sameWidth: true }">
        <span arkSelectLabel>Framework</span>
        <div arkSelectControl>
          <button arkSelectTrigger>
            <span arkSelectValueText placeholder="Select a Framework"></span>
            <span arkSelectIndicator>▾</span>
          </button>
        </div>
        <div arkSelectPositioner>
          <div arkSelectContent>
            <div arkSelectItemGroup>
              <span arkSelectItemGroupLabel>Framework</span>
              @for (item of collection().items; track item.label) {
                <div arkSelectItem [item]="item">
                  <span arkSelectItemText>{{ item.label }}</span>
                  <span arkSelectItemIndicator>✓</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectReactiveCollectionExample {
  readonly number = signal(0)
  readonly collection = computed<ListCollection<Framework>>(() =>
    createListCollection<Framework>({
      items: itemsBase.map((item) => ({ ...item, label: `${item.label}-${this.number()}` })),
    }),
  )
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
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
  type SelectValueChangeDetails,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

interface Framework {
  label: string
  value: string
  disabled?: boolean
}

const items = ['React', 'Solid', 'Vue', 'Svelte']
const maxSelection = 2

@Component({
  selector: 'select-max-selected-example',
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
    <div
      arkSelectRoot
      #root="arkSelectRoot"
      [collection]="collection()"
      [multiple]="true"
      [value]="value()"
      (valueChange)="handleValueChange($event)"
    >
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText>Select</span>
          <span arkSelectIndicator>▾</span>
        </button>
        <button arkSelectClearTrigger>×</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent>
            <div arkSelectItemGroup>
              <span arkSelectItemGroupLabel>Frameworks</span>
              @for (item of collection().items; track item.value) {
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
export class SelectMaxSelectedExample {
  readonly value = signal<string[]>([])
  readonly collection = computed<ListCollection<Framework>>(() =>
    createListCollection<Framework>({
      items: items.map((label) => ({
        label,
        value: label,
        disabled: this.value().length >= maxSelection && !this.value().includes(label),
      })),
    }),
  )

  handleValueChange(details: SelectValueChangeDetails<Framework>): void {
    if (this.value().length >= maxSelection && details.value.length > this.value().length) return
    this.value.set(details.value)
  }
}

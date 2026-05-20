import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import type { CheckboxCheckedState } from '../public-api'
import {
  ArkCheckboxControl,
  ArkCheckboxGroup,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon, CheckboxMinusIcon } from './icons'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

@Component({
  selector: 'checkbox-group-with-select-all-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxGroup,
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
    CheckboxMinusIcon,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <output>Selected: {{ json(value()) }}</output>

      <label arkCheckbox value="all" [checked]="selectAllChecked()" (checkedChange)="handleSelectAll($event)">
        <span arkCheckboxControl>
          <span arkCheckboxIndicator>
            <checkbox-check-icon />
          </span>
          <span arkCheckboxIndicator indeterminate>
            <checkbox-minus-icon />
          </span>
        </span>
        <span arkCheckboxLabel>JSX Frameworks</span>
        <input arkCheckboxHiddenInput />
      </label>

      <div arkCheckboxGroup style="margin-inline-start: 1rem;" [(value)]="value" name="framework">
        @for (item of items; track item.value) {
          <label arkCheckbox [value]="item.value">
            <span arkCheckboxControl>
              <span arkCheckboxIndicator>
                <checkbox-check-icon />
              </span>
              <span arkCheckboxIndicator indeterminate>
                <checkbox-minus-icon />
              </span>
            </span>
            <span arkCheckboxLabel>{{ item.label }}</span>
            <input arkCheckboxHiddenInput />
          </label>
        }
      </div>
    </div>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxGroupWithSelectAllExample {
  readonly value = signal<string[] | undefined>([])
  protected readonly items = items
  protected readonly json = JSON.stringify
  protected readonly allSelected = computed(() => (this.value()?.length ?? 0) === items.length)
  protected readonly indeterminate = computed(() => {
    const length = this.value()?.length ?? 0
    return length > 0 && length < items.length
  })
  protected readonly selectAllChecked = computed<CheckboxCheckedState>(() =>
    this.indeterminate() ? 'indeterminate' : this.allSelected(),
  )

  protected handleSelectAll(checked: CheckboxCheckedState | undefined): void {
    this.value.set(checked ? items.map((item) => item.value) : [])
  }
}

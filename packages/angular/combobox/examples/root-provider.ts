import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxClearTrigger,
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemIndicator,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxPositioner,
  ArkComboboxRootProvider,
  ArkComboboxTrigger,
  useCombobox,
  type ComboboxInputValueChangeDetails,
  type UseComboboxReturn,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Job {
  label: string
  value: string
}

const initialItems: Job[] = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'Data Scientist', value: 'data-scientist' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'Marketing Lead', value: 'marketing' },
]

@Component({
  selector: 'combobox-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkComboboxRootProvider,
    ArkComboboxLabel,
    ArkComboboxControl,
    ArkComboboxInput,
    ArkComboboxClearTrigger,
    ArkComboboxTrigger,
    ArkComboboxPositioner,
    ArkComboboxContent,
    ArkComboboxItem,
    ArkComboboxItemText,
    ArkComboboxItemIndicator,
  ],
  template: `
    <div class="combobox-stack">
      <button class="combobox-button" type="button" (click)="combobox.api().focus()">Focus</button>

      <div arkComboboxRootProvider #provider="arkComboboxRootProvider" [value]="combobox">
        <span arkComboboxLabel>Job Title</span>
        <div arkComboboxControl>
          <input arkComboboxInput placeholder="e.g. Designer" />
          <button arkComboboxClearTrigger>×</button>
          <button arkComboboxTrigger>▾</button>
        </div>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkComboboxPositioner>
            <div arkComboboxContent>
              @for (item of collection().items; track item.value) {
                <div arkComboboxItem [item]="item">
                  <span arkComboboxItemText>{{ item.label }}</span>
                  <span arkComboboxItemIndicator>✓</span>
                </div>
              }
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxRootProviderExample {
  readonly collection = signal<ListCollection<Job>>(createListCollection<Job>({ items: initialItems }))
  readonly combobox: UseComboboxReturn<Job> = runInInjectionContext(inject(Injector), () =>
    useCombobox<Job>({
      context: () => ({
        collection: this.collection(),
        onInputValueChange: (details: ComboboxInputValueChangeDetails) => this.onInputValueChange(details),
      }),
    }),
  )

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.label.toLowerCase().includes(query))
    this.collection.set(createListCollection<Job>({ items: filtered }))
  }
}

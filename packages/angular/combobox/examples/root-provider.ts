import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
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
  type UseComboboxReturn,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Job {
  label: string
  value: string
}

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
    ArkComboboxTrigger,
    ArkComboboxPositioner,
    ArkComboboxContent,
    ArkComboboxItem,
    ArkComboboxItemText,
    ArkComboboxItemIndicator,
  ],
  template: `
    <div arkComboboxRootProvider #provider="arkComboboxRootProvider" [value]="combobox">
      <span arkComboboxLabel>Job Title</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Designer" />
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
                <span arkComboboxItemIndicator>✓</span>
              </div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxRootProviderExample {
  readonly collection: ListCollection<Job> = createListCollection<Job>({
    items: [
      { label: 'Designer', value: 'designer' },
      { label: 'Developer', value: 'developer' },
      { label: 'Product Manager', value: 'pm' },
      { label: 'Data Scientist', value: 'data-scientist' },
      { label: 'DevOps Engineer', value: 'devops' },
      { label: 'Marketing Lead', value: 'marketing' },
    ],
  })
  readonly combobox: UseComboboxReturn<Job> = runInInjectionContext(inject(Injector), () =>
    useCombobox<Job>({ context: () => ({ collection: this.collection }) }),
  )
}

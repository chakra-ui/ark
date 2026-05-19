import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectIndicator,
  ArkSelectItem,
  ArkSelectItemIndicator,
  ArkSelectItemText,
  ArkSelectLabel,
  ArkSelectPositioner,
  ArkSelectRootProvider,
  ArkSelectTrigger,
  ArkSelectValueText,
  useSelect,
  type UseSelectReturn,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

interface Priority {
  label: string
  value: string
}

@Component({
  selector: 'select-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkSelectRootProvider,
    ArkSelectLabel,
    ArkSelectControl,
    ArkSelectTrigger,
    ArkSelectValueText,
    ArkSelectIndicator,
    ArkSelectPositioner,
    ArkSelectContent,
    ArkSelectItem,
    ArkSelectItemText,
    ArkSelectItemIndicator,
    ArkSelectHiddenSelect,
  ],
  template: `
    <output class="select-output">selected: {{ select.api().value.join(', ') || 'none' }}</output>
    <div arkSelectRootProvider #provider="arkSelectRootProvider" [value]="select">
      <span arkSelectLabel>Priority</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText>Pick priority</span>
        </button>
        <div class="select-indicators">
          <span arkSelectIndicator>▾</span>
        </div>
      </div>
      <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
                <span arkSelectItemIndicator>✓</span>
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
export class SelectRootProviderExample {
  readonly collection: ListCollection<Priority> = createListCollection<Priority>({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
  })
  readonly select: UseSelectReturn<Priority> = runInInjectionContext(inject(Injector), () =>
    useSelect<Priority>({ context: () => ({ collection: this.collection }) }),
  )
}

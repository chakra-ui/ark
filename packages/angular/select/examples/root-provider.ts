import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
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
  ArkSelectRootProvider,
  ArkSelectTrigger,
  ArkSelectValueText,
  useSelect,
  type UseSelectReturn,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

interface Framework {
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
    <output>selected: {{ stringify(select.api().value) }}</output>
    <div arkSelectRootProvider #provider="arkSelectRootProvider" [value]="select">
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
      <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
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
export class SelectRootProviderExample {
  readonly collection: ListCollection<Framework> = createListCollection<Framework>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })
  readonly select: UseSelectReturn<Framework> = runInInjectionContext(inject(Injector), () =>
    useSelect<Framework>({ context: () => ({ collection: this.collection }) }),
  )

  stringify(value: string[]): string {
    return JSON.stringify(value)
  }
}

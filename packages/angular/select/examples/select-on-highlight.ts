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

@Component({
  selector: 'select-on-highlight-example',
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
    <div arkSelectRootProvider #provider="arkSelectRootProvider" [value]="select">
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText placeholder="Select a Framework"></span>
          <span arkSelectIndicator>▾</span>
        </button>
        <button arkSelectClearTrigger>Clear</button>
      </div>
      <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent>
            <div arkSelectItemGroup>
              <span arkSelectItemGroupLabel>Frameworks</span>
              @for (item of collection.items; track item) {
                <div arkSelectItem [item]="item">
                  <span arkSelectItemText>{{ item }}</span>
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
export class SelectOnHighlightExample {
  readonly collection: ListCollection<string> = createListCollection<string>({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })
  readonly select: UseSelectReturn<string> = runInInjectionContext(inject(Injector), () =>
    useSelect<string>({
      context: () => ({
        collection: this.collection,
        onHighlightChange: ({ highlightedValue }) => {
          if (highlightedValue) this.select.api().selectValue(highlightedValue)
        },
      }),
    }),
  )
}

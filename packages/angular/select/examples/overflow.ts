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

@Component({
  selector: 'select-overflow-example',
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
      [collection]="collection"
      [positioning]="{ fitViewport: true, placement: 'bottom-start', sameWidth: true }"
    >
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText>Select a Framework</span>
          <span arkSelectIndicator>▾</span>
        </button>
        <button arkSelectClearTrigger>Clear</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent style="max-height: 200px">
            <div arkSelectItemGroup>
              <span arkSelectItemGroupLabel>Names</span>
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
export class SelectOverflowExample {
  readonly collection: ListCollection<string> = createListCollection<string>({
    items: Array.from({ length: 14 }, (_, index) => `Name ${index + 1}`),
  })
}

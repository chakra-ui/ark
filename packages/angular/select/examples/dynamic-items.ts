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
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

@Component({
  selector: 'select-dynamic-items-example',
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
    <div>
      <div arkSelectRoot #root="arkSelectRoot" [collection]="collection()">
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
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkSelectPositioner>
            <div arkSelectContent>
              <div arkSelectItemGroup>
                <span arkSelectItemGroupLabel>Frameworks</span>
                @for (item of collection().items; track item) {
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

      <button class="select-button" style="margin-top: 1rem" type="button" (click)="addItem()">Add Item</button>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectDynamicItemsExample {
  readonly items = signal<string[]>(['React', 'Solid', 'Vue', 'Svelte'])
  readonly collection = computed<ListCollection<string>>(() => createListCollection<string>({ items: this.items() }))

  addItem(): void {
    this.items.update((current) => [...current, 'Angular'])
  }
}

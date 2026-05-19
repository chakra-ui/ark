import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
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
  selector: 'select-lazy-mount-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkPresenceComponent,
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
    <div arkSelectRoot #root="arkSelectRoot" [collection]="collection">
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText>Select a Framework</span>
          <span arkSelectIndicator>▾</span>
        </button>
        <button arkSelectClearTrigger>Clear</button>
      </div>
      <ark-presence
        [present]="root.api().open"
        lazyMount
        unmountOnExit
        [originInjector]="root.getContextCarrier().elementInjector"
      >
        <ng-template>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
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
        </ng-template>
      </ark-presence>
      <select arkSelectHiddenSelect></select>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectLazyMountExample {
  readonly collection: ListCollection<string> = createListCollection<string>({
    items: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Alpine'],
  })
}

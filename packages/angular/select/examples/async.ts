import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
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
  ArkSelectRoot,
  ArkSelectTrigger,
  ArkSelectValueText,
  type SelectOpenChangeDetails,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

const loadData = () =>
  new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Ember']), 500)
  })

@Component({
  selector: 'select-async-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkSelectRoot,
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
    <div arkSelectRoot #root="arkSelectRoot" [collection]="collection()" (openChange)="handleOpenChange($event)">
      <span arkSelectLabel>Framework</span>
      <div arkSelectControl>
        <button arkSelectTrigger>
          <span arkSelectValueText placeholder="Select"></span>
          <span arkSelectIndicator>▾</span>
        </button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkSelectPositioner>
          <div arkSelectContent>
            @if (loading()) {
              <div class="select-status">Loading...</div>
            } @else if (error()) {
              <div class="select-status">Error: {{ error()?.message }}</div>
            } @else {
              @for (item of collection().items; track item) {
                <div arkSelectItem [item]="item">
                  <span arkSelectItemText>{{ item }}</span>
                  <span arkSelectItemIndicator>✓</span>
                </div>
              }
            }
          </div>
        </div>
      </ark-portal>
      <select arkSelectHiddenSelect></select>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectAsyncExample {
  readonly items = signal<string[] | null>(null)
  readonly loading = signal(false)
  readonly error = signal<Error | null>(null)
  readonly collection = computed<ListCollection<string>>(() =>
    createListCollection<string>({ items: this.items() ?? [] }),
  )

  handleOpenChange(details: SelectOpenChangeDetails): void {
    if (!details.open || this.items() !== null) return
    this.loading.set(true)
    this.error.set(null)
    loadData()
      .then((items) => this.items.set(items))
      .catch((error) => this.error.set(error instanceof Error ? error : new Error(String(error))))
      .finally(() => this.loading.set(false))
  }
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Framework {
  label: string
  value: string
}

@Component({
  selector: 'listbox-select-all-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText, ArkListboxItemIndicator],
  template: `
    <div arkListboxRoot [collection]="collection" selectionMode="multiple" [(value)]="value">
      <button class="select-all-header" type="button" (click)="toggleSelectAll()">
        <span class="select-all-header-indicator">{{ selectAllIndicator() }}</span>
        <span arkListboxLabel>Select All</span>
      </button>
      <div arkListboxContent>
        @for (item of collection.items; track item.value) {
          <div arkListboxItem [item]="item">
            <span arkListboxItemText>{{ item.label }}</span>
            <span arkListboxItemIndicator>✓</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxSelectAllExample {
  readonly value = signal<string[] | undefined>([])
  readonly collection: ListCollection<Framework> = createListCollection<Framework>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Nuxt.js', value: 'nuxtjs' },
      { label: 'Remix', value: 'remix' },
      { label: 'Gatsby', value: 'gatsby' },
    ],
  })

  readonly selectAllIndicator = computed(() => {
    const selectedCount = this.value()?.length ?? 0
    if (selectedCount === this.collection.items.length) return '✓'
    if (selectedCount > 0) return '−'
    return ''
  })

  toggleSelectAll(): void {
    const isAllSelected = (this.value()?.length ?? 0) === this.collection.items.length
    this.value.set(isAllSelected ? [] : this.collection.items.map((item) => item.value))
  }
}

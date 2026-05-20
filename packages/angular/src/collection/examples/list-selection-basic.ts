import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, createListSelection } from '../public-api'
import { listSelectionExampleStyles } from '../list-selection-example-styles'

interface ListSelectionItem {
  label: string
  value: string
}

@Component({
  selector: 'collection-list-selection-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-selection-root">
      <output>Selected: {{ selectedValues().join(', ') || 'None' }}</output>
      @for (item of collection.items; track item.value) {
        <label class="list-selection-item" [attr.data-selected]="isSelected(item.value) || undefined">
          <input
            type="checkbox"
            class="list-selection-checkbox"
            [checked]="isSelected(item.value)"
            (change)="select(item.value)"
          />
          <span class="list-selection-item-text">{{ item.label }}</span>
        </label>
      }
    </div>
  `,
  styles: [listSelectionExampleStyles],
})
export class CollectionListSelectionBasicExample {
  protected readonly items: ListSelectionItem[] = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ]

  protected readonly collection = createListCollection<ListSelectionItem>({ items: this.items })
  protected readonly selection = signal(createListSelection())

  protected selectedValues(): string[] {
    return Array.from(this.selection())
  }

  protected isSelected(value: string): boolean {
    return this.selection().isSelected(value)
  }

  protected select(value: string): void {
    this.selection.update((selection) => selection.select(this.collection, value))
  }
}

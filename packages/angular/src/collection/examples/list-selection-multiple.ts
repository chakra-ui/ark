import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, createListSelection } from '../public-api'
import { listSelectionExampleStyles } from '../list-selection-example-styles'

interface ListSelectionItem {
  label: string
  value: string
}

@Component({
  selector: 'collection-list-selection-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-selection-root">
      <div class="list-selection-header">
        <span class="list-selection-count">
          {{ selectedValues().length }} of {{ collection.items.length }} selected
        </span>
        <button type="button" class="list-selection-select-all-button" (click)="toggleAll()">
          {{ isAllSelected() ? 'Deselect all' : 'Select all' }}
        </button>
      </div>
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
export class CollectionListSelectionMultipleExample {
  protected readonly items: ListSelectionItem[] = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
  ]

  protected readonly collection = createListCollection<ListSelectionItem>({ items: this.items })
  protected readonly selection = signal(createListSelection({ selectionMode: 'multiple' }))

  protected selectedValues(): string[] {
    return Array.from(this.selection())
  }

  protected isSelected(value: string): boolean {
    return this.selection().isSelected(value)
  }

  protected isAllSelected(): boolean {
    const values = this.collection.getValues()
    return values.length > 0 && values.every((value) => this.selection().isSelected(value))
  }

  protected select(value: string): void {
    this.selection.update((selection) => selection.select(this.collection, value))
  }

  protected toggleAll(): void {
    this.selection.update((selection) =>
      this.isAllSelected() ? selection.clearSelection() : selection.setSelection(this.collection.getValues()),
    )
  }
}

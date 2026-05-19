import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, createListSelection } from '../public-api'

interface ListSelectionItem {
  label: string
  value: string
}

@Component({
  selector: 'collection-list-selection-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-selection">
      <div class="header">
        <output>{{ selectedValues().length }} of {{ collection.size }} selected</output>
        <button type="button" (click)="toggleAll()">{{ isAllSelected() ? 'Deselect all' : 'Select all' }}</button>
      </div>
      <div class="items">
        @for (item of collection.items; track item.value) {
          <label class="item" [attr.data-selected]="isSelected(item.value) || undefined">
            <input type="checkbox" [checked]="isSelected(item.value)" (change)="select(item.value)" />
            {{ item.label }}
          </label>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .list-selection {
        display: grid;
        gap: 0.75rem;
        max-width: 20rem;
      }

      .header {
        align-items: center;
        display: flex;
        gap: 0.75rem;
        justify-content: space-between;
      }

      .items {
        display: grid;
        gap: 0.5rem;
      }

      .item {
        align-items: center;
        display: flex;
        gap: 0.5rem;
      }
    `,
  ],
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

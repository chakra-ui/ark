import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, createListSelection } from '../public-api'

interface ListSelectionItem {
  label: string
  value: string
}

@Component({
  selector: 'collection-list-selection-range-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-selection">
      <output>Selected: {{ selectedValues().join(', ') || 'none' }}</output>
      <div class="items">
        @for (item of collection.items; track item.value) {
          <label class="item" [attr.data-selected]="isSelected(item.value) || undefined">
            <input type="checkbox" [checked]="isSelected(item.value)" (change)="toggle(item.value)" />
            {{ item.label }}
          </label>
        }
      </div>
      <div class="controls">
        <button type="button" (click)="extendSelection('vue', 'svelte')">Select Vue to Svelte</button>
        <button type="button" (click)="extendSelection('angular', 'solid')">Select Angular to Solid</button>
        <button type="button" (click)="clearSelection()">Clear selection</button>
      </div>
    </div>
  `,
  styles: [
    `
      .list-selection {
        display: grid;
        gap: 0.75rem;
        max-width: 22rem;
      }

      .items,
      .controls {
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
export class CollectionListSelectionRangeExample {
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

  protected toggle(value: string): void {
    this.selection.update((selection) => selection.toggleSelection(this.collection, value))
  }

  protected extendSelection(anchorValue: string, targetValue: string): void {
    this.selection.update((selection) => selection.extendSelection(this.collection, anchorValue, targetValue))
  }

  protected clearSelection(): void {
    this.selection.update((selection) => selection.clearSelection())
  }
}

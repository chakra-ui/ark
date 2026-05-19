import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, createListSelection } from '../public-api'

interface ListSelectionItem {
  label: string
  value: string
}

@Component({
  selector: 'collection-list-selection-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-selection">
      <output>Selected: {{ selectedValues().join(', ') || 'none' }}</output>
      <div class="items">
        @for (item of collection.items; track item.value) {
          <label class="item" [attr.data-selected]="isSelected(item.value) || undefined">
            <input type="checkbox" [checked]="isSelected(item.value)" (change)="select(item.value)" />
            {{ item.label }}
          </label>
        }
      </div>
      <button type="button" (click)="clearSelection()">Clear selection</button>
    </div>
  `,
  styles: [
    `
      .list-selection {
        display: grid;
        gap: 0.75rem;
        max-width: 18rem;
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

  protected clearSelection(): void {
    this.selection.update((selection) => selection.clearSelection())
  }
}

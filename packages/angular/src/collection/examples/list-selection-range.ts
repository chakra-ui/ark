import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, createListSelection } from '../public-api'
import { listSelectionExampleStyles } from '../list-selection-example-styles'

interface ListSelectionItem {
  label: string
  value: string
}

@Component({
  selector: 'collection-list-selection-range-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-selection-root">
      <output>Selected: {{ selectedValues().join(', ') || 'None' }}</output>
      @for (item of collection.items; track item.value) {
        <label
          class="list-selection-item"
          [attr.data-selected]="isSelected(item.value) || undefined"
          (click)="handleItemClick(item.value, $event)"
        >
          <input type="checkbox" class="list-selection-checkbox" [checked]="isSelected(item.value)" />
          <span class="list-selection-item-text">{{ item.label }}</span>
        </label>
      }
      <p class="list-selection-helper-text">Click to select • Shift+Click for range • Cmd/Ctrl+Click to toggle</p>
    </div>
  `,
  styles: [listSelectionExampleStyles],
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

  protected handleItemClick(value: string, event: MouseEvent): void {
    this.selection.update((selection) => {
      const anchorValue = selection.firstSelectedValue(this.collection)

      if (event.shiftKey && anchorValue) {
        return selection.extendSelection(this.collection, anchorValue, value)
      }

      if (event.ctrlKey || event.metaKey) {
        return selection.toggleSelection(this.collection, value)
      }

      return selection.replaceSelection(this.collection, value)
    })
  }
}

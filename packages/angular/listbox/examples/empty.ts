import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import { ArkListboxContent, ArkListboxEmpty, ArkListboxLabel, ArkListboxRoot } from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Empty {
  label: string
  value: string
}

@Component({
  selector: 'listbox-empty-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkListboxRoot, ArkListboxLabel, ArkListboxContent, ArkListboxEmpty],
  template: `
    <div arkListboxRoot [collection]="collection">
      <span arkListboxLabel>Results</span>
      <div arkListboxContent>
        <div arkListboxEmpty>No items found</div>
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxEmptyExample {
  readonly collection: ListCollection<Empty> = createListCollection<Empty>({ items: [] })
}

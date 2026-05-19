import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createGridCollection, type GridCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Reaction {
  label: string
  value: string
}

@Component({
  selector: 'listbox-grid-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkListboxRoot, ArkListboxLabel, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
  template: `
    <div arkListboxRoot [collection]="collection">
      <span arkListboxLabel>Pick a reaction</span>
      <div arkListboxContent class="grid-content">
        @for (item of collection.items; track item.value) {
          <div arkListboxItem class="grid-item" [item]="item">
            <span arkListboxItemText>{{ item.label }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxGridExample {
  readonly collection: GridCollection<Reaction> = createGridCollection<Reaction>({
    items: [
      { label: '😀', value: 'grinning' },
      { label: '😍', value: 'heart-eyes' },
      { label: '🥳', value: 'partying' },
      { label: '😎', value: 'sunglasses' },
      { label: '🤩', value: 'star-struck' },
      { label: '😂', value: 'joy' },
      { label: '🥰', value: 'smiling-hearts' },
      { label: '😊', value: 'blush' },
      { label: '🤗', value: 'hugging' },
      { label: '😇', value: 'innocent' },
      { label: '🔥', value: 'fire' },
      { label: '✨', value: 'sparkles' },
      { label: '💯', value: 'hundred' },
      { label: '🎉', value: 'tada' },
      { label: '❤️', value: 'heart' },
      { label: '👍', value: 'thumbs-up' },
      { label: '👏', value: 'clap' },
      { label: '🚀', value: 'rocket' },
      { label: '⭐', value: 'star' },
      { label: '🌈', value: 'rainbow' },
    ],
    columnCount: 5,
  })
}

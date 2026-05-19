import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemIndicator,
  ArkListboxLabel,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Album {
  title: string
  artist: string
  image: string
}

@Component({
  selector: 'listbox-horizontal-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkListboxRoot, ArkListboxLabel, ArkListboxContent, ArkListboxItem, ArkListboxItemIndicator],
  template: `
    <div arkListboxRoot [collection]="collection" orientation="horizontal">
      <span arkListboxLabel>Select Album</span>
      <div arkListboxContent>
        @for (item of collection.items; track item.title) {
          <div arkListboxItem class="item-card" [item]="item">
            <span arkListboxItemIndicator class="item-card-indicator">✓</span>
            <img class="item-card-image" [src]="item.image" [alt]="item.title" />
            <span class="item-card-title">{{ item.title }}</span>
            <span class="item-card-artist">{{ item.artist }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxHorizontalExample {
  readonly collection: ListCollection<Album> = createListCollection<Album>({
    items: [
      {
        title: 'Midnight Dreams',
        artist: 'Luna Ray',
        image: 'https://picsum.photos/seed/album1/300/300',
      },
      {
        title: 'Neon Skyline',
        artist: 'The Electric',
        image: 'https://picsum.photos/seed/album2/300/300',
      },
      {
        title: 'Acoustic Sessions',
        artist: 'Sarah Woods',
        image: 'https://picsum.photos/seed/album3/300/300',
      },
      {
        title: 'Urban Echoes',
        artist: 'Metro Collective',
        image: 'https://picsum.photos/seed/album4/300/300',
      },
      {
        title: 'Summer Vibes',
        artist: 'Coastal Waves',
        image: 'https://picsum.photos/seed/album5/300/300',
      },
    ],
    itemToValue: (item) => item.title,
    itemToString: (item) => item.title,
  })
}

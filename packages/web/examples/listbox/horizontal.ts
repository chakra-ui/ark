import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

interface Album {
  title: string
  artist: string
  image: string
}

const albums: Album[] = [
  { title: 'Midnight Dreams', artist: 'Luna Ray', image: 'https://picsum.photos/seed/album1/300/300' },
  { title: 'Neon Skyline', artist: 'The Electric', image: 'https://picsum.photos/seed/album2/300/300' },
  { title: 'Acoustic Sessions', artist: 'Sarah Woods', image: 'https://picsum.photos/seed/album3/300/300' },
  { title: 'Urban Echoes', artist: 'Metro Collective', image: 'https://picsum.photos/seed/album4/300/300' },
  { title: 'Summer Vibes', artist: 'Coastal Waves', image: 'https://picsum.photos/seed/album5/300/300' },
]

const albumItem = ({ title, artist, image }: Album) => /* html */ `
  <ark-listbox-item class="${styles.ItemCard}" value="${title}">
    <ark-listbox-item-indicator class="${styles.ItemCardIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
    <img class="${styles.ItemCardImage}" src="${image}" alt="${title}" />
    <ark-listbox-item-text class="${styles.ItemCardTitle}">${title}</ark-listbox-item-text>
    <span class="${styles.ItemCardArtist}">${artist}</span>
  </ark-listbox-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}" orientation="horizontal">
    <ark-listbox-label class="${styles.Label}">Select Album</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${albums.map((album) => albumItem(album)).join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}

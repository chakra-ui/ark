import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const listbox = (attrs: string, label: string, list: string, data = '') => /* html */ `
  <ark-listbox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${list}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

const albums = [
  { title: 'Midnight Dreams', artist: 'Luna Ray', image: 'https://picsum.photos/seed/album1/300/300' },
  { title: 'Neon Skyline', artist: 'The Electric', image: 'https://picsum.photos/seed/album2/300/300' },
  { title: 'Acoustic Sessions', artist: 'Sarah Woods', image: 'https://picsum.photos/seed/album3/300/300' },
  { title: 'Urban Echoes', artist: 'Metro Collective', image: 'https://picsum.photos/seed/album4/300/300' },
  { title: 'Summer Vibes', artist: 'Coastal Waves', image: 'https://picsum.photos/seed/album5/300/300' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    'orientation="horizontal"',
    'Select Album',
    albums
      .map(
        (album) => /* html */ `
        <ark-listbox-item class="${styles.ItemCard}" value="${album.title}">
          <ark-listbox-item-indicator class="${styles.ItemCardIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
          <img class="${styles.ItemCardImage}" src="${album.image}" alt="${album.title}" />
          <ark-listbox-item-text class="${styles.ItemCardTitle}">${album.title}</ark-listbox-item-text>
          <span class="${styles.ItemCardArtist}">${album.artist}</span>
        </ark-listbox-item>`,
      )
      .join(''),
  )
}

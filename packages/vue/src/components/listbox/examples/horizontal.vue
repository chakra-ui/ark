<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
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
</script>

<template>
  <Listbox.Root :class="styles.Root" :collection="collection" orientation="horizontal">
    <Listbox.Label :class="styles.Label">Select Album</Listbox.Label>
    <Listbox.Content :class="styles.Content">
      <Listbox.Item v-for="item in collection.items" :key="item.title" :class="styles.ItemCard" :item="item">
        <Listbox.ItemIndicator :class="styles.ItemCardIndicator">
          <CheckIcon />
        </Listbox.ItemIndicator>
        <img :class="styles.ItemCardImage" :src="item.image" :alt="item.title" />
        <span :class="styles.ItemCardTitle">{{ item.title }}</span>
        <span :class="styles.ItemCardArtist">{{ item.artist }}</span>
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>

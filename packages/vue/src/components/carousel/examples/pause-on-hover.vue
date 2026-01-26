<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]
</script>

<template>
  <Carousel.Root :class="styles.Root" :slide-count="images.length" autoplay loop>
    <Carousel.Control :class="styles.Control">
      <Carousel.Context v-slot="api">
        <span :class="styles.StatusText">Autoplay is: {{ api.isPlaying ? 'playing' : 'paused' }}</span>
      </Carousel.Context>
    </Carousel.Control>
    <Carousel.Context v-slot="api">
      <Carousel.ItemGroup :class="styles.ItemGroup" @pointerover="api.pause()" @pointerleave="api.play()">
        <Carousel.Item v-for="(image, index) in images" :key="index" :class="styles.Item" :index="index">
          <img :src="image.src" :alt="image.alt" width="500" height="300" />
        </Carousel.Item>
      </Carousel.ItemGroup>
    </Carousel.Context>
    <Carousel.IndicatorGroup :class="styles.IndicatorGroup">
      <Carousel.Indicator v-for="(_, index) in images" :key="index" :class="styles.Indicator" :index="index" />
    </Carousel.IndicatorGroup>
  </Carousel.Root>
</template>

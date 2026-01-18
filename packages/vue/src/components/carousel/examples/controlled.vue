<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/carousel.module.css'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]
const page = ref(0)
</script>

<template>
  <div>
    <div>Current page: {{ page }}</div>
    <Carousel.Root :class="styles.Root" v-model:page="page" :slide-count="images.length">
      <Carousel.Control :class="styles.Control">
        <Carousel.PrevTrigger :class="styles.Trigger">
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.ItemGroup :class="styles.ItemGroup">
          <Carousel.Item v-for="(image, index) in images" :key="index" :class="styles.Item" :index="index">
            <img :src="image.src" :alt="image.alt" width="500" height="300" />
          </Carousel.Item>
        </Carousel.ItemGroup>
        <Carousel.NextTrigger :class="styles.Trigger">
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup :class="styles.IndicatorGroup">
        <Carousel.Indicator v-for="(_, index) in images" :key="index" :class="styles.Indicator" :index="index" />
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  </div>
</template>

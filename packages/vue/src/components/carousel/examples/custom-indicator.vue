<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
</script>

<template>
  <Carousel.Root :slide-count="images.length">
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(image, idx) in images" :key="idx" :index="idx">
        <img :src="image" alt="" :style="{ height: '300px', width: '100%', objectFit: 'cover' }" />
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.Context v-slot="api">
      <Carousel.IndicatorGroup :style="{ display: 'flex', gap: '8px', marginTop: '16px' }">
        <Carousel.Indicator v-for="(image, idx) in images" :key="idx" :index="idx">
          <img
            :src="image"
            :alt="`Thumbnail ${idx}`"
            :style="{
              width: '60px',
              height: '40px',
              objectFit: 'cover',
              cursor: 'pointer',
              border: api.page === idx ? '2px solid #0066ff' : '2px solid transparent',
              borderRadius: '4px',
              opacity: api.page === idx ? 1 : 0.6,
              transition: 'all 0.2s',
            }"
          />
        </Carousel.Indicator>
      </Carousel.IndicatorGroup>
    </Carousel.Context>
  </Carousel.Root>
</template>

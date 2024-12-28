<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
</script>

<template>
  <Carousel.Root autoplay loop>
    <Carousel.Control>
      <Carousel.AutoplayTrigger>
        <Carousel.Context v-slot="context">
            {{ context.isPlaying ? 'Pause' : 'Play' }}
        </Carousel.Context>
      </Carousel.AutoplayTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="(_, idx) in images" :key="idx" :index="idx" />
    </Carousel.IndicatorGroup>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(image, idx) in images" :key="idx" :index="idx">
        <img :src="image" alt="" />
      </Carousel.Item>
    </Carousel.ItemGroup>
  </Carousel.Root>
</template>

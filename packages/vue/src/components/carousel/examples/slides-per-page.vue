<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-vue-next'
import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 })
</script>

<template>
  <Carousel.Root :class="styles.Root" :slide-count="slides.length" :slides-per-page="2" spacing="20px">
    <Carousel.Control :class="styles.Control">
      <Carousel.PrevTrigger :class="styles.Trigger">
        <ArrowLeftIcon />
      </Carousel.PrevTrigger>
      <Carousel.NextTrigger :class="styles.Trigger">
        <ArrowRightIcon />
      </Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup :class="styles.ItemGroup">
      <Carousel.Item v-for="(_, index) in slides" :key="index" :class="styles.Item" :index="index">
        <div :class="styles.Slide">Slide {{ index + 1 }}</div>
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.Context v-slot="api">
      <Carousel.IndicatorGroup :class="styles.IndicatorGroup">
        <Carousel.Indicator
          v-for="(_, index) in api.pageSnapPoints"
          :key="index"
          :class="styles.Indicator"
          :index="index"
        />
      </Carousel.IndicatorGroup>
    </Carousel.Context>
  </Carousel.Root>
</template>

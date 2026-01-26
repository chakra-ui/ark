<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/carousel.module.css'

const slides = ref([0, 1, 2, 3, 4])

const addSlide = () => {
  const max = Math.max(...slides.value)
  slides.value = [...slides.value, max + 1]
}
</script>

<template>
  <div>
    <button :class="button.Root" @click="addSlide">Add Slide</button>
    <Carousel.Root :class="styles.Root" :slide-count="slides.length">
      <Carousel.ItemGroup :class="styles.ItemGroup">
        <Carousel.Item v-for="(slide, index) in slides" :key="index" :class="styles.Item" :index="index">
          <div :class="styles.Slide">Slide {{ slide + 1 }}</div>
        </Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Control :class="styles.Control" data-align="center">
        <Carousel.PrevTrigger :class="styles.Trigger">
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup :class="styles.IndicatorGroup">
          <Carousel.Indicator v-for="(_, index) in slides" :key="index" :class="styles.Indicator" :index="index" />
        </Carousel.IndicatorGroup>
        <Carousel.NextTrigger :class="styles.Trigger">
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  </div>
</template>

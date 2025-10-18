<script setup lang="ts">
import Autoplay from './examples/autoplay.vue'
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import CustomIndicator from './examples/custom-indicator.vue'
import DynamicSlides from './examples/dynamic-slides.vue'
import PauseOnHover from './examples/pause-on-hover.vue'
import RootProvider from './examples/root-provider.vue'
import ScrollTo from './examples/scroll-to.vue'
import SlidesPerPage from './examples/slides-per-page.vue'
import Vertical from './examples/vertical.vue'
</script>
<template>
  <Story title="Carousel">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="CustomIndicator">
      <CustomIndicator />
    </Variant>
    <Variant title="DynamicSlides">
      <DynamicSlides />
    </Variant>
    <Variant title="PauseOnHover">
      <PauseOnHover />
    </Variant>
    <Variant title="Autoplay">
      <Autoplay />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="ScrollTo">
      <ScrollTo />
    </Variant>
    <Variant title="SlidesPerPage">
      <SlidesPerPage />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import Arrow from './examples/arrow.vue'
import Basic from './examples/basic.vue'
import CloseBehavior from './examples/close-behavior.vue'
import Controlled from './examples/controlled.vue'
import Modal from './examples/modal.vue'
import OnOpenChange from './examples/on-open-change.vue'
import Portalled from './examples/portalled.vue'
import Positioning from './examples/positioning.vue'
import RenderFn from './examples/render-fn.vue'
</script>
<template>
  <Story title="Popover">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Portalled">
      <Portalled />
    </Variant>
    <Variant title="OnOpenChange">
      <OnOpenChange />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
    <Variant title="Arrow">
      <Arrow />
    </Variant>
    <Variant title="CloseBehavior">
      <CloseBehavior />
    </Variant>
    <Variant title="Positioning">
      <Positioning />
    </Variant>
    <Variant title="Modal">
      <Modal />
    </Variant>
  </Story>
</template>

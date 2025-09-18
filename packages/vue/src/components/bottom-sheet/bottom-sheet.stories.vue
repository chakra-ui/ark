<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Modal from './examples/modal.vue'
import RootProvider from './examples/root-provider.vue'
import SnapPoints from './examples/snap-points.vue'
import Scrollable from './examples/scrollable.vue'
import NoDragArea from './examples/no-drag-area.vue'
import nonDraggable from './examples/non-draggable.vue'
</script>

<template>
  <Story title="BottomSheet">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Modal">
      <Modal />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="SnapPoints">
      <SnapPoints />
    </Variant>
    <Variant title="Scrollable">
      <Scrollable />
    </Variant>
    <Variant title="NoDragArea">
      <NoDragArea />
    </Variant>
    <Variant title="NonDraggable">
      <nonDraggable />
    </Variant>
  </Story>
</template>

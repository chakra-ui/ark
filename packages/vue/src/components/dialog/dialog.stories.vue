<script setup lang="ts">
import AlertDialog from './examples/alert-dialog.vue'
import Basic from './examples/basic.vue'
import CloseOnEscape from './examples/close-on-escape.vue'
import CloseOnInteractOutside from './examples/close-on-interact-outside.vue'
import Confirmation from './examples/confirmation.vue'
import Controlled from './examples/controlled.vue'
import FinalFocus from './examples/final-focus.vue'
import InitialFocus from './examples/initial-focus.vue'
import LazyMount from './examples/lazy-mount.vue'
import Nested from './examples/nested.vue'
import NonModal from './examples/non-modal.vue'
import RenderFn from './examples/render-fn.vue'
import RootProvider from './examples/root-provider.vue'
</script>
<template>
  <Story title="Dialog">
    <Variant title="AlertDialog">
      <AlertDialog />
    </Variant>
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="CloseOnEscape">
      <CloseOnEscape />
    </Variant>
    <Variant title="CloseOnInteractOutside">
      <CloseOnInteractOutside />
    </Variant>
    <Variant title="Confirmation">
      <Confirmation />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="FinalFocus">
      <FinalFocus />
    </Variant>
    <Variant title="InitialFocus">
      <InitialFocus />
    </Variant>
    <Variant title="LazyMount">
      <LazyMount />
    </Variant>
    <Variant title="Nested">
      <Nested />
    </Variant>
    <Variant title="NonModal">
      <NonModal />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>

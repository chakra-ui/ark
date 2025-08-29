<script setup lang="ts">
import Action from './examples/action.vue'
import Basic from './examples/basic.vue'
import Duration from './examples/duration.vue'
import MaxToasts from './examples/max-toasts.vue'
import PromiseToast from './examples/promise-toast.vue'
import Types from './examples/types.vue'
import Update from './examples/update.vue'
</script>

<template>
  <Story title="Toast">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Duration">
      <Duration />
    </Variant>
    <Variant title="MaxToasts">
      <MaxToasts />
    </Variant>
    <Variant title="PromiseToast">
      <PromiseToast />
    </Variant>
    <Variant title="Types">
      <Types />
    </Variant>
    <Variant title="Action">
      <Action />
    </Variant>
    <Variant title="Update">
      <Update />
    </Variant>
  </Story>
</template>

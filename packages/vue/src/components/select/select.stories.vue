<script setup lang="ts">
import Async from './examples/async.vue'
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import FormLibrary from './examples/form-library.vue'
import Grouping from './examples/grouping.vue'
import LazyMount from './examples/lazy-mount.vue'
import MaxSelected from './examples/max-selected.vue'
import Multiple from './examples/multiple.vue'
import ReactiveCollection from './examples/reactive-collection.vue'
import RootProvider from './examples/root-provider.vue'
import SelectOnHighlight from './examples/select-on-highlight.vue'
import WithField from './examples/with-field.vue'
</script>

<template>
  <Story title="Select">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Async">
      <Async />
    </Variant>
    <Variant title="Grouping">
      <Grouping />
    </Variant>
    <Variant title="Multiple">
      <Multiple />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Form Library">
      <FormLibrary />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="Reactive Collection">
      <ReactiveCollection />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="Select On Highlight">
      <SelectOnHighlight />
    </Variant>
    <Variant title="Max Selected">
      <MaxSelected />
    </Variant>
    <Variant title="Lazy Mount">
      <LazyMount />
    </Variant>
  </Story>
</template>

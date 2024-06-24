<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Disabled from './examples/disabled.vue'
import FormUsage from './examples/form-usage.vue'
import HalfRatings from './examples/half-ratings.vue'
import InitialValue from './examples/initial-value.vue'
import ReadOnly from './examples/read-only.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="RatingGroup">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="HalfRatings">
      <HalfRatings />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="ReadOnly">
      <ReadOnly />
    </Variant>
    <Variant title="FormUsage">
      <FormUsage />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
  </Story>
</template>

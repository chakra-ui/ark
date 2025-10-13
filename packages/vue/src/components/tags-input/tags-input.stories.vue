<script setup lang="ts">
import Basic from './examples/basic.vue'
import BlurBehavior from './examples/blur-behavior.vue'
import Controlled from './examples/controlled.vue'
import ControlledInputValue from './examples/controlled-input-value.vue'
import Delimiter from './examples/delimiter.vue'
import Disabled from './examples/disabled.vue'
import DisabledEditing from './examples/disabled-editing.vue'
import InitialValue from './examples/initial-value.vue'
import Invalid from './examples/invalid.vue'
import MaxTagLength from './examples/max-tag-length.vue'
import MaxWithOverflow from './examples/max-with-overflow.vue'
import OnEvent from './examples/on-event.vue'
import PasteBehavior from './examples/paste-behavior.vue'
import ProgrammaticControl from './examples/programmatic-control.vue'
import Readonly from './examples/readonly.vue'
import RootProvider from './examples/root-provider.vue'
import Validation from './examples/validation.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="TagsInput">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="BlurBehavior">
      <BlurBehavior />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="ControlledInputValue">
      <ControlledInputValue />
    </Variant>
    <Variant title="Delimiter">
      <Delimiter />
    </Variant>
    <Variant title="Disabled">
      <Disabled />
    </Variant>
    <Variant title="DisabledEditing">
      <DisabledEditing />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="Invalid">
      <Invalid />
    </Variant>
    <Variant title="MaxTagLength">
      <MaxTagLength />
    </Variant>
    <Variant title="MaxWithOverflow">
      <MaxWithOverflow />
    </Variant>
    <Variant title="OnEvent">
      <OnEvent />
    </Variant>
    <Variant title="PasteBehavior">
      <PasteBehavior />
    </Variant>
    <Variant title="ProgrammaticControl">
      <ProgrammaticControl />
    </Variant>
    <Variant title="Readonly">
      <Readonly />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
    <Variant title="Validation">
      <Validation />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
  </Story>
</template>

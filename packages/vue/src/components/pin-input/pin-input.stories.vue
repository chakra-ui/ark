<script setup lang="ts">
import Basic from './examples/basic.vue'
import Blurred from './examples/blurred.vue'
import Customized from './examples/customized.vue'
import InitialValue from './examples/initial-value.vue'
import OTPMode from './examples/otp-mode.vue'
import RootProvider from './examples/root-provider.vue'
import WithField from './examples/with-field.vue'
import WithMask from './examples/with-mask.vue'
</script>
<template>
  <Story title="PinInput">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="Customized">
      <Customized />
    </Variant>
    <Variant title="Blurred">
      <Blurred />
    </Variant>
    <Variant title="OTPMode">
      <OTPMode />
    </Variant>
    <Variant title="WithMask">
      <WithMask />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>

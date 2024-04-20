<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Group from './examples/group.vue'
import Options from './examples/options.vue'
import Separator from './examples/separator.vue'
</script>
<template>
<Story title="Menu">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Group">
      <Group />
    </Variant>
    <Variant title="Separator">
      <Separator />
    </Variant>
    <Variant title="Options">
      <Options />
    </Variant>
</Story>
</template>

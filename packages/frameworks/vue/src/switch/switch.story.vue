<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from './'
import './switch.css'

const checked = ref(false)
</script>

<template>
  <Story title="Switch">
    <Variant title="Basic">
      <Switch.Root>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Label</Switch.Label>
      </Switch.Root>
    </Variant>

    <Variant title="InitialValue">
      <Switch.Root :model-value="true">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Label</Switch.Label>
      </Switch.Root>
    </Variant>

    <Variant title="Controlled">
      <Switch.Root v-model="checked">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Label</Switch.Label>
      </Switch.Root>
    </Variant>

    <Variant title="Disabled">
      <Switch.Root disabled>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Label</Switch.Label>
      </Switch.Root>
    </Variant>

    <Variant title="RenderProp">
      <Switch.Root #default="api">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Feature is {{ api.isChecked ? 'enabled' : 'disabled' }}</Switch.Label>
      </Switch.Root>
    </Variant>
  </Story>
</template>

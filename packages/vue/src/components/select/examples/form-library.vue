<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { useForm, useField } from 'vee-validate'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'
import button from 'styles/button.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

const { handleSubmit, values } = useForm({
  initialValues: {
    framework: 'vue',
  },
})

const { value: framework, setValue } = useField<string>('framework')

const onSubmit = handleSubmit((values) => {
  window.alert(JSON.stringify(values))
})
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem">Value is {{ values.framework }}</div>
    <form @submit="onSubmit">
      <Select.Root
        :class="styles.Root"
        :collection="frameworks"
        :model-value="framework ? [framework] : []"
        @value-change="(e) => setValue(e.value[0])"
      >
        <Select.Label :class="styles.Label">Framework</Select.Label>
        <Select.Control :class="styles.Control">
          <Select.Trigger :class="styles.Trigger">
            <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
          </Select.Trigger>
          <div :class="styles.Indicators">
            <Select.ClearTrigger :class="styles.ClearTrigger">
              <XIcon />
            </Select.ClearTrigger>
            <Select.Indicator :class="styles.Indicator">
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </div>
        </Select.Control>
        <Teleport to="body">
          <Select.Positioner>
            <Select.Content :class="styles.Content">
              <Select.ItemGroup :class="styles.ItemGroup">
                <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Frameworks</Select.ItemGroupLabel>
                <Select.Item v-for="item in frameworks.items" :key="item.value" :item="item" :class="styles.Item">
                  <Select.ItemText :class="styles.ItemText">{{ item.label }}</Select.ItemText>
                  <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
                </Select.Item>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Teleport>
        <Select.HiddenSelect name="framework" />
      </Select.Root>
      <button :class="button.Root" style="margin-top: 1rem" type="submit">Submit</button>
    </form>
  </div>
</template>

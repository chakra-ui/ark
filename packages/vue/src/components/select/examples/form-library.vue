<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { useForm, useField } from 'vee-validate'
import { ChevronDownIcon } from 'lucide-vue-next'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})

const { handleSubmit, values } = useForm({
  initialValues: {
    framework: 'Vue',
  },
})

const { value: framework, setValue } = useField<string>('framework')

const onSubmit = handleSubmit((values) => {
  window.alert(JSON.stringify(values))
})
</script>

<template>
  <div>
    <div>Value is {{ values.framework }}</div>
    <form @submit="onSubmit">
      <Select.Root
        :collection="collection"
        :model-value="framework ? [framework] : []"
        @value-change="(e) => setValue(e.value[0])"
      >
        <Select.Label>Framework</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <Select.Indicator>
              <ChevronDownIcon />
            </Select.Indicator>
          </Select.Trigger>
          <Select.ClearTrigger>Clear</Select.ClearTrigger>
        </Select.Control>
        <Teleport to="body">
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                <Select.Item v-for="item in collection.items" :key="item" :item="item">
                  <Select.ItemText>{{ item }}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Teleport>
        <Select.HiddenSelect name="framework" />
      </Select.Root>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { useForm } from '@tanstack/vue-form'
import { ChevronDownIcon } from 'lucide-vue-next'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})

const form = useForm({
  defaultValues: {
    framework: 'Vue',
  },
  onSubmit: async ({ value }) => {
    window.alert(JSON.stringify(value))
  },
})
</script>

<template>
  <div>
    <div>Value is {{ form.state.values.framework }}</div>
    <form
      @submit="
        (e) => {
          e.preventDefault()
          form.handleSubmit()
        }
      "
    >
      <form.Field name="framework">
        <template #default="{ field }">
          <Select.Root
            :collection="collection"
            :model-value="field.state.value ? [field.state.value] : []"
            @value-change="(e) => field.handleChange(e.value[0])"
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
            <Select.HiddenSelect :name="field.name" />
          </Select.Root>
        </template>
      </form.Field>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Fieldset } from '@ark-ui/vue/fieldset'
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ref } from 'vue'

const extensions = createListCollection({
  items: ['+1', '+44', '+49', '+41'],
})

const inputRef = ref<{ $el: HTMLInputElement | null } | null>(null)

const focusInput = () => {
  setTimeout(() => {
    inputRef.value?.$el?.focus()
  })
}
</script>

<template>
  <Fieldset.Root style="border: 0; padding: 0">
    <Fieldset.Legend @click="focusInput">Mobile Number</Fieldset.Legend>
    <div style="display: flex; align-items: flex-start">
      <Field.Root>
        <Select.Root :collection="extensions" :default-value="['+1']" @value-change="focusInput">
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select" />
            </Select.Trigger>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              <Select.Item v-for="item in extensions" :key="item" :item="item">
                <Select.ItemText>{{ item }}</Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Positioner>

          <Select.HiddenSelect />
        </Select.Root>
      </Field.Root>

      <Field.Root>
        <Field.Input ref="inputRef" />
      </Field.Root>
    </div>
  </Fieldset.Root>
</template>

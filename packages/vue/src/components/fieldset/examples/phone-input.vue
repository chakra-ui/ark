<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Fieldset } from '@ark-ui/vue/fieldset'
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'
import select from 'styles/select.module.css'

const extensions = createListCollection({
  items: [
    { label: '+1', value: '+1' },
    { label: '+44', value: '+44' },
    { label: '+49', value: '+49' },
    { label: '+41', value: '+41' },
  ],
})

const inputRef = ref<{ $el: HTMLInputElement | null } | null>(null)

const focusInput = () => {
  setTimeout(() => {
    inputRef.value?.$el?.focus()
  })
}
</script>

<template>
  <Fieldset.Root :class="styles.Root">
    <Fieldset.Legend :class="styles.Legend" @click="focusInput">Mobile Number</Fieldset.Legend>
    <div style="display: flex; align-items: flex-start; gap: 0.5rem">
      <Field.Root>
        <Select.Root :class="select.Root" :collection="extensions" :default-value="['+1']" @value-change="focusInput">
          <Select.Control :class="select.Control">
            <Select.Trigger :class="select.Trigger">
              <Select.ValueText placeholder="Select" />
              <ChevronsUpDownIcon />
            </Select.Trigger>
          </Select.Control>

          <Select.Positioner>
            <Select.Content :class="select.Content">
              <Select.Item v-for="item in extensions.items" :key="item.value" :class="select.Item" :item="item">
                <Select.ItemText :class="select.ItemText">{{ item.label }}</Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Positioner>

          <Select.HiddenSelect />
        </Select.Root>
      </Field.Root>

      <Field.Root :class="field.Root">
        <Field.Input ref="inputRef" :class="field.Input" />
      </Field.Root>
    </div>
  </Fieldset.Root>
</template>

<script setup lang="ts">
import { Listbox, createListCollection, useListboxContext } from '@ark-ui/vue/listbox'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import styles from 'styles/listbox.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt.js', value: 'nuxtjs' },
    { label: 'Remix', value: 'remix' },
    { label: 'Gatsby', value: 'gatsby' },
  ],
})
</script>

<template>
  <Listbox.Root :class="styles.Root" :collection="frameworks" selectionMode="multiple">
    <SelectAllHeader :frameworks="frameworks" />
    <Listbox.Content :class="styles.Content">
      <Listbox.Item v-for="item in frameworks.items" :key="item.value" :class="styles.Item" :item="item">
        <Listbox.ItemText :class="styles.ItemText">{{ item.label }}</Listbox.ItemText>
        <Listbox.ItemIndicator :class="styles.ItemIndicator">
          <CheckIcon />
        </Listbox.ItemIndicator>
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>

<script lang="ts">
import type { ListCollection } from '@ark-ui/vue/collection'

const SelectAllHeader = {
  props: {
    frameworks: {
      type: Object as () => ListCollection<{ label: string; value: string }>,
      required: true,
    },
  },
  setup(props: { frameworks: ListCollection<{ label: string; value: string }> }) {
    const listbox = useListboxContext()

    const isAllSelected = computed(() => listbox.value.value.length === props.frameworks.items.length)
    const isSomeSelected = computed(
      () => listbox.value.value.length > 0 && listbox.value.value.length < props.frameworks.items.length,
    )

    const handleSelectAll = () => {
      if (isAllSelected.value) {
        listbox.value.setValue([])
      } else {
        listbox.value.setValue(props.frameworks.items.map((item) => item.value))
      }
    }

    return { isAllSelected, isSomeSelected, handleSelectAll, styles }
  },
  components: { CheckIcon, MinusIcon },
  template: `
    <button :class="styles.SelectAllHeader" type="button" @click="handleSelectAll">
      <span :class="styles.SelectAllHeaderIndicator">
        <CheckIcon v-if="isAllSelected" />
        <MinusIcon v-else-if="isSomeSelected" />
      </span>
      <span :class="styles.Label">Select All</span>
    </button>
  `,
}
</script>

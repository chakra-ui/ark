<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection'
import { useFilter } from '@ark-ui/vue/locale'
import { Menu, type MenuRootEmits, type MenuRootProps } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue'
import { ref } from 'vue'

const props = withDefaults(defineProps<MenuRootProps>(), {
  autoHighlight: undefined,
  closeOnSelect: undefined,
  composite: undefined,
  defaultOpen: undefined,
  loopFocus: undefined,
  open: undefined,
  typeahead: undefined,
})
const emits = defineEmits<MenuRootEmits>()
const localProps = useForwardPropsEmits(props, emits)

const actions = [
  { label: 'New file', value: 'new-file' },
  { label: 'Save', value: 'save' },
  { label: 'Save as', value: 'save-as' },
  { label: 'Rename', value: 'rename' },
]

const { contains } = useFilter({ sensitivity: 'base' })
const query = ref('')
const checked = ref(false)
const { collection, filter } = useListCollection({ initialItems: actions, filter: contains })

const handleQueryChange = (value: string) => {
  query.value = value
  filter(value)
}
</script>

<template>
  <Menu.Root v-bind="localProps" :composite="false" @open-change="(details) => !details.open && handleQueryChange('')">
    <Menu.Trigger>Actions</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Input
          aria-label="Filter actions"
          :value="query"
          @input="(event: Event) => handleQueryChange((event.target as HTMLInputElement).value)"
        />
        <div v-if="collection.size === 0">No actions found</div>
        <Menu.List>
          <Menu.Item v-for="item in collection.items" :key="item.value" :value="item.value">
            {{ item.label }}
          </Menu.Item>
          <Menu.CheckboxItem value="offline" :close-on-select="false" v-model:checked="checked">
            <Menu.ItemText>Keep offline</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>

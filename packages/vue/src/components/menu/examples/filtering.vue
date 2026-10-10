<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection'
import { useFilter } from '@ark-ui/vue/locale'
import { Menu } from '@ark-ui/vue/menu'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-vue-next'
import { Teleport, computed, ref } from 'vue'
import styles from 'styles/menu.module.css'

const actions = [
  { label: 'New file', value: 'new-file', group: 'File' },
  { label: 'Open file', value: 'open-file', group: 'File' },
  { label: 'Save', value: 'save', group: 'File' },
  { label: 'Save as', value: 'save-as', group: 'File' },
  { label: 'Rename', value: 'rename', group: 'File' },
  { label: 'Duplicate', value: 'duplicate', group: 'Organize' },
  { label: 'Move to trash', value: 'trash', group: 'Organize' },
  { label: 'Download a copy', value: 'download', group: 'Organize' },
  { label: 'Share link', value: 'share', group: 'Share' },
  { label: 'Invite people', value: 'invite', group: 'Share' },
]

const viewItems = [
  { label: 'Show details', value: 'details' },
  { label: 'Show sidebar', value: 'sidebar' },
  { label: 'Keep available offline', value: 'offline' },
]

const { contains } = useFilter({ sensitivity: 'base' })
const inputRef = ref<{ $el: HTMLInputElement } | null>(null)
const query = ref('')
const view = ref<string[]>(['details'])

const { collection, filter } = useListCollection({
  initialItems: actions,
  filter: contains,
  groupBy: (item) => item.group,
})

const viewOptions = computed(() => viewItems.filter((item) => contains(item.label, query.value)))

const handleQueryChange = (value: string) => {
  query.value = value
  filter(value)
}

const toggleView = (value: string, checked: boolean) => {
  view.value = checked ? [...view.value, value] : view.value.filter((v) => v !== value)
}
</script>

<template>
  <Menu.Root :composite="false" @exit-complete="handleQueryChange('')">
    <Menu.Trigger :class="styles.Trigger">
      Actions
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <div :class="styles.InputControl">
            <Menu.Input
              ref="inputRef"
              :class="styles.Input"
              aria-label="Filter actions"
              placeholder="Search actions..."
              :value="query"
              @input="(event: Event) => handleQueryChange((event.target as HTMLInputElement).value)"
            />
            <button
              v-if="query"
              type="button"
              :class="styles.InputClear"
              tabindex="-1"
              aria-hidden="true"
              @click="
                () => {
                  handleQueryChange('')
                  inputRef?.$el.focus()
                }
              "
            >
              <XIcon />
            </button>
          </div>
          <div v-if="collection.size === 0 && viewOptions.length === 0" :class="styles.Empty">No actions found</div>
          <Menu.List :class="styles.List">
            <Menu.ItemGroup v-for="[group, items] in collection.group()" :key="group" :class="styles.ItemGroup">
              <Menu.ItemGroupLabel :class="styles.ItemGroupLabel">{{ group }}</Menu.ItemGroupLabel>
              <Menu.Item v-for="item in items" :key="item.value" :class="styles.Item" :value="item.value">
                {{ item.label }}
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup v-if="viewOptions.length > 0" :class="styles.ItemGroup">
              <Menu.ItemGroupLabel :class="styles.ItemGroupLabel">View</Menu.ItemGroupLabel>
              <Menu.CheckboxItem
                v-for="item in viewOptions"
                :key="item.value"
                :class="styles.CheckboxItem"
                :value="item.value"
                :close-on-select="false"
                :checked="view.includes(item.value)"
                @update:checked="(checked: boolean) => toggleView(item.value, checked)"
              >
                <Menu.ItemIndicator :class="styles.ItemIndicator">
                  <CheckIcon />
                </Menu.ItemIndicator>
                <Menu.ItemText :class="styles.ItemText">{{ item.label }}</Menu.ItemText>
              </Menu.CheckboxItem>
            </Menu.ItemGroup>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>

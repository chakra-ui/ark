<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection'
import { useFilter } from '@ark-ui/vue/locale'
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Teleport, computed, ref } from 'vue'
import styles from 'styles/menu.module.css'

const fileActions = [
  { label: 'Rename', value: 'rename' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Download a copy', value: 'download' },
  { label: 'Delete', value: 'delete' },
]

const folders = [
  { label: 'Inbox', value: 'inbox' },
  { label: 'Projects', value: 'projects' },
  { label: 'Archive', value: 'archive' },
  { label: 'Design reviews', value: 'design-reviews' },
  { label: 'Personal', value: 'personal' },
  { label: 'Receipts', value: 'receipts' },
]

const sharingOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Message', value: 'message' },
  { label: 'Copy link', value: 'copy-link' },
]

const { contains } = useFilter({ sensitivity: 'base' })
const query = ref('')
const folderQuery = ref('')

const actionList = useListCollection({ initialItems: fileActions, filter: contains })
const folderList = useListCollection({ initialItems: folders, filter: contains })

const handleQueryChange = (value: string) => {
  query.value = value
  actionList.filter(value)
}

const handleFolderQueryChange = (value: string) => {
  folderQuery.value = value
  folderList.filter(value)
}

const showMoveTo = computed(() => contains('Move to folder', query.value))
const showShare = computed(() => contains('Share', query.value))
const isEmpty = computed(() => actionList.collection.value.size === 0 && !showMoveTo.value && !showShare.value)
</script>

<template>
  <Menu.Root :composite="false" @exit-complete="handleQueryChange('')">
    <Menu.Trigger :class="styles.Trigger">
      File
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content :class="styles.Content">
          <Menu.Input
            :class="styles.Input"
            aria-label="Filter actions"
            placeholder="Search actions..."
            :value="query"
            @input="(event: Event) => handleQueryChange((event.target as HTMLInputElement).value)"
          />
          <div v-if="isEmpty" :class="styles.Empty">No actions found</div>
          <Menu.List :class="styles.List">
            <Menu.Item
              v-for="item in actionList.collection.value.items"
              :key="item.value"
              :class="styles.Item"
              :value="item.value"
            >
              {{ item.label }}
            </Menu.Item>
            <Menu.Root v-if="showMoveTo" :composite="false" @exit-complete="handleFolderQueryChange('')">
              <Menu.TriggerItem :class="styles.TriggerItem">Move to folder</Menu.TriggerItem>
              <Teleport to="body">
                <Menu.Positioner>
                  <Menu.Content :class="styles.Content">
                    <Menu.Input
                      :class="styles.Input"
                      aria-label="Filter folders"
                      placeholder="Search folders..."
                      :value="folderQuery"
                      @input="(event: Event) => handleFolderQueryChange((event.target as HTMLInputElement).value)"
                    />
                    <div v-if="folderList.collection.value.size === 0" :class="styles.Empty">No folders found</div>
                    <Menu.List :class="styles.List">
                      <Menu.Item
                        v-for="item in folderList.collection.value.items"
                        :key="item.value"
                        :class="styles.Item"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Menu.Item>
                    </Menu.List>
                  </Menu.Content>
                </Menu.Positioner>
              </Teleport>
            </Menu.Root>
            <Menu.Root v-if="showShare">
              <Menu.TriggerItem :class="styles.TriggerItem">Share</Menu.TriggerItem>
              <Teleport to="body">
                <Menu.Positioner>
                  <Menu.Content :class="styles.Content">
                    <Menu.Item
                      v-for="option in sharingOptions"
                      :key="option.value"
                      :class="styles.Item"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Teleport>
            </Menu.Root>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>

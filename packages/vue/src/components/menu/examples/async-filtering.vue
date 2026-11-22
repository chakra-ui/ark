<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { Menu } from '@ark-ui/vue/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/menu.module.css'

const people = [
  'Ada Lovelace',
  'Alan Turing',
  'Barbara Liskov',
  'Dennis Ritchie',
  'Grace Hopper',
  'Katherine Johnson',
  'Ken Thompson',
  'Linus Torvalds',
  'Margaret Hamilton',
  'Tim Berners-Lee',
]

const assignee = ref('')

const list = useAsyncList<string>({
  initialItems: people,
  async load({ filter, signal }) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    if (signal?.aborted) return { items: [] }
    const query = filter?.toLowerCase() ?? ''
    return { items: people.filter((person) => person.toLowerCase().includes(query)) }
  },
})
</script>

<template>
  <Menu.Root popupType="dialog" @exit-complete="list.setFilter('')">
    <Menu.Trigger :class="styles.Trigger">
      {{ assignee || 'Assign' }}
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner :class="styles.Positioner">
        <Menu.Content :class="styles.Content">
          <Menu.Input
            :class="styles.Input"
            aria-label="Search people"
            placeholder="Search people..."
            :value="list.filter ?? ''"
            @input="(event: Event) => list.setFilter((event.target as HTMLInputElement).value)"
          />
          <div v-if="list.isLoading" :class="styles.Empty">Searching...</div>
          <div v-if="!list.isLoading && list.items.length === 0" :class="styles.Empty">No people found</div>
          <Menu.List :class="styles.List">
            <Menu.RadioItemGroup :class="styles.ItemGroup" v-model="assignee">
              <Menu.RadioItem v-for="person in list.items" :key="person" :class="styles.RadioItem" :value="person">
                <Menu.ItemIndicator :class="styles.ItemIndicator">
                  <CheckIcon />
                </Menu.ItemIndicator>
                <Menu.ItemText :class="styles.ItemText">{{ person }}</Menu.ItemText>
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>

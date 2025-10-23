<script setup lang="ts">
import { Sizer, useSizer } from '@ark-ui/vue/sizer'
import { ref } from 'vue'

const items = ref(['Item 1', 'Item 2', 'Item 3'])

const sizer = useSizer({
  onSizeChange: (details) => {
    console.log('Resized to:', details)
  },
})

const addItem = () => {
  items.value = [...items.value, `Item ${items.value.length + 1}`]
}

const removeItem = (index: number) => {
  items.value = items.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div>
    <div class="sizer-controls">
      <button type="button" @click="addItem">Add Item</button>
      <button type="button" @click="items = []">Clear All</button>
    </div>

    <Sizer.RootProvider
      :value="sizer"
      style="height: var(--sizer-height); transition: height 0.25s cubic-bezier(0.22, 1, 0.36, 1)"
    >
      <Sizer.Content>
        <div v-if="items.length === 0" class="sizer-empty">No items. Click "Add Item" to start.</div>
        <ul v-else class="sizer-list">
          <li v-for="(item, index) in items" :key="index" class="sizer-list-item">
            <span>{{ item }}</span>
            <button type="button" @click="removeItem(index)" class="sizer-button-remove">Remove</button>
          </li>
        </ul>
      </Sizer.Content>
    </Sizer.RootProvider>
  </div>
</template>

<script setup lang="ts">
import { Combobox, useCombobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { getCaretPosition } from '@zag-js/dom-query'
import { ref } from 'vue'
import styles from 'styles/combobox.module.css'
import field from 'styles/field.module.css'

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

const getMention = (textarea: HTMLTextAreaElement) => {
  const match = textarea.value.slice(0, textarea.selectionStart).match(/(?:^|\s)@([^\s@]*)$/)
  if (!match) return null
  return { query: match[1], start: textarea.selectionStart - match[1].length - 1 }
}

const getCaretRect = (textarea: HTMLTextAreaElement, position: number) => {
  const rect = textarea.getBoundingClientRect()
  const caret = getCaretPosition(textarea, { position })
  return new DOMRect(rect.x + caret.left, rect.y + caret.top, 0, caret.height)
}

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const { contains } = useFilter({ sensitivity: 'base' })

const { collection, filter } = useListCollection({
  initialItems: people,
  filter: contains,
})

const combobox = useCombobox(() => ({
  collection: collection.value,
  value: [],
  allowCustomValue: true,
  inputBehavior: 'autohighlight',
  selectionBehavior: 'preserve',
  openOnKeyPress: false,
  openOnChange: () => !!textareaRef.value && getMention(textareaRef.value) !== null,
  onInputValueChange() {
    const mention = textareaRef.value && getMention(textareaRef.value)
    if (mention) filter(mention.query)
  },
  onSelect({ itemValue }) {
    const textarea = textareaRef.value
    const mention = textarea && getMention(textarea)
    if (!textarea || !mention) return
    requestAnimationFrame(() => {
      textarea.setRangeText(`@${itemValue} `, mention.start, textarea.selectionStart, 'end')
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    })
  },
  positioning: {
    placement: 'bottom-start',
    sameWidth: false,
    gutter: 4,
    getAnchorElement() {
      const textarea = textareaRef.value
      const mention = textarea && getMention(textarea)
      if (!textarea || !mention) return null
      return { contextElement: textarea, getBoundingClientRect: () => getCaretRect(textarea, mention.start) }
    },
  },
}))

const handleInput = (event: Event) => {
  if (combobox.value.open && !getMention(event.currentTarget as HTMLTextAreaElement)) combobox.value.setOpen(false)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') combobox.value.setOpen(false)
}
</script>

<template>
  <Combobox.RootProvider :class="styles.Root" :value="combobox">
    <Combobox.Label :class="styles.Label">Comment</Combobox.Label>
    <Combobox.Input #render="ctx">
      <textarea
        v-bind="ctx.props"
        ref="textareaRef"
        :class="field.Textarea"
        :rows="4"
        placeholder="Type @ to mention someone"
        @input="handleInput"
        @keydown="handleKeyDown"
        @pointerdown="combobox.setOpen(false)"
        @scroll="combobox.reposition()"
      />
    </Combobox.Input>
    <Teleport to="body">
      <Combobox.Positioner :class="styles.Positioner">
        <Combobox.Content :class="styles.Content">
          <Combobox.Empty :class="styles.Empty">No people found</Combobox.Empty>
          <Combobox.List :class="styles.List">
            <Combobox.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
              <Combobox.ItemText :class="styles.ItemText">{{ item }}</Combobox.ItemText>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.RootProvider>
</template>

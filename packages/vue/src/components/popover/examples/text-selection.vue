<script setup lang="ts">
import { Popover, usePopover } from '@ark-ui/vue/popover'
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import styles from 'styles/popover.module.css'

const paragraphRef = ref<HTMLParagraphElement | null>(null)

const popover = usePopover({
  autoFocus: false,
  positioning: {
    placement: 'top',
    getAnchorElement() {
      const node = paragraphRef.value
      const selection = node?.ownerDocument.getSelection()
      if (!node || !selection?.rangeCount) return null
      const range = selection.getRangeAt(0)
      return {
        contextElement: node,
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      }
    },
  },
})

let cleanup: VoidFunction | undefined

onMounted(() => {
  const node = paragraphRef.value
  if (!node) return
  const doc = node.ownerDocument

  const hasSelection = () => {
    const selection = doc.getSelection()
    if (!selection?.rangeCount) return false
    const range = selection.getRangeAt(0)
    return !range.collapsed && node.contains(range.commonAncestorContainer)
  }

  const onPointerUp = () => {
    if (!hasSelection()) return
    popover.value.reposition()
    popover.value.setOpen(true)
  }

  const onSelectionChange = () => {
    if (hasSelection()) popover.value.reposition()
    else popover.value.setOpen(false)
  }

  doc.addEventListener('pointerup', onPointerUp)
  doc.addEventListener('selectionchange', onSelectionChange)
  cleanup = () => {
    doc.removeEventListener('pointerup', onPointerUp)
    doc.removeEventListener('selectionchange', onSelectionChange)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <Popover.RootProvider :value="popover">
    <p ref="paragraphRef">
      Ark UI is a headless component library for building reusable, scalable design systems. Select any part of this
      text to show a formatting toolbar above it.
    </p>
    <Teleport to="body">
      <Popover.Positioner :class="styles.Positioner">
        <Popover.Content :class="[styles.Content, styles.Toolbar]" @mousedown.prevent>
          <Popover.Arrow :class="styles.Arrow">
            <Popover.ArrowTip :class="styles.ArrowTip" />
          </Popover.Arrow>
          <button type="button" :class="styles.ToolbarButton" aria-label="Bold">
            <BoldIcon />
          </button>
          <button type="button" :class="styles.ToolbarButton" aria-label="Italic">
            <ItalicIcon />
          </button>
          <button type="button" :class="styles.ToolbarButton" aria-label="Underline">
            <UnderlineIcon />
          </button>
          <button type="button" :class="styles.ToolbarButton" aria-label="Strikethrough">
            <StrikethroughIcon />
          </button>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.RootProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '../'
import { UsePopoverProps } from '../use-popover'

const isOpen = ref(false)

const handleOpenClick = () => {
  return (isOpen.value = !isOpen.value)
}

const handleOnClose: UsePopoverProps['context']['onClose'] = () => {
  return (isOpen.value = false)
}
</script>

<template>
  <div>
    <button @click="handleOpenClick">Toggle Control</button>
    <Popover :is-open="isOpen" @close="handleOnClose">
      <PopoverTrigger>
        <button>click me</button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
          <input type="text" />
          <PopoverCloseTrigger>
            <button>close</button>
          </PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  </div>
</template>

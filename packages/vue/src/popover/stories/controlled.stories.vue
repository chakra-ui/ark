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
  UsePopoverProps,
} from '../'

const isOpen = ref(false)

const handleOpenClick = () => {
  return (isOpen.value = !isOpen.value)
}

const handleOnOpenChange: UsePopoverProps['context']['onOpenChange'] = (open) => {
  return (isOpen.value = open)
}
</script>

<template>
  <button @click="handleOpenClick">Toggle Control</button>
  <Popover :is-open="isOpen" @open-change="handleOnOpenChange">
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
</template>

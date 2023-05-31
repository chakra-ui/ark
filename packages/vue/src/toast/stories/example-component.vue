<script setup lang="ts">
import { useToast } from '../'

const toast = useToast()

const handleTopEndToastClick = () => {
  toast.value.create({
    title: 'Hello',
    placement: 'top-end',
    duration: 10000,
    removeDelay: 0,
  })
}
const handleBottomStartToastClick = () => {
  toast.value.create({
    title: 'Data submitted!',
    type: 'success',
    placement: 'bottom-start',
  })
}
</script>
<template>
  <div>
    <button @click="handleTopEndToastClick">Add top-end toast</button>
    <button @click="handleBottomStartToastClick">Add bottom-start toast</button>
  </div>
</template>

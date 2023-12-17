<script setup lang="ts">
import { ref } from 'vue'
import { Presence } from './'
import './presence.css'

const isPresent = ref(false)
</script>

<template>
  <Story title="Presence">
    <Variant title="Basic">
      <div>
        <button @click="isPresent = !isPresent">Toggle</button>
        <Presence :present="isPresent">Hidden and Hidden </Presence>
      </div>
    </Variant>

    <Variant title="LazyMount">
      <div>
        <button @click="isPresent = !isPresent">Toggle</button>
        <Presence :present="isPresent" lazyMount>Hidden and Hidden </Presence>
      </div>
    </Variant>

    <Variant title="UnmountOnExit">
      <div>
        <button @click="isPresent = !isPresent">Toggle</button>
        <Presence :present="isPresent" unmountOnExit>Hidden and Unmounted on Exit </Presence>
      </div>
    </Variant>

    <Variant title="LazyMountAndUnmountOnExit">
      <div>
        <button @click="isPresent = !isPresent">Toggle</button>
        <Presence :present="isPresent" lazyMount unmountOnExit>
          Lazy Mount and Unmounted on Exit
        </Presence>
      </div>
    </Variant>
  </Story>
</template>

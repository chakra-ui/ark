<script setup lang="ts">
import { Avatar, useAvatar } from '@ark-ui/vue/avatar'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/avatar.module.css'

const count = ref(0)
const avatar = useAvatar()
</script>

<template>
  <div class="vstack">
    <button :class="button.Root" @click="count++">Change Avatar</button>

    <Avatar.RootProvider :class="styles.Root" :value="avatar">
      <Avatar.Fallback :class="styles.Fallback">PA</Avatar.Fallback>
      <Avatar.Image :class="styles.Image" :src="`https://i.pravatar.cc/300?u=${count}`" alt="avatar" />
    </Avatar.RootProvider>
  </div>
</template>

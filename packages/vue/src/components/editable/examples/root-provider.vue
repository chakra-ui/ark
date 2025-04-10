<script setup lang="ts">
import { Editable, useEditable } from '@ark-ui/vue/editable'

const editable = useEditable({ placeholder: 'Placeholder' })
</script>

<template>
  <button @click="editable.edit()">Edit</button>

  <Editable.RootProvider :value="editable">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.RootProvider>
</template>

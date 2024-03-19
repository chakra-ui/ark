<script setup lang="ts">
import { ByteFormat } from '../'
import './byte-format.css'
</script>

<template>
  <Story title="Byte Format">
    <Variant title="Basic">
      <div class="file">
        <span class="file__name">src/index.ts</span>
        <span class="file__size">
          <ByteFormat :value="120904" unit="byte" />
        </span>
      </div>
    </Variant>
  </Story>
</template>

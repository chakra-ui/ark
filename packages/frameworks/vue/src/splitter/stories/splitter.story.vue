<script setup lang="ts">
import { ref } from 'vue'
import { Splitter } from '../'
import './splitter.css'

const size = ref([
  { id: 'a', size: 50 },
  { id: 'b', size: 50 },
])
</script>

<template>
  <Story title="Splitter">
    <Variant title="Basic">
      <Splitter.Root :size="size">
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.Root>
    </Variant>

    <Variant title="RenderProp">
      <Splitter.Root :size="size" v-slot="api">
        <Splitter.Panel id="a">
          <button @click="api.setSize('a', 10)">Set A to 10%</button>
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">
          <button @click="api.setSize('b', 10)">Set B to 10%</button>
        </Splitter.Panel>
      </Splitter.Root>
    </Variant>

    <Variant title="Events">
      <Splitter.Root
        :size="size"
        @size-change-start="(details) => console.log('onSizeChangeStart', details)"
        @size-change-end="(details) => console.log('onSizeChangeEnd', details)"
      >
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.Root>
    </Variant>

    <Variant title="Vertical">
      <Splitter.Root :size="size" orientation="vertical">
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.Root>
    </Variant>
  </Story>
</template>

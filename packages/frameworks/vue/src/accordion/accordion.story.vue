<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Accordion } from './'
import './accordion.css'

const items = ref(['React', 'Solid', 'Vue'])
const value = ref(['React'])
</script>

<template>
  <Story title="Accordion">
    <Variant title="Basic">
      <Accordion.Root>
        <Accordion.Item v-for="item in items" :key="item" :value="item">
          <Accordion.ItemTrigger>
            What is {{ item }}?
            <Accordion.ItemIndicator><ChevronDownIcon /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent
            >{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent
          >
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
    <Variant title="RenderProp">
      <Accordion.Root>
        <Accordion.Item v-for="item in items" :key="item" :value="item" v-slot="{ isOpen }">
          <Accordion.ItemTrigger>{{ isOpen ? 'Close' : 'Open' }}</Accordion.ItemTrigger>
          <Accordion.ItemContent>{{ item }} content</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
    <Variant title="Collapsible">
      <Accordion.Root collapsible>
        <Accordion.Item v-for="item in items" :key="item" :value="item">
          <Accordion.ItemTrigger>
            What is {{ item }}?
            <Accordion.ItemIndicator><ChevronDownIcon /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent
            >{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent
          >
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
    <Variant title="Multiple">
      <Accordion.Root multiple>
        <Accordion.Item v-for="item in items" :key="item" :value="item">
          <Accordion.ItemTrigger>
            What is {{ item }}?
            <Accordion.ItemIndicator><ChevronDownIcon /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent
            >{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent
          >
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
    <Variant title="Controlled">
      <Accordion.Root v-model="value">
        <Accordion.Item v-for="item in items" :key="item" :value="item">
          <Accordion.ItemTrigger>{{ item }} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{{ item }} content</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
    <Variant title="Vertical">
      <Accordion.Root orientation="vertical">
        <Accordion.Item v-for="item in items" :key="item" :value="item">
          <Accordion.ItemTrigger>{{ item }} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{{ item }} content</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
    <Variant title="Disabled">
      <Accordion.Root>
        <Accordion.Item
          v-for="item in items"
          :key="item"
          :value="item"
          :disabled="item === 'Solid'"
        >
          <Accordion.ItemTrigger>{{ item }} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{{ item }} content</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Variant>
  </Story>
</template>

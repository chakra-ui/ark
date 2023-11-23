<script setup lang="ts">
import { ref } from 'vue'
import { SegmentGroup } from './'
import './segment-group.css'

const frameworks = ref(['React', 'Solid', 'Vue'])
const value = ref('React')
</script>

<template>
  <Story title="Segment Group">
    <Variant title="Basic">
      <SegmentGroup.Root>
        <SegmentGroup.Indicator />
        <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
          <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Variant>
    <Variant title="InitialValue">
      <SegmentGroup.Root model-value="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
          <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Variant>
    <Variant title="Controlled">
      <SegmentGroup.Root v-model="value">
        <SegmentGroup.Indicator />
        <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
          <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Variant>
    <Variant title="Disabled">
      <SegmentGroup.Root model-value="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Item
          v-for="framework in frameworks"
          :key="framework"
          :value="framework"
          :disabled="framework === 'Solid'"
        >
          <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Variant>
  </Story>
</template>

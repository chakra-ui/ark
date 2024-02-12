<script setup lang="ts">
import { ref } from 'vue'
import { RatingGroup } from '../'
import { IconEmpty, IconFull, IconHalf } from './rating-icons'

const value = ref(0)
</script>

<template>
  <Story title="Rating Group">
    <Variant title="Basic">
      <RatingGroup.Root :count="5" :model-value="3">
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHighlighted }"
          >
            <IconFull v-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>

    <Variant title="HalfRatings">
      <RatingGroup.Root :count="5" :model-value="3" allowHalf>
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHalf, isHighlighted }"
          >
            <IconHalf v-if="isHalf" />
            <IconFull v-else-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>

    <Variant title="InitialValue">
      <RatingGroup.Root :count="5" :model-value="2" readOnly>
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHighlighted }"
          >
            <IconFull v-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>

    <Variant title="Controlled">
      <RatingGroup.Root :count="5" v-model="value" allowHalf>
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHalf, isHighlighted }"
          >
            <IconHalf v-if="isHalf" />
            <IconFull v-else-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>

    <Variant title="Disabled">
      <RatingGroup.Root :count="5" :model-value="3" disabled>
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHighlighted }"
          >
            <IconFull v-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>

    <Variant title="ReadOnly">
      <RatingGroup.Root :count="5" :model-value="3" readOnly>
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHighlighted }"
          >
            <IconFull v-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>

    <Variant title="FormUsage">
      <RatingGroup.Root name="my-rating" :count="5" :model-value="3">
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control v-slot="{ items }">
          <RatingGroup.Item
            v-for="item in items"
            :key="item"
            :index="item"
            v-slot="{ isHighlighted }"
          >
            <IconFull v-if="isHighlighted" />
            <IconEmpty v-else />
          </RatingGroup.Item>
        </RatingGroup.Control>
      </RatingGroup.Root>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { RatingGroup, type RatingGroupRootEmits, type RatingGroupRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<RatingGroupRootProps>()
const emits = defineEmits<RatingGroupRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <RatingGroup.Root v-bind="localProps">
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context v-slot="ratingGroup">
        <RatingGroup.Item v-for="item in ratingGroup.items" :key="item" :index="item">
          <RatingGroup.ItemContext v-slot="{ highlighted }">
            {{ item ? 'half' : highlighted ? 'highlighted' : 'empty' }}
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>

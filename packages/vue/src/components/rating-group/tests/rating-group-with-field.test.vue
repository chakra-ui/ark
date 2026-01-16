<script setup lang="ts">
import { Field, type FieldRootProps } from '@ark-ui/vue/field'
import { RatingGroup } from '../'

defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="$props">
    <RatingGroup.Root :default-value="3">
      <RatingGroup.Label>Label</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Context v-slot="{ items }">
          <RatingGroup.Item v-for="item in items" :key="item" :index="item">
            <RatingGroup.ItemContext v-slot="{ half, highlighted }">
              <template v-if="half">half</template>
              <template v-else-if="highlighted">highlighted</template>
              <template v-else>empty</template>
            </RatingGroup.ItemContext>
          </RatingGroup.Item>
        </RatingGroup.Context>
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>

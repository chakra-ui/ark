<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { StarIcon, StarOutlineIcon } from './icons'
</script>

<template>
  <Field.Root>
    <RatingGroup.Root :count="5" :model-value="3">
      <RatingGroup.Label>Label</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Context v-slot="{ items }">
          <RatingGroup.Item v-for="item in items" :key="item" :index="item">
            <RatingGroup.ItemContext v-slot="{ highlighted }">
              <StarIcon v-if="highlighted" />
              <StarOutlineIcon v-else />
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

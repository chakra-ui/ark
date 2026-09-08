<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/checkbox.module.css'
import tooltipStyles from 'styles/tooltip.module.css'
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger #render="ctx">
      <Checkbox.Root v-bind="ctx.props" :class="styles.Root">
        <Checkbox.Control :class="styles.Control">
          <Checkbox.Indicator :class="styles.Indicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label :class="styles.Label">Accept terms</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="tooltipStyles.Content">Required to continue</Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>

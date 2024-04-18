<script setup lang="ts">
// export type AccordionRootEmits = {
//   focusChange: [details: FocusChangeDetails]
//   valueChange: [value: string]
// }
// export interface AccordionRootProps
//   extends Omit<UseAccordionProps, 'onFocusChange' | 'onValueChange'> {}

// const props = defineProps<AccordionRootProps>()
// const emits = defineEmits<AccordionRootEmits>()

// const accordion = useAccordion(props, emits)
// AccordionProvider(accordion)
</script>

<template>
  <div>
  <slot></slot>
  </div>
</template>
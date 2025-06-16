<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastCloseTriggerBaseProps extends PolymorphicProps<'button'> {}

  export interface ToastCloseTriggerProps extends Assign<HTMLProps<'button'>, ToastCloseTriggerBaseProps> {}

  const props: ToastCloseTriggerProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getCloseTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />

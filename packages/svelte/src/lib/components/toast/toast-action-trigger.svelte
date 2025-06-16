<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastActionTriggerBaseProps extends PolymorphicProps<'button'> {}

  export interface ToastActionTriggerProps extends Assign<HTMLProps<'button'>, ToastActionTriggerBaseProps> {}

  const props: ToastActionTriggerProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getActionTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />

<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastDescriptionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}

  export interface ToastDescriptionProps extends Assign<HTMLProps<'div'>, ToastDescriptionBaseProps> {}

  let { ref = $bindable(null), ...props }: ToastDescriptionProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getDescriptionProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

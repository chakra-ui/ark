<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastTitleBaseProps extends PolymorphicProps<'div'>, RefAttribute {}

  export interface ToastTitleProps extends Assign<HTMLProps<'div'>, ToastTitleBaseProps> {}

  let { ref = $bindable(), ...props }: ToastTitleProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getTitleProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

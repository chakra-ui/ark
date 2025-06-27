<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastRootBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ToastRootProps extends Assign<HTMLProps<'div'>, ToastRootBaseProps> {}

  let { ref = $bindable(), ...props }: ToastRootProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getRootProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  <div {...toast().getGhostBeforeProps()}></div>
  {@render props.children?.()}
  <div {...toast().getGhostAfterProps()}></div>
</Ark>

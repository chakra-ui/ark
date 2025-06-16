<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastTitleBaseProps extends PolymorphicProps<'div'> {}

  export interface ToastTitleProps extends Assign<HTMLProps<'div'>, ToastTitleBaseProps> {}

  const props: ToastTitleProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getTitleProps(), props))
</script>

<Ark as="div" {...mergedProps} />

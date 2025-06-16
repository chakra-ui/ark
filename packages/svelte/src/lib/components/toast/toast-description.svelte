<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastDescriptionBaseProps extends PolymorphicProps<'div'> {}

  export interface ToastDescriptionProps extends Assign<HTMLProps<'div'>, ToastDescriptionBaseProps> {}

  const props: ToastDescriptionProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getDescriptionProps(), props))
</script>

<Ark as="div" {...mergedProps} />

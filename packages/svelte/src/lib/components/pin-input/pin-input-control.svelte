<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PinInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PinInputControlProps extends Assign<HTMLProps<'div'>, PinInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { usePinInputContext } from './use-pin-input-context.ts'

  let { ref = $bindable(null), ...props }: PinInputControlProps = $props()
  const pinInput = usePinInputContext()
  // TODO: remove role and aria-labelledby once Ark uses a @zag-js/pin-input release with chakra-ui/zag#3461
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(pinInput().getControlProps(), props))
</script>

<Ark
  as="div"
  bind:ref
  role="group"
  aria-labelledby={field?.()?.ids.label}
  aria-describedby={field?.()?.ariaDescribedby}
  {...mergedProps}
/>

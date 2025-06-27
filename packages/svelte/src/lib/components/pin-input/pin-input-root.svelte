<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePinInputProps } from './use-pin-input.svelte'

  export interface PinInputRootBaseProps extends UsePinInputProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface PinInputRootProps extends Assign<HTMLProps<'div'>, PinInputRootBaseProps> {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { PinInputProvider } from './use-pin-input-context'
  import { usePinInput } from './use-pin-input.svelte'

  let { ref = $bindable(), value = $bindable(), ...props }: PinInputRootProps = $props()
  const providedId = $props.id()

  const [usePinInputProps, localProps] = $derived(
    createSplitProps<UsePinInputProps>()(props, [
      'autoFocus',
      'blurOnComplete',
      'count',
      'defaultValue',
      'disabled',
      'form',
      'id',
      'ids',
      'invalid',
      'mask',
      'name',
      'onValueChange',
      'onValueComplete',
      'onValueInvalid',
      'otp',
      'pattern',
      'placeholder',
      'readOnly',
      'required',
      'selectOnFocus',
      'translations',
      'type',
      'value',
    ]),
  )

  const resolvedProps = $derived<UsePinInputProps>({
    ...usePinInputProps,
    id: usePinInputProps.id ?? providedId,
    value,
    onValueChange(details) {
      usePinInputProps.onValueChange?.(details)
      value = details.value
    },
  })

  const pinInput = usePinInput(() => resolvedProps)
  const mergedProps = $derived(mergeProps(pinInput().getRootProps(), localProps))

  PinInputProvider(pinInput)
</script>

<Ark as="div" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps } from '$lib/types'
  import type { UseCheckboxReturn } from './use-checkbox.svelte'

  interface RootProviderProps {
    value: UseCheckboxReturn
  }

  export interface CheckboxRootProviderBaseProps extends RootProviderProps {}
  export interface CheckboxRootProviderProps
    extends Assign<HTMLProps<'div'>, CheckboxRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { CheckboxProvider } from './use-checkbox-context'

  const props: CheckboxRootProviderProps = $props()
  const { value: checkbox, ...localProps } = props
  const mergedProps = $derived(mergeProps(checkbox().getRootProps(), localProps))

  CheckboxProvider(checkbox)
</script>

<Ark as="div" {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxStatusBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxStatusProps extends Assign<HTMLProps<'div'>, ComboboxStatusBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory/index.ts'
  import { comboboxAnatomy } from './combobox.anatomy.ts'

  const parts = comboboxAnatomy.build()

  let { ref = $bindable(null), ...props }: ComboboxStatusProps = $props()
</script>

<Ark as="div" bind:ref {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} />

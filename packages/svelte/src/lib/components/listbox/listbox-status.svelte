<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ListboxStatusBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ListboxStatusProps extends Assign<HTMLProps<'div'>, ListboxStatusBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory/index.ts'
  import { listboxAnatomy } from './listbox.anatomy.ts'

  const parts = listboxAnatomy.build()

  let { ref = $bindable(null), ...props }: ListboxStatusProps = $props()
</script>

<Ark as="div" bind:ref {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} />

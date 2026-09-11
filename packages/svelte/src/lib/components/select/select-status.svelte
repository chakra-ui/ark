<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectStatusBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectStatusProps extends Assign<HTMLProps<'div'>, SelectStatusBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory/index.ts'
  import { selectAnatomy } from './select.anatomy.ts'

  const parts = selectAnatomy.build()

  let { ref = $bindable(null), ...props }: SelectStatusProps = $props()
</script>

<Ark as="div" bind:ref {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} />

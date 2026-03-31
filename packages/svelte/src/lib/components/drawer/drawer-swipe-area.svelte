<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerSwipeAreaProps extends Assign<HTMLProps<'div'>, DrawerSwipeAreaBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'

  let { ref = $bindable(null), ...props }: DrawerSwipeAreaProps = $props()
</script>

<Ark as="div" bind:ref {...props} />

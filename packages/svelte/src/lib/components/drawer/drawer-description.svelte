<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerDescriptionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerDescriptionProps extends Assign<HTMLProps<'div'>, DrawerDescriptionBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'

  let { ref = $bindable(null), ...props }: DrawerDescriptionProps = $props()
</script>

<Ark as="div" bind:ref {...props} />

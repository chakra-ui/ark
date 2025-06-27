<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourControlProps extends HTMLProps<'div'>, TourControlBaseProps {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { tourAnatomy } from './tour.anatomy'

  let { ref = $bindable(null), ...props }: TourControlProps = $props()
</script>

<Ark as="div" bind:ref {...tourAnatomy.build().control.attrs} {...props} />

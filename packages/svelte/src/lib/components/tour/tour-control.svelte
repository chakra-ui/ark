<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TourControlBaseProps extends PolymorphicProps<'div'> {}
  export interface TourControlProps extends HTMLProps<'div'>, TourControlBaseProps {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { tourAnatomy } from './tour.anatomy'

  const props: TourControlProps = $props()
</script>

<Ark as="div" {...tourAnatomy.build().control.attrs} {...props} />

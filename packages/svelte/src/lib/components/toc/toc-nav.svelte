<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types.ts'

  export interface TocNavBaseProps extends PolymorphicProps<'nav'>, RefAttribute {
    placement?: 'left' | 'right'
  }
  export interface TocNavProps extends Assign<HTMLProps<'nav'>, TocNavBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTocContext } from './use-toc-context.ts'

  let { ref = $bindable(null), placement, ...props }: TocNavProps = $props()
  const toc = useTocContext()
  const mergedProps = $derived(mergeProps(toc().getNavProps(), props))
</script>

<Ark as="nav" bind:ref {...mergedProps} data-placement={placement} />

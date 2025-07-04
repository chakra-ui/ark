<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { type FocusTrapOptions, trapFocus } from '@zag-js/focus-trap'
  import { Ark } from '../factory/index.js'

  export interface TrapOptions
    extends Pick<
      FocusTrapOptions,
      'onActivate' | 'onDeactivate' | 'initialFocus' | 'fallbackFocus' | 'returnFocusOnDeactivate' | 'setReturnFocus'
    > {
    /**
     * Whether the focus trap is disabled.
     */
    disabled?: boolean
  }

  export interface FocusTrapBaseProps extends PolymorphicProps<'div'>, RefAttribute, TrapOptions {}
  export interface FocusTrapProps extends Assign<HTMLProps<'div'>, FocusTrapBaseProps> {}

  let { ref = $bindable(null), ...props }: FocusTrapProps = $props()

  const [trapProps, localProps] = $derived(
    createSplitProps<TrapOptions>()(props, [
      'disabled',
      'onActivate',
      'onDeactivate',
      'initialFocus',
      'fallbackFocus',
      'returnFocusOnDeactivate',
      'setReturnFocus',
    ]),
  )

  let localNode = $state<HTMLDivElement | null>(null)

  $effect(() => {
    if (!localNode || trapProps.disabled) return
    return trapFocus(localNode, trapProps)
  })

  function setNode(node: HTMLDivElement | null) {
    localNode = node
  }
</script>

<Ark as="div" bind:ref {@attach setNode} {...localProps} />

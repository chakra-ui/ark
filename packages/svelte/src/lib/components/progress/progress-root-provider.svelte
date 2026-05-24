<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseProgressReturn } from './use-progress.svelte.ts'

  interface RootProviderProps {
    value: UseProgressReturn
  }

  export interface ProgressRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface ProgressRootProviderProps extends Assign<HTMLProps<'div'>, ProgressRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { ProgressProvider } from './use-progress-context.ts'

  let { ref = $bindable(null), value: progress, ...localProps }: ProgressRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(progress().getRootProps(), localProps))

  ProgressProvider(() => progress())
</script>

<Ark as="div" bind:ref {...mergedProps} />

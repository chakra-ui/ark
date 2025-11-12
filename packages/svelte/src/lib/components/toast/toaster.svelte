<script lang="ts">
  import type { Accessor, Assign, HTMLProps, RefAttribute } from '$lib/types.js'
  import { mergeProps, normalizeProps, useMachine } from '@zag-js/svelte'
  import * as toast from '@zag-js/toast'
  import type { Snippet } from 'svelte'
  import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'
  import { Ark } from '../factory/index.js'
  import type { CreateToasterReturn } from './create-toaster.js'
  import ToasterItem from './toaster-item.svelte'

  export type ToastOptions = toast.Options<Snippet>

  export interface ToasterBaseProps extends Omit<toast.GroupProps, 'store' | 'id'>, RefAttribute {
    /**
     * The toaster instance.
     */
    toaster: CreateToasterReturn
    /**
     * The children of the toaster.
     */
    children: Snippet<[Accessor<ToastOptions>]>
  }

  export interface ToasterProps extends Assign<HTMLProps<'div'>, ToasterBaseProps> {}

  const id = $props.id()
  let { ref = $bindable(null), toaster, children, ...otherProps }: ToasterProps = $props()

  const locale = useLocaleContext()
  const env = useEnvironmentContext()

  const machineProps = $derived.by(() => ({
    store: toaster,
    id,
    dir: locale().dir,
    getRootNode: env().getRootNode,
  }))

  const service = useMachine(toast.group.machine, () => machineProps)

  const api = $derived(toast.group.connect(service, normalizeProps))
  const toasts = $derived(api.getToasts())

  const mergedProps = $derived(mergeProps(api.getGroupProps(), otherProps))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#each toasts as toast, index (toast.id)}
    {@const toastFn = () => toast}
    <ToasterItem value={toastFn} parent={service} {index}>
      {@render children(toastFn)}
    </ToasterItem>
  {/each}
</Ark>

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface SelectHiddenInputProps extends Assign<HTMLProps<'input'>, SelectHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context.ts'

  let { ref = $bindable(null), ...props }: SelectHiddenInputProps = $props()
  const select = useSelectContext()
  const values = $derived(select().value.length > 0 ? select().value : select().multiple ? [] : [''])
  const hiddenProps = $derived.by(() => {
    const { name, form, disabled } = select().getHiddenSelectProps()
    return { type: 'hidden', name, form, disabled }
  })
</script>

{#each values as value, index (value)}
  {#if index === 0}
    <Ark as="input" bind:ref {...mergeProps({ ...hiddenProps, value }, props)} />
  {:else}
    <Ark as="input" {...mergeProps({ ...hiddenProps, value }, props)} />
  {/if}
{/each}

<script lang="ts">
  import Ark from '../factory.svelte'

  interface Props {
    mode: 'default' | 'render' | 'asChild'
    onRef?: (ref: Element | null) => void
  }

  const { mode, onRef }: Props = $props()

  let ref = $state<Element | null>(null)

  $effect(() => {
    onRef?.(ref)
  })
</script>

{#if mode === 'render'}
  <Ark as="div" bind:ref>
    {#snippet render(props)}
      <button {...props()} type="button" data-testid="target">Custom</button>
    {/snippet}
  </Ark>
{:else if mode === 'asChild'}
  <Ark as="div" bind:ref>
    {#snippet asChild(props)}
      <button {...props()} type="button" data-testid="target">Custom</button>
    {/snippet}
  </Ark>
{:else}
  <Ark as="button" type="button" data-testid="target" bind:ref>Default</Ark>
{/if}

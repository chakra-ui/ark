<script lang="ts">
  import Ark from '../factory.svelte'

  interface Props {
    onRef?: (ref: Element | null) => void
  }

  const { onRef }: Props = $props()

  let ref = $state<Element | null>(null)

  $effect(() => onRef?.(ref))
</script>

<Ark as="button" bind:ref>
  {#snippet asChild(props)}
    <button {...props({ type: 'button' })} data-testid="child">Ark UI</button>
  {/snippet}
</Ark>

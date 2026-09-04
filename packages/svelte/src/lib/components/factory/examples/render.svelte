<script lang="ts">
  import Ark from '../factory.svelte'

  interface Props {
    onClickParent?: () => void
    onClickChild?: () => void
    state?: unknown
  }

  const { onClickParent, onClickChild, state }: Props = $props()
</script>

<Ark
  as="div"
  data-part="trigger"
  data-testid="parent"
  class="parent"
  style="background: red"
  onclick={onClickParent}
  {state}
>
  {#snippet render(props, snapshot)}
    <button
      {...props({ class: 'child', style: 'color: blue', onclick: onClickChild })}
      type="button"
      data-testid="child"
    >
      {(snapshot as { open?: boolean })?.open ? 'Open' : 'Ark UI'}
    </button>
  {/snippet}
</Ark>

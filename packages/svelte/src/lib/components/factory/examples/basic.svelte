<script lang="ts">
import Ark from '../factory.svelte'

interface Props {
  onClickParent?: () => void
  onClickChild?: () => void
}
const { onClickParent, onClickChild }: Props = $props()
</script>

<Ark
  as="div"
  asChild
  id="parent"
  data-testid="parent"
  data-part="parent"
  class="parent"
  style="background: red"
  onclick={onClickParent}
>
  {#snippet render(props)}
    <Ark
      as="span"
      {...props({ id: 'child', class: 'child', style: 'color: blue', onclick: onClickChild })}
      data-testid="child"
      data-part="child"
    >
      Ark UI
    </Ark>
  {/snippet}
</Ark>

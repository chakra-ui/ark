<script lang="ts">
  import Ark from '../factory.svelte'
</script>

<Ark
  as="div"
  asChild
  id="parent"
  data-testid="parent"
  data-part="parent"
  class="parent"
  style="background: red;"
>
  {#snippet render(props)}
    <Ark
      as="span"
      {...props({ id: 'child', class: 'child', style: 'color: blue' })}
      data-testid="child"
      data-part="child"
    >
      Ark UI
    </Ark>
  {/snippet}
</Ark>

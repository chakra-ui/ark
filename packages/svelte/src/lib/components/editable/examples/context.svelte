<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import PencilIcon from 'lucide-svelte/icons/pencil'
  import styles from 'styles/editable.module.css'
</script>

<Editable.Root class={styles.Root} placeholder="Enter text..." defaultValue="Hello World">
  <Editable.Label class={styles.Label}>Label</Editable.Label>
  <Editable.Area class={styles.Area}>
    <Editable.Input class={styles.Input} />
    <Editable.Preview class={styles.Preview} />
  </Editable.Area>
  <Editable.Context>
    {#snippet render(editable)}
      {#if editable().editing}
        <span class={styles.HelperText}>Enter to save, Esc to cancel</span>
      {:else}
        <Editable.Control class={styles.Control}>
          <Editable.EditTrigger class={styles.EditTrigger}>
            <PencilIcon />
          </Editable.EditTrigger>
        </Editable.Control>
      {/if}
    {/snippet}
  </Editable.Context>
</Editable.Root>

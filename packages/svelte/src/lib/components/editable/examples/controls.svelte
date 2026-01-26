<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import CheckIcon from 'lucide-svelte/icons/check'
  import PencilIcon from 'lucide-svelte/icons/pencil'
  import XIcon from 'lucide-svelte/icons/x'
  import styles from 'styles/editable.module.css'
</script>

<Editable.Root class={styles.Root} defaultValue="Click edit to start">
  <Editable.Label class={styles.Label}>Label</Editable.Label>
  <Editable.Area class={styles.Area}>
    <Editable.Input class={styles.Input} />
    <Editable.Preview class={styles.Preview} />
  </Editable.Area>
  <Editable.Context>
    {#snippet render(editable)}
      <Editable.Control class={styles.Control}>
        {#if editable().editing}
          <Editable.SubmitTrigger class={styles.SubmitTrigger}>
            <CheckIcon />
          </Editable.SubmitTrigger>
          <Editable.CancelTrigger class={styles.CancelTrigger}>
            <XIcon />
          </Editable.CancelTrigger>
        {:else}
          <Editable.EditTrigger class={styles.EditTrigger}>
            <PencilIcon />
          </Editable.EditTrigger>
        {/if}
      </Editable.Control>
    {/snippet}
  </Editable.Context>
</Editable.Root>

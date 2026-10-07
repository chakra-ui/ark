<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import { MinusIcon, PlusIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  let value = $state(1248)
</script>

<div class={styles.Card}>
  <span class={styles.Label}>Followers</span>
  <NumberFlow.Root {value} class={`${styles.Root} ${styles.Display}`}>
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
  <div class={styles.Actions}>
    <button type="button" class={button.Root} onclick={() => (value -= 1)}>
      <MinusIcon /> Unfollow
    </button>
    <button type="button" class={button.Root} data-variant="solid" onclick={() => (value += 1)}>
      <PlusIcon /> Follow
    </button>
  </div>
</div>

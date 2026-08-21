<script lang="ts">
  import { type ConflictBehavior, createHotkeyStore } from '$lib/providers/hotkeys/index.ts'
  import button from 'styles/button.module.css'
  import styles from 'styles/hotkeys.module.css'
  import ConflictDemo from './conflict-demo.svelte'

  const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']
  let behavior = $state<ConflictBehavior>('warn')
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>Two commands claim the same shortcut. Pick how the store resolves it, then press it.</p>

  <div class={styles.Toolbar}>
    {#each BEHAVIORS as value (value)}
      <button type="button" class={button.Root} onclick={() => (behavior = value)}>{value}</button>
    {/each}
  </div>

  <!-- Conflict behavior is fixed when the store is created, so switching it makes a new store. -->
  {#key behavior}
    <ConflictDemo store={createHotkeyStore({ conflictBehavior: behavior })} />
  {/key}
</div>

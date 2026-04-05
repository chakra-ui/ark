<script lang="ts">
  import { Drawer } from '@ark-ui/svelte/drawer'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/drawer.module.css'
  import field from 'styles/field.module.css'

  interface User {
    id: string
    name: string
    email: string
  }

  const users: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
  ]

  let activeUser = $state<User | null>(null)
</script>

<Drawer.Root
  onTriggerValueChange={(e) => {
    activeUser = users.find((u) => u.id === e.value) ?? null
  }}
>
  <div class={button.Group}>
    {#each users as user (user.id)}
      <Drawer.Trigger value={user.id} class={button.Root}>Edit {user.name}</Drawer.Trigger>
    {/each}
  </div>
  <Drawer.Backdrop class={styles.Backdrop} />
  <Drawer.Positioner class={styles.Positioner}>
    <Drawer.Content class={styles.Content}>
      <Drawer.Grabber class={styles.Grabber}>
        <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
      </Drawer.Grabber>
      <Drawer.Title class={styles.Title}>Edit User</Drawer.Title>
      {#if activeUser}
        <div class="stack">
          <div class={field.Root}>
            <label class={field.Label}>Name</label>
            <input class={field.Input} value={activeUser.name} />
          </div>
          <div class={field.Root}>
            <label class={field.Label}>Email</label>
            <input class={field.Input} value={activeUser.email} />
          </div>
          <div class={button.Group}>
            <Drawer.CloseTrigger class={button.Root}>Cancel</Drawer.CloseTrigger>
            <Drawer.CloseTrigger class={button.Root} data-variant="solid">Save Changes</Drawer.CloseTrigger>
          </div>
        </div>
      {/if}
      <Drawer.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </Drawer.CloseTrigger>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

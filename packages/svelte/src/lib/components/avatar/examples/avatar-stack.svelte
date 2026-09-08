<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/avatar.module.css'
  import menuStyles from 'styles/menu.module.css'

  const users = [
    { id: 'pa', name: 'Pauline Adebayo', initials: 'PA', src: 'https://i.pravatar.cc/300?u=a' },
    { id: 'mk', name: 'Marcus Kim', initials: 'MK', src: 'https://i.pravatar.cc/300?u=b' },
    { id: 'jr', name: 'Jordan Reed', initials: 'JR', src: 'https://i.pravatar.cc/300?u=c' },
    { id: 'sl', name: 'Sara Liu', initials: 'SL', src: 'https://i.pravatar.cc/300?u=d' },
    { id: 'tw', name: 'Taylor West', initials: 'TW', src: 'https://i.pravatar.cc/300?u=e' },
  ]

  const max = 3
  const visible = users.slice(0, max)
  const hidden = users.slice(max)
</script>

<div class={styles.Stack}>
  {#each visible as user (user.id)}
    <Avatar.Root class={styles.Root}>
      <Avatar.Fallback class={styles.Fallback}>{user.initials}</Avatar.Fallback>
      <Avatar.Image class={styles.Image} src={user.src} alt={user.name} />
    </Avatar.Root>
  {/each}
  {#if hidden.length > 0}
    <Menu.Root>
      <Menu.Trigger>
        {#snippet render(props)}
          <Avatar.Root {...props({ class: styles.Root })}>
            <Avatar.Fallback class={styles.Fallback}>+{hidden.length}</Avatar.Fallback>
          </Avatar.Root>
        {/snippet}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={menuStyles.Content}>
            {#each hidden as user (user.id)}
              <Menu.Item class={menuStyles.Item} value={user.id}>
                <Avatar.Root class={styles.MenuAvatar}>
                  <Avatar.Fallback class={styles.Fallback}>{user.initials}</Avatar.Fallback>
                  <Avatar.Image class={styles.Image} src={user.src} alt={user.name} />
                </Avatar.Root>
                {user.name}
              </Menu.Item>
            {/each}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  {/if}
</div>

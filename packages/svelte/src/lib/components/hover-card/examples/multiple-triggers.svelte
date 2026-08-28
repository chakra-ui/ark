<script lang="ts">
  import { HoverCard } from '@ark-ui/svelte/hover-card'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/hover-card.module.css'

  interface Profile {
    id: string
    name: string
    username: string
    avatar: string
    bio: string
  }

  const profiles: Profile[] = [
    {
      id: 'sarah',
      name: 'Sarah Chen',
      username: '@sarah_chen',
      avatar: 'https://i.pravatar.cc/300?u=sarah',
      bio: 'Design Engineer at Acme Inc. Building beautiful interfaces.',
    },
    {
      id: 'alex',
      name: 'Alex Rivera',
      username: '@alex_r',
      avatar: 'https://i.pravatar.cc/300?u=alex',
      bio: 'Full-stack developer and open source contributor.',
    },
    {
      id: 'jordan',
      name: 'Jordan Lee',
      username: '@jordan_lee',
      avatar: 'https://i.pravatar.cc/300?u=jordan',
      bio: 'DevOps lead. Automating all the things.',
    },
  ]

  let activeProfile = $state<Profile | null>(null)
</script>

<HoverCard.Root
  onTriggerValueChange={(e) => {
    activeProfile = profiles.find((p) => p.id === e.value) ?? null
  }}
>
  <p class={styles.Paragraph}>
    Reviewed by{' '}
    <HoverCard.Trigger value="sarah" class={styles.Trigger}>
      {#snippet asChild(props)}
        <a href="#" {...props()}>@sarah_chen</a>
      {/snippet}
    </HoverCard.Trigger>
    ,{' '}
    <HoverCard.Trigger value="alex" class={styles.Trigger}>
      {#snippet asChild(props)}
        <a href="#" {...props()}>@alex_r</a>
      {/snippet}
    </HoverCard.Trigger>
    , and{' '}
    <HoverCard.Trigger value="jordan" class={styles.Trigger}>
      {#snippet asChild(props)}
        <a href="#" {...props()}>@jordan_lee</a>
      {/snippet}
    </HoverCard.Trigger>
  </p>
  <Portal>
    <HoverCard.Positioner>
      <HoverCard.Content class={styles.Content}>
        <HoverCard.Arrow class={styles.Arrow}>
          <HoverCard.ArrowTip class={styles.ArrowTip} />
        </HoverCard.Arrow>
        {#if activeProfile}
          <div class={styles.Body}>
            <div class={styles.Header}>
              <img class={styles.Avatar} src={activeProfile.avatar} alt={activeProfile.name} />
            </div>
            <div>
              <p class={styles.Name}>{activeProfile.name}</p>
              <p class={styles.Username}>{activeProfile.username}</p>
            </div>
            <p class={styles.Bio}>{activeProfile.bio}</p>
          </div>
        {/if}
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Portal>
</HoverCard.Root>

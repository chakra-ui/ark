<script lang="ts">
  import { HoverCard } from '@ark-ui/svelte/hover-card'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/hover-card.module.css'
</script>

<HoverCard.Root openDelay={200} closeDelay={500}>
  <p>
    Liked by
    <HoverCard.Trigger class={styles.Trigger}>
      {#snippet asChild(props)}
        <a href="#profile" {...props()}>@sarah_chen</a>
      {/snippet}
    </HoverCard.Trigger>
    and 3 others
  </p>
  <Portal>
    <HoverCard.Positioner>
      <HoverCard.Content class={styles.Content}>
        <HoverCard.Arrow class={styles.Arrow}>
          <HoverCard.ArrowTip class={styles.ArrowTip} />
        </HoverCard.Arrow>
        <div class={styles.Body}>
          <img class={styles.Avatar} src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
          <div>
            <p class={styles.Name}>Sarah Chen</p>
            <p class={styles.Username}>@sarah_chen</p>
          </div>
          <p class={styles.Bio}>Design Engineer at Acme Inc.</p>
        </div>
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Portal>
</HoverCard.Root>

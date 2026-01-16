import { HoverCard } from '@ark-ui/solid/hover-card'
import { Portal } from 'solid-js/web'
import styles from 'styles/hover-card.module.css'

export const Delay = () => (
  <HoverCard.Root openDelay={200} closeDelay={500}>
    <p>
      Liked by{' '}
      <HoverCard.Trigger
        class={styles.Trigger}
        asChild={(props) => (
          <a href="#profile" {...props()}>
            @sarah_chen
          </a>
        )}
      />{' '}
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
)

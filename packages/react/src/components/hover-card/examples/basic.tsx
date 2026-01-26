import { HoverCard } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'
import styles from 'styles/hover-card.module.css'

export const Basic = () => (
  <HoverCard.Root>
    <p>
      Liked by{' '}
      <HoverCard.Trigger className={styles.Trigger} asChild>
        <a href="#profile">@sarah_chen</a>
      </HoverCard.Trigger>{' '}
      and 3 others
    </p>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content className={styles.Content}>
          <HoverCard.Arrow className={styles.Arrow}>
            <HoverCard.ArrowTip className={styles.ArrowTip} />
          </HoverCard.Arrow>
          <div className={styles.Body}>
            <div className={styles.Header}>
              <img className={styles.Avatar} src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
              <button type="button" className={styles.FollowButton}>
                Follow
              </button>
            </div>
            <div>
              <p className={styles.Name}>Sarah Chen</p>
              <p className={styles.Username}>@sarah_chen</p>
            </div>
            <p className={styles.Bio}>Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
            <div className={styles.Stats}>
              <div className={styles.Stat}>
                <span className={styles.StatValue}>2,456</span>
                <span className={styles.StatLabel}>Following</span>
              </div>
              <div className={styles.Stat}>
                <span className={styles.StatValue}>14.5K</span>
                <span className={styles.StatLabel}>Followers</span>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>
)

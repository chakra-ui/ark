import { HoverCard } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import styles from 'styles/hover-card.module.css'

export const Context = () => (
  <HoverCard.Root>
    <HoverCard.Context>
      {(context) => (
        <p>
          Liked by{' '}
          <HoverCard.Trigger className={styles.Trigger} asChild>
            <a href="#profile">@sarah_chen {context.open ? <ChevronUpIcon /> : <ChevronDownIcon />}</a>
          </HoverCard.Trigger>{' '}
          and 3 others
        </p>
      )}
    </HoverCard.Context>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content className={styles.Content}>
          <HoverCard.Arrow className={styles.Arrow}>
            <HoverCard.ArrowTip className={styles.ArrowTip} />
          </HoverCard.Arrow>
          <div className={styles.Body}>
            <img className={styles.Avatar} src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
            <div>
              <p className={styles.Name}>Sarah Chen</p>
              <p className={styles.Username}>@sarah_chen</p>
            </div>
            <p className={styles.Bio}>Design Engineer at Acme Inc.</p>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>
)

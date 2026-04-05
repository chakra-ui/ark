import { HoverCard } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'
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

export const MultipleTriggers = () => {
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null)

  return (
    <HoverCard.Root
      onTriggerValueChange={(e) => {
        setActiveProfile(profiles.find((p) => p.id === e.value) ?? null)
      }}
    >
      <p className={styles.Paragraph}>
        Reviewed by{' '}
        <HoverCard.Trigger value="sarah" asChild>
          <a href="#" className={styles.Trigger}>
            @sarah_chen
          </a>
        </HoverCard.Trigger>
        ,{' '}
        <HoverCard.Trigger value="alex" asChild>
          <a href="#" className={styles.Trigger}>
            @alex_r
          </a>
        </HoverCard.Trigger>
        , and{' '}
        <HoverCard.Trigger value="jordan" asChild>
          <a href="#" className={styles.Trigger}>
            @jordan_lee
          </a>
        </HoverCard.Trigger>
      </p>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content className={styles.Content}>
            <HoverCard.Arrow className={styles.Arrow}>
              <HoverCard.ArrowTip className={styles.ArrowTip} />
            </HoverCard.Arrow>
            {activeProfile && (
              <div className={styles.Body}>
                <div className={styles.Header}>
                  <img className={styles.Avatar} src={activeProfile.avatar} alt={activeProfile.name} />
                </div>
                <div>
                  <p className={styles.Name}>{activeProfile.name}</p>
                  <p className={styles.Username}>{activeProfile.username}</p>
                </div>
                <p className={styles.Bio}>{activeProfile.bio}</p>
              </div>
            )}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

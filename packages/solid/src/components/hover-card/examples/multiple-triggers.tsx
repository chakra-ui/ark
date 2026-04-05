import { HoverCard } from '@ark-ui/solid/hover-card'
import { Portal } from 'solid-js/web'
import { Show, createSignal } from 'solid-js'
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
  const [activeProfile, setActiveProfile] = createSignal<Profile | null>(null)

  return (
    <HoverCard.Root
      onTriggerValueChange={(e) => {
        setActiveProfile(profiles.find((p) => p.id === e.value) ?? null)
      }}
    >
      <p class={styles.Paragraph}>
        Reviewed by{' '}
        <HoverCard.Trigger
          value="sarah"
          asChild={(props) => (
            <a href="#" class={styles.Trigger} {...props()}>
              @sarah_chen
            </a>
          )}
        />
        ,{' '}
        <HoverCard.Trigger
          value="alex"
          asChild={(props) => (
            <a href="#" class={styles.Trigger} {...props()}>
              @alex_r
            </a>
          )}
        />
        , and{' '}
        <HoverCard.Trigger
          value="jordan"
          asChild={(props) => (
            <a href="#" class={styles.Trigger} {...props()}>
              @jordan_lee
            </a>
          )}
        />
      </p>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content class={styles.Content}>
            <HoverCard.Arrow class={styles.Arrow}>
              <HoverCard.ArrowTip class={styles.ArrowTip} />
            </HoverCard.Arrow>
            <Show when={activeProfile()}>
              {(profile) => (
                <div class={styles.Body}>
                  <div class={styles.Header}>
                    <img class={styles.Avatar} src={profile().avatar} alt={profile().name} />
                  </div>
                  <div>
                    <p class={styles.Name}>{profile().name}</p>
                    <p class={styles.Username}>{profile().username}</p>
                  </div>
                  <p class={styles.Bio}>{profile().bio}</p>
                </div>
              )}
            </Show>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

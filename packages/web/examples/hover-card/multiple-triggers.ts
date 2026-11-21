import '../../src/components/hover-card/index.js'

import styles from 'styles/hover-card.module.css'

const profiles = [
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

const trigger = (text: string, value?: string) =>
  `<ark-hover-card-trigger${value ? ` value="${value}"` : ''}><a href="#${value ? '' : 'profile'}" class="${styles.Trigger}">${text}</a></ark-hover-card-trigger>`

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const card = (body: string) => `
  <ark-hover-card-positioner class="${styles.Positioner}">
    <ark-hover-card-content class="${styles.Content}">
      <ark-hover-card-arrow class="${styles.Arrow}"><ark-hover-card-arrow-tip class="${styles.ArrowTip}"></ark-hover-card-arrow-tip></ark-hover-card-arrow>
      ${body}
    </ark-hover-card-content>
  </ark-hover-card-positioner>`

type Profile = (typeof profiles)[number]

const profileBody = (profile: Profile) => `
  <div class="${styles.Body}">
    <div class="${styles.Header}">
      <img class="${styles.Avatar}" src="${profile.avatar}" alt="${profile.name}" />
    </div>
    <div>
      <p class="${styles.Name}">${profile.name}</p>
      <p class="${styles.Username}">${profile.username}</p>
    </div>
    <p class="${styles.Bio}">${profile.bio}</p>
  </div>`

export function mount(root: HTMLElement) {
  const [sarah, alex, jordan] = profiles.map((profile) => trigger(profile.username, profile.id))
  const host = fragment(`
    <ark-hover-card>
      <p class="${styles.Paragraph}">Reviewed by ${sarah}, ${alex}, and ${jordan}</p>
      ${card('<div data-profile></div>')}
    </ark-hover-card>`)
  host.querySelector('ark-hover-card')!.addEventListener('triggervaluechange', (event) => {
    const profile = profiles.find((profile) => profile.id === event.detail.value)
    host.querySelector('[data-profile]')!.innerHTML = profile ? profileBody(profile) : ''
  })
  root.replaceChildren(host)
}

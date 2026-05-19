import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  ArkHoverCardArrow,
  ArkHoverCardArrowTip,
  ArkHoverCardContent,
  ArkHoverCardPositioner,
  ArkHoverCardRoot,
  ArkHoverCardTrigger,
} from '@ark-ui/angular/hover-card'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { hoverCardExampleStyles } from '../hover-card-example-styles'

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

@Component({
  selector: 'hover-card-multiple-triggers-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkHoverCardRoot,
    ArkHoverCardTrigger,
    ArkHoverCardPositioner,
    ArkHoverCardContent,
    ArkHoverCardArrow,
    ArkHoverCardArrowTip,
    ArkPortalComponent,
  ],
  template: `
    <div arkHoverCard [(triggerValue)]="activeValue" #root="arkHoverCard">
      <p class="Paragraph">
        Reviewed by
        <a arkHoverCardTrigger value="sarah" href="#">&#64;sarah_chen</a>
        ,
        <a arkHoverCardTrigger value="alex" href="#">&#64;alex_r</a>
        , and
        <a arkHoverCardTrigger value="jordan" href="#">&#64;jordan_lee</a>
      </p>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkHoverCardPositioner>
          <div arkHoverCardContent>
            <div arkHoverCardArrow>
              <div arkHoverCardArrowTip></div>
            </div>
            @if (activeProfile(); as profile) {
              <div class="Body">
                <div class="Header">
                  <img class="Avatar" [src]="profile.avatar" [alt]="profile.name" />
                </div>
                <div>
                  <p class="Name">{{ profile.name }}</p>
                  <p class="Username">{{ profile.username }}</p>
                </div>
                <p class="Bio">{{ profile.bio }}</p>
              </div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [hoverCardExampleStyles],
})
export class HoverCardMultipleTriggersExample {
  readonly activeValue = signal<string | null | undefined>(null)
  readonly activeProfile = computed(() => profiles.find((p) => p.id === this.activeValue()) ?? null)
}

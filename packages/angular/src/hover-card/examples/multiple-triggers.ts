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
  bio: string
}

const profiles: Profile[] = [
  { id: 'sarah', name: 'Sarah Chen', username: '@sarah_chen', bio: 'Design Engineer at Acme Inc.' },
  { id: 'alex', name: 'Alex Rivera', username: '@alex_r', bio: 'Full-stack developer.' },
  { id: 'jordan', name: 'Jordan Lee', username: '@jordan_lee', bio: 'DevOps lead.' },
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
      <p>
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
              <p>{{ profile.name }} — {{ profile.bio }}</p>
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

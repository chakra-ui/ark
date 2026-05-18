import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkAvatarFallback,
  ArkAvatarImage,
  ArkAvatarRoot,
  type AvatarLoadStatus,
  type AvatarStatusChangeDetails,
} from '@ark-ui/angular/avatar'
import { avatarExampleStyles } from '../avatar-example-styles'

@Component({
  selector: 'avatar-events-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRoot, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div class="vstack">
      <output>Status: {{ status() }}</output>
      <div arkAvatar (statusChange)="onStatusChange($event)">
        <span arkAvatarFallback>PA</span>
        <img arkAvatarImage src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
      </div>
    </div>
  `,
  styles: [avatarExampleStyles],
})
export class EventsExample {
  readonly status = signal<AvatarLoadStatus | 'loading...'>('loading...')

  onStatusChange(details: AvatarStatusChangeDetails) {
    this.status.set(details.status)
  }
}

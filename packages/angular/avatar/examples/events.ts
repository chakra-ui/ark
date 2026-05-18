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
      <p>Status: {{ status() }}</p>
      <div arkAvatar (statusChange)="onStatusChange($event)">
        <span arkAvatarFallback>PA</span>
        <img arkAvatarImage src="https://i.pravatar.cc/300?u=a" alt="avatar" />
      </div>
    </div>
  `,
  styles: [avatarExampleStyles],
})
export class EventsExample {
  readonly status = signal<AvatarLoadStatus | null>(null)

  onStatusChange(details: AvatarStatusChangeDetails) {
    this.status.set(details.status)
  }
}

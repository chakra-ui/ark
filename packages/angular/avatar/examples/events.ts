import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkAvatarFallback,
  ArkAvatarImage,
  ArkAvatarRoot,
  type AvatarLoadStatus,
  type AvatarStatusChangeDetails,
} from '@ark-ui/angular/avatar'

@Component({
  selector: 'avatar-events-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRoot, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div arkAvatar (statusChange)="onStatusChange($event)">
      <span arkAvatarFallback>PA</span>
      <img arkAvatarImage src="https://i.pravatar.cc/300?u=a" alt="avatar" />
      <p>Status: {{ status() }}</p>
    </div>
  `,
})
export class EventsExample {
  readonly status = signal<AvatarLoadStatus | null>(null)

  onStatusChange(details: AvatarStatusChangeDetails) {
    this.status.set(details.status)
  }
}

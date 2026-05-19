import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkAvatarFallback,
  ArkAvatarImage,
  ArkAvatarRootProvider,
  type AvatarStatusChangeDetails,
  useAvatar,
} from '@ark-ui/angular/avatar'
import { avatarExampleStyles } from '../avatar-example-styles'

@Component({
  selector: 'avatar-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRootProvider, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div arkAvatarRootProvider [value]="avatar">
      <span arkAvatarFallback>PA</span>
      <img arkAvatarImage src="https://i.pravatar.cc/300?u=a" alt="avatar" />
    </div>
  `,
  styles: [avatarExampleStyles],
})
export class ProviderExample {
  readonly avatar = useAvatar({
    context: () => ({
      onStatusChange: (details: AvatarStatusChangeDetails) => console.log('status changed', details),
    }),
  })
}

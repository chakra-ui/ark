import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkAvatarFallback, ArkAvatarImage, ArkAvatarRootProvider, useAvatar } from '@ark-ui/angular/avatar'

@Component({
  selector: 'avatar-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRootProvider, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div arkAvatarRootProvider [value]="avatar">
      <span arkAvatarFallback>PA</span>
      <img arkAvatarImage src="https://i.pravatar.cc/300?u=a" alt="avatar" />
    </div>
  `,
})
export class RootProviderExample {
  readonly avatar = useAvatar({ context: () => ({}) })
}

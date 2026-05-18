import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { ArkAvatarFallback, ArkAvatarImage, ArkAvatarRootProvider, useAvatar } from '@ark-ui/angular/avatar'
import { avatarExampleStyles } from '../avatar-example-styles'

@Component({
  selector: 'avatar-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRootProvider, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div class="vstack">
      <button class="avatar-button" type="button" (click)="changeAvatar()">Change Avatar</button>

      <div arkAvatarRootProvider [value]="avatar">
        <span arkAvatarFallback>PA</span>
        <img arkAvatarImage [src]="avatarSrc()" alt="avatar" />
      </div>
    </div>
  `,
  styles: [avatarExampleStyles],
})
export class RootProviderExample {
  readonly count = signal(0)
  readonly avatarSrc = computed(() => `https://i.pravatar.cc/300?u=${this.count()}`)
  readonly avatar = useAvatar({ context: () => ({}) })

  changeAvatar() {
    this.count.update((count) => count + 1)
  }
}

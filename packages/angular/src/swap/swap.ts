import { ChangeDetectionStrategy, Component, computed, inject, input, booleanAttribute } from '@angular/core'
import { ArkPresenceComponent } from '@ark-ui/angular/src/presence'

export interface SwapRootProps {
  swap?: boolean
  lazyMount?: boolean
  unmountOnExit?: boolean
}

export interface SwapIndicatorProps {
  type: 'on' | 'off'
}

export interface SwapProps extends SwapRootProps {}

@Component({
  selector: 'ark-swap, ark-swap-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-grid',
    'data-scope': 'swap',
    'data-part': 'root',
    '[attr.data-swap]': "swap() ? 'on' : 'off'",
  },
  template: `
    <ng-content />
  `,
})
export class ArkSwapRootComponent {
  readonly swap = input(false, { transform: booleanAttribute })
  readonly lazyMount = input(false, { transform: booleanAttribute })
  readonly unmountOnExit = input(false, { transform: booleanAttribute })
}

@Component({
  selector: 'ark-swap-indicator',
  standalone: true,
  imports: [ArkPresenceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: inline-flex; grid-area: 1 / 1',
    'data-scope': 'swap',
    'data-part': 'indicator',
    '[attr.data-type]': 'type()',
    '[attr.data-state]': "active() ? 'open' : 'closed'",
  },
  template: `
    <ark-presence
      [present]="active()"
      [lazyMount]="root.lazyMount()"
      [unmountOnExit]="root.unmountOnExit()"
      skipAnimationOnMount
    >
      <ng-template>
        <ng-content />
      </ng-template>
    </ark-presence>
  `,
})
export class ArkSwapIndicatorComponent {
  readonly type = input.required<'on' | 'off'>()
  protected readonly root = inject(ArkSwapRootComponent)
  protected readonly active = computed(() => (this.type() === 'on' ? this.root.swap() : !this.root.swap()))
}

export { ArkSwapRootComponent as ArkSwapComponent }

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  signal,
} from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ARK_ENVIRONMENT_TOKEN, type EnvironmentContext } from '../public-api'
import { EnvironmentUsageExample } from './usage'

@Component({
  selector: 'environment-shadow-root-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [ArkPortalComponent, EnvironmentUsageExample],
  providers: [
    {
      provide: ARK_ENVIRONMENT_TOKEN,
      useFactory: (elementRef: ElementRef<HTMLElement>): EnvironmentContext => ({
        getRootNode: () => elementRef.nativeElement.shadowRoot ?? undefined,
      }),
      deps: [ElementRef],
    },
  ],
  template: `
    @if (portalTarget()) {
      <ark-portal [target]="portalTarget()">
        <environment-usage-example />
      </ark-portal>
    }
  `,
})
export class EnvironmentShadowRootExample {
  protected readonly portalTarget = signal<HTMLElement | null>(null)

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      this.portalTarget.set(this.elementRef.nativeElement.shadowRoot as unknown as HTMLElement | null)
    })
  }
}

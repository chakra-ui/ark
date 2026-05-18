import { Component, DestroyRef, computed, inject, signal } from '@angular/core'
import * as drawer from '@zag-js/drawer'
import { normalizeProps } from '@ark-ui/angular/src/_zag'
import { ARK_DRAWER_STACK_CONTEXT, type UseDrawerStackContext } from './use-drawer-stack-context'

@Component({
  selector: 'ark-drawer-stack',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [{ provide: ARK_DRAWER_STACK_CONTEXT, useFactory: () => inject(ArkDrawerStack).context }],
})
export class ArkDrawerStack {
  private readonly stack = drawer.createStack()
  private readonly snapshot = signal(this.stack.getSnapshot())
  private readonly unsubscribe = this.stack.subscribe(() => this.snapshot.set(this.stack.getSnapshot()))

  readonly context: UseDrawerStackContext = {
    stack: this.stack,
    api: computed(() => drawer.connectStack(this.snapshot(), normalizeProps)),
  }

  constructor() {
    inject(DestroyRef).onDestroy(() => this.unsubscribe())
  }
}

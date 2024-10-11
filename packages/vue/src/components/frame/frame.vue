<script setup lang="ts">
import { type IframeHTMLAttributes, type VNode, ref, watch } from 'vue'
import { EnvironmentProvider } from '../../providers'
import FrameContent from './frame-content.vue'

export interface FrameBaseProps {
  head?: VNode | VNode[]
  srcDoc?: string
}

export interface FrameEmits {
  (event: 'mount'): void
  (event: 'unmount'): void
}

export interface FrameProps
  extends FrameBaseProps,
    /**
     * @vue-ignore
     */
    IframeHTMLAttributes {}

const emit = defineEmits<FrameEmits>()

const props = withDefaults(defineProps<FrameProps>(), {
  srcDoc:
    '<html><head><style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style></head><body><div class="frame-root"></div></body></html>',
})

const frameRef = ref<HTMLIFrameElement | null>(null)
const mountNode = ref<HTMLElement | null>(null)

defineExpose({ frameRef })

function getMountNode(frame: HTMLIFrameElement) {
  const doc = frame.contentWindow?.document
  if (!doc) return null
  return doc.body.querySelector<HTMLElement>('.frame-root') || doc.body
}

watch(frameRef, (node) => {
  if (!node) return

  const doc = node.contentWindow?.document
  if (!doc) return

  doc.open()
  doc.write(props.srcDoc)
  doc.close()

  mountNode.value = getMountNode(node)
})

watch(
  () => [frameRef.value, mountNode.value] as const,
  ([frameNode, mountNode], _oldValue, onCleanup) => {
    if (!frameNode || !frameNode.contentDocument) return

    const win = frameNode.contentWindow as Window & typeof globalThis
    if (!win) return

    const exec = () => {
      const rootEl = frameNode.contentDocument?.documentElement
      if (!rootEl || !mountNode) return
      frameNode.style.setProperty('--width', `${mountNode.scrollWidth}px`)
      frameNode.style.setProperty('--height', `${mountNode.scrollHeight}px`)
    }

    const resizeObserver = new win.ResizeObserver(exec)
    exec()

    if (mountNode) {
      resizeObserver.observe(mountNode)
    }

    onCleanup(() => {
      resizeObserver.disconnect()
    })
  },
)

const env = () => frameRef.value?.contentDocument ?? document
</script>

<template>
  <EnvironmentProvider :value="env">
    <iframe ref="frameRef" v-bind="$attrs">
      <Teleport v-if="mountNode" :to="mountNode">
        <FrameContent @mount="emit('mount')" @unmount="emit('unmount')">
          <slot></slot>
        </FrameContent>
      </Teleport>
      <Teleport v-if="frameRef" :to="frameRef.contentDocument!.head">
        <slot name="head"></slot>
      </Teleport>
    </iframe>
  </EnvironmentProvider>
</template>

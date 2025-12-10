import type { Directive } from 'vue'
import type { MenuGroupItem } from './index'

declare module 'vue' {
  interface ComponentCustomProperties {
    vContextMenu: Directive<HTMLElement, MenuGroupItem[]>
  }

  interface DirectiveBinding<
    Value = any,
    Modifiers extends string = string,
    Arg extends string = string,
    T = any,
  > {
    value: Value
  }
}

// 菜单位置
export interface PositionType {
  x: number
  y: number
  opacity?: number
}

// 分组项
export interface MenuGroupItem<T = any> {
  name: string
  params?: T
  description?: string
  method?: (params?: T) => void
  title?: string
  isHidden?: boolean
  children?: MenuGroupItem[]
  key?: string
}

// 菜单
export interface MenuItemType<T = any> {
  name: string
  params?: T
  description?: string
  method?: (params?: T) => void
  children?: MenuGroupType[]
  isHidden?: boolean
}

export interface MenuGroupType {
  title?: string
  children: MenuItemType[]
}

export interface DirectionType {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
}

export interface MenuItemType {
  name: string
  isHidden?: boolean
  params?: any
  method?: (params?: any) => void
  children?: MenuItemType[]
}

export interface DirectionType {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
}

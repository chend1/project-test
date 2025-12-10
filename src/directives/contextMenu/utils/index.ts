import type { MenuGroupItem, MenuGroupType, MenuItemType } from '../types'

/**
 * 将 MenuGroupItem 数组转换为 MenuGroupType 数组结构
 * @param menuGroupItems 原始菜单数组
 * @returns 转换后的菜单组数组
 */
export function transformMenu(list: MenuGroupItem[]): MenuGroupType[] {
  const groupMap = new Map<string, MenuGroupType>()
  const defaultGroup: MenuGroupType = { children: [] }

  const getGroup = (key?: string) => {
    if (!key) return defaultGroup
    if (!groupMap.has(key)) groupMap.set(key, { title: key, children: [] })
    return groupMap.get(key)!
  }

  const convertItem = (item: MenuGroupItem): MenuItemType => {
    const newItem: MenuItemType = {
      name: item.name,
      params: item.params,
      description: item.description,
      method: item.method,
      isHidden: item.isHidden,
      children: item.children ? transformMenu(item.children) : [],
    }
    return newItem
  }

  // 遍历所有 item 按 key 分组
  for (const item of list) {
    const group = getGroup(item.key)
    group.children.push(convertItem(item))
    // 如果 item.title 存在则写入分组 title
    if (item.title) group.title = item.title
  }

  const result = [...groupMap.values()]
  if (defaultGroup.children.length) result.unshift(defaultGroup)

  return result
}

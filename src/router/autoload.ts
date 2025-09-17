// src/router/autoload.ts
import type { RouteRecordRaw } from 'vue-router'

/**
 * 1. 扫描所有 views 目录下的 .vue 文件
 */
const modules = import.meta.glob('../views/**/*.vue')
console.log(modules)
/**
 * 把路径转成路由配置
 */
function pathToRoute(path: string, module: any): RouteRecordRaw {
  // 去掉 ../views 和 .vue
  const parts = path.split('/')
  const folderName = parts[parts.length - 2]
  const routePath = path
    .replace('../views', '')
    .replace('/' + folderName + '.vue', '')
    .replace('.vue', '')
  const name =
    routePath === '/'
      ? 'home'
      : routePath
          .split('/')
          .filter(Boolean)
          .map((p) => p[0].toUpperCase() + p.slice(1))
          .join('')
  return {
    path: routePath,
    name,
    component: module,
    meta: {
      title: routePath.split('/').pop() || 'home',
    },
  }
}

/**
 * 把扁平路由转成树形嵌套路由
 */
function buildTree(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  // const routeMap: Record<string, RouteRecordRaw> = {}
  const tree: RouteRecordRaw[] = []
  const parents = new Set()
  routes.forEach((route) => {
    const segments = route.path.split('/')
    const path = segments.slice(0, -1).join('/')
    if (!path) {
      parents.add(route.path)
    } else {
      let str = ''
      const segments = path.split('/').filter((p) => !!p)
      segments.forEach((p) => {
        str += '/' + p
        parents.add(str)
      })
    }
  })
  const list: string[] = Array.from(parents) as string[]
  console.log('list', list)
  const parentsTree: RouteRecordRaw[] = routes.map((route) => {
    return {
      ...route,
      children: [],
    }
  })
  list.forEach((path) => {
    const route = routes.find((item) => item.path === path)
    if (!route) {
      const name = path
        .split('/')
        .filter(Boolean)
        .map((p) => p[0].toUpperCase() + p.slice(1))
        .join('')
      parentsTree.push({
        path,
        name,
        children: [],
        meta: {
          title: name,
        },
        // component: null,
      })
    }
  })
  // console.log('parentsTree', parentsTree);
  const sortedTree = parentsTree.sort((a, b) => {
    return a.path.split('/').length - b.path.split('/').length
  })
  // console.log('sortedTree', sortedTree)
  sortedTree.forEach((r) => {
    const path = r.path.split('/').filter((p) => !!p)
    if (path.length === 1) {
      tree.push(r)
    } else {
      // tree.push(r)
      const pathKeys = r.path.split('/').filter((p) => !!p)
      console.log('pathKeys', pathKeys)
      let current = tree
      let targetPath = ''
      pathKeys.forEach((pathKey) => {
        targetPath += '/' + pathKey
        const node = current.find((item) => item.path === targetPath)
        if (!node) {
          current.push(r)
        }
        current = node?.children as RouteRecordRaw[]
      })
    }
  })

  // console.log('current', tree)
  return tree
}

/**
 * 主方法：生成路由表
 */
export function loadRoutes(): {
  routes: RouteRecordRaw[]
  menu: RouteRecordRaw[]
} {
  const routes: RouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    routes.push(pathToRoute(key, modules[key]))
  })
  // console.log(routes);
  const redirectRoute: RouteRecordRaw = {
    path: '/',
    redirect: routes[0].path,
  }
  const tree = buildTree([...routes])
  console.log('tree', tree)

  return {
    routes: [redirectRoute, ...tree],
    menu: routes,
  }
}

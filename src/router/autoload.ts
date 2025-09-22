// src/router/autoload.ts
import type { RouteRecordRaw } from 'vue-router'

const mapName : Record<string, string> = {
  'Home': '首页',
  'About': '关于',
  'Login': '登录',
  'Register': '注册',
  'Snapdom': 'snapdom测试',
  'Power': '权限管理',
  'PowerAccountManage': '账户管理',
  'PowerMenuManage': '菜单管理',
  'TextGradient': '文字滚动变色',
}

/**
 * 1. 扫描所有 views 目录下的 .vue 文件
 */
const modules = import.meta.glob('../views/**/*.vue')

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
      title: mapName[name] || name,
    },
  }
}

/**
 * 把扁平路由转成树形嵌套路由
 */
function buildTree(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  // 扁平化结构
  const tree: RouteRecordRaw[] = []
  // 所有父路径
  const parentPaths = new Set()
  routes.forEach((route) => {
    const segments = route.path.split('/')
    const path = segments.slice(0, -1).join('/')
    if (!path) {
      parentPaths.add(route.path)
    } else {
      let str = ''
      const segments = path.split('/').filter((p) => !!p)
      segments.forEach((p) => {
        str += '/' + p
        parentPaths.add(str)
      })
    }
  })
  const list: string[] = Array.from(parentPaths) as string[]
  // 将所有父路径转成对应路由
  const parentsTree: RouteRecordRaw[] = routes.map((route) => {
    return {
      ...route,
      children: [],
    }
  })
  // 判断哪些父级路径没有对应的路由
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
          title: mapName[name] || name,
        },
        component: null,
      })
    }
  })
  // 防止父级路由未及时添加到树形结构中
  const sortedTree = parentsTree.sort((a, b) => {
    return a.path.split('/').length - b.path.split('/').length
  })
  // 树形结构
  sortedTree.forEach((r) => {
    const path = r.path.split('/').filter((p) => !!p)
    if (path.length === 1) {
      tree.push(r)
    } else {
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
  return tree
}

/**
 * 主方法：生成路由表
 */
export function loadRoutes(): {
  routes: RouteRecordRaw[]
  menuList: RouteRecordRaw[]
} {
  const routes: RouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    routes.push(pathToRoute(key, modules[key]))
  })
  const redirectRoute: RouteRecordRaw = {
    path: '/',
    redirect: routes[0].path,
  }
  const tree = buildTree([...routes])

  return {
    routes: [redirectRoute, ...tree],
    menuList: tree,
  }
}

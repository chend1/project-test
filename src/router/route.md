## Vue3 自动路由生成
本工具通过扫描 `views` 目录下的所有 `.vue` 文件，自动生成路由表和菜单树，避免手动维护复杂的路由配置。


---

## 功能概览

1. **自动扫描**  
   使用 `import.meta.glob` 扫描 `../views/**/*.vue` 下的所有 Vue 组件。

2. **路径转路由**  
   自动将文件路径转换为 `vue-router` 的 `RouteRecordRaw` 路由配置。

3. **标题映射**  
   使用 `mapName` 将英文路由名映射为中文菜单标题。

4. **扁平转树形结构**  
   将扁平化的路由列表构造成树形嵌套路由，方便生成菜单。

5. **首页重定向**  
   自动生成 `/` 重定向到第一个路由页面。

---

## 主要配置

### 1. 路由中文名称映射

```ts
const mapName: Record<string, string> = {
  'Home': '首页',
  'About': '关于',
  'Login': '登录',
  'Register': '注册',
  'Power': '权限管理',
  'PowerAccountManage': '账户管理',
  'PowerMenuManage': '菜单管理',
}

```

### 2. 路由生成逻辑
#### 路径转换为路由 pathToRoute()
- 自动去掉 ../views 和 .vue
- 转换为小驼峰命名的 name
- 生成 RouteRecordRaw 对象

#### 构建树形路由 buildTree()
- 识别父子关系
- 自动补充缺失的父级路由
- 按路径层级排序，生成嵌套树

```bash
例如以下文件结构：
views/
 ├─ home/home.vue
 ├─ login/login.vue
 └─ power/
      ├─ accountManange/accountManange.vue
      └─ menuManage/menuManage.vue

```

会生成树形结构：
```ts
[
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/power',
    name: 'Power',
    meta: { title: '权限管理' },
    component: null,
    children: [
      {
        path: '/power/accountManange',
        name: 'PowerAccountManange',
        meta: { title: '账户管理' },
        component: () => import('../views/power/accountManange/accountManange.vue')
      },
      {
        path: '/power/menuManage',
        name: 'PowerMenuManage',
        meta: { title: '菜单管理' },
        component: () => import('../views/power/menuManage/menuManage.vue')
      }
    ]
  }
]

```
### 3.导出方法 loadRoutes()

```ts
export function loadRoutes(): {
  routes: RouteRecordRaw[]
  menuList: RouteRecordRaw[]
}

```

- routes 完整的路由表，包含首页重定向。
- menuList 树形化的菜单结构，可直接用于侧边栏菜单。

## 完整代码

```ts

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

```
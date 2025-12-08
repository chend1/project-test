import { createApp } from 'vue'
import App from './App.vue'
import './styles/base.css'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { vContextMenu } from '@/directives/contextMenu'

import router from './router'

const app = createApp(App)

app.directive('contextMenu', vContextMenu)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

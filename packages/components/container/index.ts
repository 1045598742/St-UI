import container from './src/container.vue'
import aside from './src/aside.vue'
import main from './src/main.vue'
import header from './src/header.vue'
import footer from './src/footer.vue'
import './style/index.ts'
import { installUtil } from '@st-ui/utils/install'

export const StAside = installUtil(aside)
export const StMain = installUtil(main)
export const StHeader = installUtil(header)
export const StFooter = installUtil(footer)

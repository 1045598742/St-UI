import button from './src/button.vue'
import buttonGroup from './src/button-group.vue'
import './style/index.ts'
import { installUtil } from '@st-ui/utils/install'

const StButton = installUtil(button, { name: 'st-button' })
const StButtonGroup = installUtil(buttonGroup, { name: 'st-button-group' })

export { StButton, StButtonGroup }

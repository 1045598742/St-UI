import checkbox from './src/checkbox.vue'
import checkboxGroup from './src/checkbox-group.vue'
import './style/index.ts'
import { installUtil } from '@st-ui/utils/install'

export const StCheckbox = installUtil(checkbox)
export const StCheckboxGroup = installUtil(checkboxGroup)

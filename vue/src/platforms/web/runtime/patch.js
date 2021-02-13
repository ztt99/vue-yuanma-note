/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)
/**
 * nodeOps处理dom的方法
 * modules处理属性的方法和ref，derective
 */
export const patch: Function = createPatchFunction({ nodeOps, modules })

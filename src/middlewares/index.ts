import { loadModuleMiddleware } from './loadModuleMiddleware'
import { staticMiddleware } from './staticMiddleware'
import { rewriteMiddleware } from './rewriteMiddleware'
import { vueSfcMiddleware } from './vueSfcMiddleware'

export default [
  loadModuleMiddleware,
  staticMiddleware,
  vueSfcMiddleware,
  rewriteMiddleware,
]


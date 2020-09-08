import Koa from 'koa'
import { join } from 'path'

const cwd = process.cwd()

export const loadModuleMiddleware = (app: Koa): void => {
  app.use(async (ctx, next) => {
    if ((ctx.path.startsWith('/@modules'))) {
      const moduleName = ctx.path.slice(10)
      const modulePkg = require(join(cwd, 'node_modules', moduleName, 'package.json'))
      ctx.path = join('/node_modules', moduleName, modulePkg.module)
      return next()
    }

    return next()
  })
}
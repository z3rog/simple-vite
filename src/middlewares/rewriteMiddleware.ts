import Koa from 'koa'
import { streamToString, isJsFile } from '../utils'

const env = process.env.NODE_ENV || 'development'

export const rewriteMiddleware = (app: Koa): void => {
  app.use(async (ctx, next) => {
    if (isJsFile(ctx.type)) {
      const content = await streamToString(ctx.body)
      ctx.body = content
        .replace(/(from\s+['"])(?![\.\/])/g, '$1/@modules/')
        .replace(/process\.env\.NODE_ENV/g, `"${env}"`)
      return next()
    }

    return next()
  })
}
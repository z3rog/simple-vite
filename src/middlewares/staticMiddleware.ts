import send from 'koa-send'
import Koa from 'koa'

export const staticMiddleware = (app: Koa): void => {
  app.use(async (ctx, next) => {
    await send(ctx, ctx.path, {
      root: process.cwd(),
      index: 'index.html',
    })
    await next()
  })
}
import Koa from 'koa'
import * as CompilerSfc from '@vue/compiler-sfc'
import { isVueSfcFile, isUndefined, streamToString, setResponseContentType } from '../utils'

export const vueSfcMiddleware = (app: Koa): void => {
  app.use(async (ctx, next) => {
    if (isVueSfcFile(ctx.path)) {
      const content = await streamToString(ctx.body)
      const { descriptor } = CompilerSfc.parse(content)

      if (isUndefined(ctx.query.type)) {
        let code = descriptor.script?.content
        
        ctx.body = 
          `import { render as __render } from "${ctx.path}?type=template"\n` +
          `${CompilerSfc.rewriteDefault(code!, '__script')} \n` +
          '__script.render = __render \n' +
          'export default __script'
      } else if (ctx.query.type === 'template') {
        ctx.body = CompilerSfc.compileTemplate(
          { source: descriptor.template?.content } as CompilerSfc.SFCTemplateCompileOptions
        ).code
      }

      setResponseContentType(ctx, 'js')
      return next()
    }

    return next()
  })
}
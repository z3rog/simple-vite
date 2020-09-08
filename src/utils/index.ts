import Koa from 'koa'

const mimeTypeMap: Record<string, string> = {
  'js': 'application/javascript'
}

export const streamToString = (stream: NodeJS.ReadableStream | string): Promise<string> => new Promise((resolve, reject) => {
  if (typeof stream === 'string') return resolve(stream)

  const chunks: Uint8Array[] = []
  stream.on('data', (chunk: Uint8Array) => chunks.push(chunk))
  stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
  stream.on('error', reject)
})

export const isJsFile = (type: string): boolean => type === mimeTypeMap.js

export const isVueSfcFile = (path: string): boolean => path.endsWith('.vue')

export const setResponseContentType = (ctx: Koa.BaseContext, type: string) => {
  ctx.type = mimeTypeMap[type]
}

export const isUndefined = (val: any): boolean => val === undefined
#!/usr/bin/env node

import Koa, { DefaultState, DefaultContext } from 'koa'
import middlewares from './middlewares'

const app = new Koa<DefaultState, DefaultContext>()

middlewares.forEach(middleware => middleware(app))

app.listen(3000, () => {
  console.log('[simple-vite] running in port 3000')
})

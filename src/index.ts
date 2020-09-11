#!/usr/bin/env node

import Koa, { DefaultState, DefaultContext } from 'koa'
import chalk from 'chalk'
import middlewares from './middlewares'

const app = new Koa<DefaultState, DefaultContext>()

middlewares.forEach(middleware => middleware(app))

app.listen(3000, () => {
  console.log(chalk.green('[simple-vite] running in port 3000'))
})

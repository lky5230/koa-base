'use strict'

const Router = require('koa-router')
const home = new Router()

home.get('/', async (ctx, next) => {
    await ctx.render('index', {message: 'home'})
    await next()
})

home.get('/list', async (ctx, next) => {
    await ctx.render('index', {message: 'home-list'})
    await next()
})

module.exports = home
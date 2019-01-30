const koa = require('koa')
const static_ = require('koa-static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const path = require('path')
const fs = require('fs')

const app = new koa()
const router = new Router()

// static
app.use(static_(
    path.join(__dirname, './static')
))

// bodyParser
app.use(bodyParser())

// views
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// utils
app.use(async (ctx, next) => {
    ctx.util = {
        logger: require('./utils/log'),
        mysql: require('./utils/mysql')
    }
    await next()
})

// index
app.use(async (ctx, next) => {
    if (ctx.request.path === '/')
    await ctx.render('index', {message: 'index'})
    await next()
})

// router
let urls = fs.readdirSync(__dirname + '/urls')
urls.forEach((element) => {
    let module = require(__dirname + '/urls/' + element)
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})
app.use(router.routes())

app.listen(3000, () => { console.log('server run in port 3000') })

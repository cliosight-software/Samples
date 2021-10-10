require('dotenv').config()

const express = require('express')
const path = require('path')
const fs = require('fs')
const key = fs.readFileSync('key.pem')
const cert = fs.readFileSync('cert.pem')
const https = require('https')

const app = express()
const server = https.createServer({key: key, cert: cert }, app)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))


app.use(require('express-session')({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}))

const { ExpressOIDC } = require('@okta/oidc-middleware')
const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile'
})

app.use(oidc.router)


app.get('/logout', (req, res) => {
  if (req.userContext) {
    const idToken = req.userContext.tokens.id_token
    const to = encodeURI(process.env.HOST_URL)
    const params = `id_token_hint=${idToken}&post_logout_redirect_uri=${to}`
    req.logout()
    res.redirect(`${process.env.OKTA_ORG_URL}/oauth2/default/v1/logout?${params}&output=embed`)
  } else {
    res.redirect('/')
  }
})



app.use('/', require('./routes/index'))

app.use('/getProdHtml', require('./routes/index'))
app.use('/getSvcHtml', require('./routes/index'))
app.use('/postHtml', require('./routes/index'))
app.use('/postSvcHtml', require('./routes/index'))

app.use('/stores', require('./routes/stores'))
app.use('/createStore', require('./routes/index'))
app.use('/fcs', require('./routes/fcs'))

app.use('/upload-multiple-images', require('./routes/files'))
app.use('/uploadfile', require('./routes/files'))
app.use('/listFileNames', require('./routes/files'))

app.use('/personnel', require('./routes/personnel'))
app.use('/managefiles', require('./routes/managefiles'))

app.use('/products', require('./routes/products'))
app.use('/services', require('./routes/services'))
app.use('/deliveryservices', require('./routes/deliveryservices'))

app.use('/pricingpromo', require('./routes/pricingpromo'))

app.use('/marketing', require('./routes/marketing'))
app.use('/contacts', require('./routes/contacts'))
app.use('/reports', require('./routes/reports'))

app.use('/calls', require('./routes/calls'))
app.use('/chatbot', require('./routes/chatbot'))

app.use('/builder', require('./routes/builder'))
app.use('/files', require('./routes/files'))

app.use('/invlog', require('./routes/invlog'))
app.use('/groupmembers', require('./routes/groupMembers'))
app.use('/addMembers', require('./routes/addMembers'))
app.use('/getGroups', require('./routes/getGroups'))
app.use('/externalAccounts', require('./routes/externalAccounts'))

app.use('/documentation', require('./routes/documentation'))
app.use('/about', require('./routes/about'))
app.use('/policies', require('./routes/policies'))
app.use('/import', require('./routes/importTools'))
app.use('/sunglasses', require('./routes/sunglasses'))


const port = process.env.PORT || 3000
server.listen(port, () => console.log(`App listening on secure port ${port}`))




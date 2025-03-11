const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword('Hola')
.addAnswer('Bienvenido a este chatbot', {capture: true}, (ctx) => {
    console.log('key: ' + Object.keys(ctx.key) +
        ' pushName: ' + ctx.pushName + //nombre de perfil
        ' broadcast: ' + ctx.broadcast + //boolean
        ' message: ' + Object.keys(ctx.message) +
        ' verifiedBizName: ' + ctx.verifiedBizName + //nombre de perfil
        ' body: ' + ctx.body + //cuerpo del msj
        ' from: ' + ctx.from); //num de telèfono
})

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['hola', 'alo'])
.addAction((ctx, { flowDynamic }) => {
    console.log(ctx.pushName);
})
.addAction(async (ctx, { flowDynamic }) => {
  return await flowDynamic('¡Hola ' + ctx.pushName + '! ¿En qué puedo ayudarte? Te comunicaste desde el: ' + ctx.from)
})
.addAction({ capture: true }, async (ctx, { flowDynamic }) => {
  const mensaje = ctx.body
  return await flowDynamic(`Has dicho: ${mensaje}`)
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

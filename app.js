const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const axios = require('axios')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['hola', 'alo'])
.addAction((ctx, { flowDynamic }) => {
    console.log(ctx.pushName);
})
.addAction(async (ctx, { flowDynamic }) => {
    const params = {
        'name': ctx.pushName,
        'number': ctx.from
    }
    const apiResponse = await axios.get('http://localhost:8080/hello/parametrized', { params }) //una api que responde Hello world!
        .then((response) => {
            // Manejar la respuesta exitosa
            console.log('cresponse:', response.data);
            return response.data;
        })
        .catch((error) => {
            // Manejar el error en caso de fallo
            console.error('Error al obtener usuarios:', error);
            return 'En este momento no podemos atenderte, intentalo mas tarde.'
        });
    return await flowDynamic('¡Hola ' + ctx.pushName + '! Este mensaje es generado por una api externa:' + apiResponse)
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

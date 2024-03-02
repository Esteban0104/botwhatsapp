const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])




const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['Asesor', 'hablar']).addAnswer(
    [
        '🙌 En un momento uno de nuestros asesores se pondra en contacto contigo'
        
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['Agendar', 'cita']).addAnswer(
    [
        '🚀 Perfecto, aqui puedes agendar tu cita virtual',
        'https://calendly.com/proxongroup/15min?month=2024-03',
        
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['Obtener asesoria gratis']).addAnswer(
    ['🤪 Perfecto, puedes apartar tu oferta de asesoria gratis aqui:', 'https://calendly.com/proxongroup/15min?month=2024-03', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a Proxon Group')
    .addAnswer(
        [
            'Selecciona una opcion',
            '👉 *Hablar con un asesor',
            '👉 *Agendar una cita',
            '👉 *Obtener mi asesoria gratis',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

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

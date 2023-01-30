const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app/routes/api.js']
const doc = {

    info: {
        title: 'HallyCell Api',
        description: 'HallyCell Project',
    },
    host: 'shop1.nokhbeghan.ir/api',
    schemes: ['https'],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            name: "authorization",
            in: "header"
        },
    },
    security: {
        apiKeyAuth: {}
    }

}
swaggerAutogen(outputFile, endpointsFiles, doc)

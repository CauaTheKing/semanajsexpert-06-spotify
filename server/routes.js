import config from "./config.js"
import Controller from "./controller.js"
import { logger } from "./util.js"

const {
    location,
    pages: {
        homeHTML
    }
} = config
const controller = new Controller()

async function routes(request, response) {
    const { method, url } = request

    if (method === 'GET' && url === '/') {
        response.writeHead(302, {
            'Location': location.home
        })

        return response.end()
    }

    if (method === 'GET' && url === '/home') {
        const {
            stream
        } = await controller.getFileStream(homeHTML)

        // padrão do response é text/html

        // response.writeHead(200, {
        //     'Content-Type': 'text/html'
        // })
        
        console.log('const stream:', stream)

        return stream.pipe(response)
    }

    return response.end('hello')
}

export async function handler(request, response) {
    return routes(request, response)
    .catch(error => logger.error(`Error: ${error.stack}`))
}
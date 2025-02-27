import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest
} from 'fastify'
import { CreatePlanerController } from './controllers/CreatePlanerController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/trip-planner", (request: FastifyRequest, reply: FastifyReply) => {
        console.log('rota chamada')

        let responseText = "```json\n{\n  \"nome\": \"Patric\",\n  \"destino\": \"Chile - Santiago\",\n  \"dataPartida\": \"10/10/2024\",\n  \"dataRetorno\": \"22/12/2024\",\n  \"objetivo\": \"Trabalho\",\n  \"numeroPessoas\": 2,\n  \"lugaresParaVisitar\": [\n    \"Centro Historico de Santiago\",\n    \"Cerro Santa Lucia\",\n    \"Museu Nacional de Bellas Artes\",\n    \"Parque Metropolitano de Santiago\",\n    \"Mercado Central\",\n    \"Palacio de la Moneda\",\n    \"Museu Nacional de Historia Natural\",\n    \"Museu Chileno de Arte Precolombino\",\n    \"Valle Nevado\",\n    \"Vina del Mar\",\n    \"Isla de Pascoa\"\n  ],\n  \"atividades\": [\n    \"Visitar museus e galerias de arte\",\n    \"Caminhar pelo centro histórico\",\n    \"Explorar parques e áreas verdes\",\n    \"Experimentar a culinária local\",\n    \"Fazer compras em mercados e boutiques\",\n    \"Participar de eventos culturais\",\n    \"Desfrutar de atividades ao ar livre\",\n    \"Visitar vinícolas\",\n    \"Fazer trilhas e caminhadas\",\n    \"Esquiar na Cordilheira dos Andes\"\n  ]\n}\n```";
        try {
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
            let jsonObject = JSON.parse(jsonString);
            console.log(jsonObject);
            return reply.send({data: jsonObject})
        } catch (error) {
            console.error("Erro ao converter para JSON:", error);
        }
        

        reply.send({ ok: true })
    })

    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePlanerController().handle(request, reply)
    })

}
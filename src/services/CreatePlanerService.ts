import { CreatePlanerRequest } from "../controllers/CreatePlanerController";
import { GoogleGenerativeAI } from "@google/generative-ai";


class CreatePlanerServices {
    async execute({ name, destination, departureDate, numberOfTravelers, returnDate, objective }: CreatePlanerRequest) {
        console.log("Recebendo os dados para criar o plano:", CreatePlanerServices);


        try {
            const genAI = new GoogleGenerativeAI(process.env.API_KEY!)

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

            const response = await model.generateContent(`
                Crie um planejamento de viajem completa para uma pessoa com nome: ${name} 
                com o destino para ${destination} com a data de partida: ${departureDate}, 
                data de retorno: ${returnDate}, 
                e com foco e objetivo em ${objective}, 
                com o numero de pessoas ${numberOfTravelers},
                quero que retorne lugares para se visitar no destino e o que fazer na cidade
                ignore qualquer outro parametro que não seja os 
                passados, retorne em json com as respectivas propriedades, 
                propriedade nome o nome da pessoa, propriedade destino 
                com data de partida, propriedade data de retorno, propriedade objetivo com o objetivo 
                atual, e não retorne nenhuma observação alem das passadas no prompt, 
                retorne em json e nenhuma propriedade pode ter acento.`);
            if (response.response && response.response.candidates) {

                const jsonText = response.response.candidates[0]?.content.parts[0].text as string;
                let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
                let jsonObject = JSON.parse(jsonString);

                
                return { data: jsonObject }
            }

            return { ok: true }

        } catch (err) {
            console.error("Erro ao obter itinerário da API:", err);
            throw new Error("Falid create")
        }
    }
}

export { CreatePlanerServices };

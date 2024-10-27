import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePlanerServices } from "../services/CreatePlanerService";

export interface CreatePlanerRequest {
  name: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  numberOfTravelers: number;
  notes?: string; 
  objective?: string;
}

class CreatePlanerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log("Rota chamada");

    const {
      name,
      destination,
      departureDate,
      returnDate,
      numberOfTravelers,
      notes,
      objective
    } = request.body as CreatePlanerRequest;

    const createPlaner = new CreatePlanerServices();

    try {
      const plane = await createPlaner.execute({
        name,
        destination,
        departureDate,
        returnDate,
        numberOfTravelers,
        notes,
        objective
      });

      reply.status(201).send(plane);
    } catch (error) {
      console.error("Erro ao criar plano de viagem:", error);
      reply.status(500).send({ error: "Erro interno ao criar plano de viagem." });
    }
  }
}

export { CreatePlanerController };

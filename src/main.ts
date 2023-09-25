import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { source as appDataSource } from "./db/connection";
import { User } from "./db/schema/user.schema";
import { Tenant1 } from "./db/schema/tenet1.schema";

const server = fastify({
  logger: true,
});

server.register(async () => {
  appDataSource.initialize().then(() => {
    console.log("db connected");

    // const userRepository = appDataSource.getRepository(User);
    // userRepository.update({ id: 1 }, { domain: "1", tenantSchema: "tenant1" });
  });
});

server.addHook("preHandler", async (request, reply) => {
  // const domain = request.headers.referer;
  const domain = "1";
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { domain } });

  if (!user) {
    reply.code(403).send({ error: "Invalid domain" });
    return;
  }

  try {
    await appDataSource.query(`SET search_path TO ${user.tenantSchema}`);
    console.log("connected to tenant schema");
    //now if you try to get User repository it will throw error
    //now we are connected with tenant schema
    let tenant1 = appDataSource.getRepository(Tenant1);
    const a = await tenant1.find();
    console.log("found", a);
  } catch (error) {
    reply.code(500).send({ error: "Failed to set schema" });
  }
});

server.get("/health", (req: FastifyRequest, rep: FastifyReply) => {
  return rep.send({ health: "good" });
});

server.listen(3000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});

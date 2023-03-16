const path = require("path");
const fs = require("fs");
const fastify = require("fastify")();
const cors = require("@fastify/cors");

fastify.get("/", async function (request, reply) {
  const { file, name } = request.query;

  const filepath = path.resolve(file)
  const filename = name ?? path.basename(filepath)
  const stats = fs.statSync(filepath);
  const fileSize = stats.size
  
  const stream = fs.createReadStream(filepath, "utf8");

  reply.header("Content-Type", "application/octet-stream");
  reply.header("Content-Length", fileSize);
  reply.header("Content-Disposition", `attachment; filename=${filename}`);

  return reply.send(stream);
});

const start = async () => {
  try {
    await fastify.register(cors);
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

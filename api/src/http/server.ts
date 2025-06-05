import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import { pipeline } from "node:stream";

import Fastify from "fastify";
import archiver from "archiver";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { createId } from "@paralleldrive/cuid2";
import { prismaClient } from "../../lib/prisma";
import { z } from "zod";

const pump = util.promisify(pipeline);
export const app = Fastify();

app.register(multipart);
app.register(cors);

app.post("/upload", async (request, reply) => {
  const files = request.files();
  const id = createId();
  const upload = await prismaClient.upload.create({
    data: {
      id,
      url: `http://localhost:3333/download/${id}`,
    },
  });

  for await (const { file, filename } of files) {
    const name = createId();
    const [_, extension] = filename.split(".");
    const formatedName = `${name}.${extension}`;

    await pump(
      file,
      fs.createWriteStream(
        path.resolve(__dirname, `../../temp/${formatedName}`)
      )
    );

    await prismaClient.file.create({
      data: {
        name: formatedName,
        uploadId: upload.id,
      },
    });
  }

  return reply.send(upload);
});

app.get("/download/:id", async (request, reply) => {
  try {
    const paramsSchema = z.object({ id: z.string() });
    const { id } = paramsSchema.parse(request.params);

    const upload = await prismaClient.upload.findUniqueOrThrow({
      where: { id },
      include: { files: true },
    });

    const archive = archiver("zip", { zlib: { level: 9 } });

    reply.header("Content-Type", "application/zip");
    reply.header("Content-Disposition", `attachment; filename="${id}.zip"`);

    archive.pipe(reply.raw);

    for (const file of upload.files) {
      const filePath = path.resolve(__dirname, `../../temp/${file.name}`);
      archive.file(filePath, { name: file.name });
    }

    await archive.finalize();
  } catch (error) {
    reply.status(500).send({ error: "Erro ao gerar arquivo zip." });
  }
});

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log("Server is running at port 3333");
});

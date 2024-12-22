export default defineEventHandler(async (event) => {
  return {
    hello: "world",
  };
  // console.log("shamada");

  // const { id } = getQuery(event); // Correctly retrieve query parameters

  // if (event.req.method === "GET") {
  //   // Use event.req.method instead of event.method
  //   try {
  //     const project = await prisma.project.findUnique({
  //       where: { id: Number(id) },
  //     });
  //     if (project) {
  //       event.res.statusCode = 200;
  //       event.res.end(JSON.stringify(project));
  //     } else {
  //       event.res.statusCode = 404;
  //       event.res.end(JSON.stringify({ error: "Project not found" }));
  //     }
  //   } catch (error) {
  //     event.res.statusCode = 500;
  //     event.res.end(JSON.stringify({ error: "Failed to fetch project" }));
  //   }
  // } else {
  //   event.res.statusCode = 405;
  //   event.res.end(JSON.stringify({ error: "Method not allowed" }));
  // }
});

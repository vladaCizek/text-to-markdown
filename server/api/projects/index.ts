export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    try {
      const projects = await prisma.project.findMany();
      event.res.status(200).json(projects);
    } catch (error) {
      event.res.status(500).json({ error: "Failed to fetch projects" });
    }
  } else if (event.method === "POST") {
    const { name, description } = event.body;
    try {
      const newProject = await prisma.project.create({
        data: { name, description },
      });
      event.res.status(201).json(newProject);
    } catch (error) {
      event.res.status(500).json({ error: "Failed to create project" });
    }
  } else {
    event.res.status(405).json({ error: "Method not allowed" });
  }
});

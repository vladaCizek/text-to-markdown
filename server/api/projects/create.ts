
export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return event.res.status(405).json({ error: "Method not allowed" });
  }

  const { name, description } = event.body;
  try {
    const newProject = await prisma.project.create({
      data: { name, description },
    });
    event.res.status(201).json(newProject);
  } catch (error) {
    event.res.status(500).json({ error: "Failed to create project" });
  }
});

export default defineEventHandler(async (event) => {
  const { id } = event.query;

  if (event.method === "PUT") {
    const { name, description } = event.body;
    try {
      const updatedProject = await prisma.project.update({
        where: { id: Number(id) },
        data: { name, description },
      });
      event.res.status(200).json(updatedProject);
    } catch (error) {
      event.res.status(500).json({ error: "Failed to update project" });
    }
  } else {
    event.res.status(405).json({ error: "Method not allowed" });
  }
});

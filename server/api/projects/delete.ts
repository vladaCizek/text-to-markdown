export default defineEventHandler(async (event) => {
  const { id } = event.query;

  if (event.method === "DELETE") {
    try {
      await prisma.project.delete({ where: { id: Number(id) } });
      event.res.status(204).send();
    } catch (error) {
      event.res.status(500).json({ error: "Failed to delete project" });
    }
  } else {
    event.res.status(405).json({ error: "Method not allowed" });
  }
});

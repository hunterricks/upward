export default function ProjectsPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          New Project
        </button>
      </div>
      <div className="border rounded-lg">
        <div className="p-6">
          <p className="text-muted-foreground">No projects found. Create a new project to get started.</p>
        </div>
      </div>
    </div>
  )
}
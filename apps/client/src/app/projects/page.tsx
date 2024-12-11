export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <div className="flex gap-4">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
            Filter
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Request Project
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Project List */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

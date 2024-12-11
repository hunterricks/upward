export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">No active projects</p>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">No messages</p>
          </div>
        </div>

        {/* Documents */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">No documents</p>
          </div>
        </div>
      </div>
    </div>
  )
}

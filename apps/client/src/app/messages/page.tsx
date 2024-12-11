export default function MessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Messages</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          New Message
        </button>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Message List */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-muted-foreground">No messages found.</p>
          </div>
        </div>

        {/* Message Content */}
        <div className="border rounded-lg overflow-hidden hidden md:block">
          <div className="p-6">
            <p className="text-muted-foreground">Select a message to view its content.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

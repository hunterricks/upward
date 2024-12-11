export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      <div className="max-w-2xl space-y-6">
        {/* Profile Information */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

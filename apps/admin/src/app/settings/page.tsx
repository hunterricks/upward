export default function SettingsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <p className="text-muted-foreground">Configure your admin dashboard preferences.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-muted-foreground">Manage your account and security preferences.</p>
        </div>
      </div>
    </div>
  )
}

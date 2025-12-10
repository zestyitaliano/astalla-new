import { DashboardHeader } from "@/components/dashboard/header";
import { SettingsForm } from "@/components/settings-form";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <DashboardHeader
                title="Site Settings"
                subtitle="Manage global site configuration, branding, and navigation."
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Settings", active: true }
                ]}
            />
            <SettingsForm />
        </div>
    );
}

import { Shell } from "@astalla/ui";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SettingsForm } from "@/components/settings-form";

export default function SettingsPage() {
    return (
        <Shell
            header={
                <DashboardHeader
                    title="Site Settings"
                    subtitle="Manage global site configuration, branding, and navigation."
                    breadcrumbs={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Settings", active: true }
                    ]}
                />
            }
            sidebar={<DashboardSidebar />}
        >
            <SettingsForm />
        </Shell>
    );
}

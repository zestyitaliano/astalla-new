import { Card } from "@astalla/ui";

export function AnalyticsChart() {
    return (
        <Card title="Visitor Analytics" className="h-full min-h-[300px]">
            <div className="flex items-end justify-between h-48 px-2 mt-4 gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="w-full relative group">
                        <div
                            className="bg-zinc-900 dark:bg-zinc-100 rounded-t-sm opacity-10 group-hover:opacity-20 transition-all duration-300 mx-auto w-3/4"
                            style={{ height: `${h}%` }}
                        />
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-t-sm transition-all duration-500 mx-auto w-3/4 hover:scale-x-110 origin-bottom"
                            style={{ height: `${h * 0.8}%`, opacity: 0.8 }}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-zinc-400 font-medium px-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        </Card>
    );
}

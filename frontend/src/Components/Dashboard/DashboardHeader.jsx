
    import { LayoutDashboard, LogOut } from "lucide-react";

    export default function DashboardHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6">

            {/* Right */}

            <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-[#14B24B] flex items-center justify-center text-white font-bold shadow">
                م
            </div>

            <h2 className="text-2xl font-bold">
                مشوار
            </h2>

            </div>

            {/* Left */}

            <div className="flex items-center gap-3">

            <button
                className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                transition
                hover:bg-yellow-50
                "
            >
                <LayoutDashboard size={20} />

                لوحتى
            </button>

            <button
                className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                transition
                hover:bg-yellow-400
                "
            >
                <LogOut size={20} />

                خروج
            </button>

            </div>

        </div>

        </header>
    );
    }
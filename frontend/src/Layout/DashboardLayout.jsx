
    import DashboardHeader from "../Components/Dashboard/DashboardHeader";

    export default function DashboardLayout({ children }) {
    return (
        <div
        dir="rtl"
        className="min-h-screen bg-[#F8F9F6]"
        >
        <DashboardHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
        </main>
        </div>
    );
    }
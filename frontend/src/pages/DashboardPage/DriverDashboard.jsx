
    import DashboardLayout from "../../Layout/DashboardLayout";
    import WelcomeSection from "../../Components/Dashboard/WelcomeSection";
    import DriverCards from "../../Components/Dashboard/DriverCards";
    import ProfileCard from "../../Components/Dashboard/ProfileCard";

    export default function DriverDashboard() {
    return (
        <DashboardLayout>

        <WelcomeSection
            name="محمد"
            message="جاهز تستقبل طلبات جديدة؟"
        />

        <DriverCards />

        <ProfileCard
            name="محمد أحمد"
            phone="01098765432"
            email="driver@gmail.com"
            role="سائق"
        />

        </DashboardLayout>
    );
    }

    import DashboardLayout from "../../Layout/DashboardLayout";
    import WelcomeSection from "../../Components/Dashboard/WelcomeSection";
    import CustomerCards from "../../Components/Dashboard/CustomerCards";
    import ProfileCard from "../../Components/Dashboard/ProfileCard";

    export default function CustomerDashboard() {
    return (
        <DashboardLayout>

        <WelcomeSection
            name="سلمى"
            message="وين رايح النهاردة؟"
        />

        <CustomerCards />

        <ProfileCard
            name="سلمى محمد"
            phone="01012345678"
            email="salma@gmail.com"
            role="عميل"
        />

        </DashboardLayout>
    );
    }
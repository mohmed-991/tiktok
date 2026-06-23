
    import ContactUs from "../../Components/ContactUs/ContactUs";
import Features from "../../Components/Features/Features";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
    import Hero from "../../Components/Hero/Hero";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
// import StepCard from "../../components/HowItWorks/StepCard";

    export default function LandingPage() {
    return (
        <>
        <Header />

        <main>
            <Hero />
        </main>

        <HowItWorks/>

        <Features/>

        <ContactUs/>

        <Footer/>

        {/* <StepCard/> */}
        
        </>
    );
    }
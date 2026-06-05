

    import StepCard from "./StepCard";

    import {
    MapPin,
    Star,
    CreditCard,
    } from "lucide-react";

    export default function HowItWorks() {
    const steps = [
        {
        step: 1,
        title: "حدد مكانك",
        description:
            "اكتب مكان الانطلاق ووصلتك بسهولة على الخريطة",
        icon: <MapPin className="text-green-600" />,
        },
        {
        step: 2,
        title: "اختر سائقك",
        description:
            "شوف السائقين القريبين والتقييمات واختر الأنسب",
        icon: <Star className="text-green-600" />,
        },
        {
        step: 3,
        title: "اركب وادفع",
        description:
            "تابع رحلتك وادفع بسهولة نقداً أو إلكترونياً",
        icon: <CreditCard className="text-green-600" />,
        },
    ];

    return (
        <section
        className="
        py-24
        bg-[#F6F8F6]
        "
        >
        <div className="container mx-auto px-4">
            <div className="text-center mb-14">
            <h2
                className="
                text-3xl
                font-bold
                mb-3
                "
            >
                إزاي تطلب مشوار؟
            </h2>

            <p className="text-gray-500">
                3 خطوات بس وتكون في طريقك
            </p>
            </div>

            <div
            className="
            flex
            justify-center
            gap-8
            flex-wrap
            "
            >
            {steps.map((step) => (
                <StepCard
                key={step.step}
                {...step}
                />
            ))}
            </div>
        </div>
        </section>
    );
    }

    import {
    Wallet,
    Shield,
    Clock3,
    MapPin,
    Phone,
    Star,
    } from "lucide-react";

    import FeatureCard from "./FeatureCard";

    export default function Features() {
    const features = [
        {
        title: "أسعار واضحة",
        description:
            "السعر يظهر قبل تأكيد الرحلة، من غير مفاجآت.",
        icon: <Wallet size={32} />,
        },

        {
        title: "سائقين موثوقين",
        description:
            "بنراجع بيانات كل سائق ورخصته قبل التشغيل.",
        icon: <Shield size={32} />,
        },

        {
        title: "وصول سريع",
        description:
            "نوصلك بأقرب توكتوك متاح في منطقتك.",
        icon: <Clock3 size={32} />,
        },

        {
        title: "تتبع الرحلة",
        description:
            "اعرف موقع التوكتوك والمدة المتبقية لحد ما يوصلك.",
        icon: <MapPin size={32} />,
        },

        {
        title: "تواصل مباشر",
        description:
            "اتصل أو ابعت رسالة لسائقك بضغطة زر.",
        icon: <Phone size={32} />,
        },

        {
        title: "تقييم وثقة",
        description:
            "قيم سائقك بعد كل رحلة لضمان أفضل خدمة.",
        icon: <Star size={32} />,
        active: true,
        },
    ];

    return (
        <section
        className="
        py-24
        bg-[#f8faf8]
        "
        >
        <div
            className="
            max-w-7xl
            mx-auto
            px-5
            "
        >
            {/* Heading */}

            <div className="text-center mb-16">
            <h2
                className="
                text-5xl
                font-bold
                mb-4
                "
            >
                ليه تختار مشوار؟
            </h2>

            <p
                className="
                text-xl
                text-gray-500
                "
            >
                منصة بسيطة، آمنة، ومناسبة لكل الناس
            </p>
            </div>

            {/* Grid */}

            <div
            className="
            grid
            gap-6

            md:grid-cols-2
            lg:grid-cols-3
            "
            >
            {features.map((feature, index) => (
                <FeatureCard
                key={index}
                {...feature}
                />
            ))}
            </div>
        </div>
        </section>
    );
    }
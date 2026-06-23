    import tuktuk from "../../assets/images/tuktuk-hero-CKq49YH5.png";
    import { useNavigate } from "react-router-dom";

    export default function Hero() {
            const navigate = useNavigate();
    return (
        <section
        className="
        px-6
        lg:px-20
        pt-40
        pb-16
        lg:pt-40
        flex
        flex-col-reverse
        lg:flex-row
        items-center
        justify-between
        gap-12
        "
        >
        {/* Content */}

        <div className="max-w-[650px] text-center lg:text-right">

            {/* Badge */}

            <div
            className="
            inline-flex
            items-center
            gap-3
            bg-yellow-100
            px-5
            py-2
            rounded-full
            mb-8
            "
            >
            <span className="font-bold text-lg">
                أسرع طريقة لحجز التوكتوك
            </span>

            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            </div>

            {/* Title */}

            <h1
            className="
            text-4xl lg:text-5xl
            font-extrabold
            leading-tight
            text-slate-900
            "
            >
            مشوارك يبدأ{" "}

            <span className="text-green-600">
                بضغطة زر
            </span>
            </h1>

            {/* Description */}

            <p
            className="
            mt-8
            text-xl
            lg:text-2xl
            text-gray-600
            leading-relaxed
            "
            >
            احجز توكتوك قريب منك في ثواني، بأسعار واضحة
            وسائقين موثوقين. ولو سائق، انضم لينا وزود
            دخلك اليومي.
            </p>

            {/* Buttons */}

            <div
            className="
            flex
            flex-col
            sm:flex-row
            gap-4
            mt-10
            "
            >
            <button
                onClick={() =>
    navigate("/auth", {
        state: {
        role: "customer",
        mode: "register",
        },
    })
    }
                className="
                bg-green-500
                hover:bg-green-600
                transition-all
                duration-300
                text-white
                px-10
                py-4
                rounded-3xl
                text-xl
                font-bold
                shadow-lg
                "
            >
                أنا عميل — اطلب توكتوك
            </button>

                <button
                onClick={() =>
    navigate("/auth", {
        state: {
        role: "driver",
        mode: "register",
        },
    })
    }
                className="
                bg-yellow-400
                hover:bg-yellow-500
                transition-all
                duration-300
                text-black
                px-10
                py-4
                rounded-3xl
                text-xl
                font-bold
                "
            >
                أنا سائق — انضم لينا
            </button>
            </div>

            {/* Features */}

            <div
            className="
            flex
            flex-wrap
            gap-8
            mt-10
            text-gray-600
            text-lg
            "
            >
            <span>✓ سائقين موثقين</span>
            <span>✓ وصول سريع</span>
            <span>✓ تسعير شفاف</span>
            </div>
        </div>

        {/* Image */}

        <div>
            <img
            src={tuktuk}
            alt="tuktuk"
            className="
            w-[280px]
            lg:w-[500px]
            hover:scale-105
            transition-all
            duration-500
            "
            />
        </div>
        </section>
    );
    }
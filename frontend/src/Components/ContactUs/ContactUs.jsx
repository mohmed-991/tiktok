    
import { useNavigate } from "react-router-dom";
    export default function ContactUs() {
            const navigate = useNavigate();
    return (
        <section className="px-5 py-16">
        <div
            className="
            max-w-6xl
            mx-auto
            bg-[#10B34A]
            rounded-[32px]
            py-20
            px-6
            text-center
            shadow-lg
            "
        >
            <h2
            className="
            text-white
            text-4xl
            md:text-5xl
            font-bold
            mb-6
            "
            >
            جاهز تبدأ مشوارك؟
            </h2>

            <p
            className="
            text-white/90
            text-lg
            md:text-xl
            mb-10
            "
            >
            اختر دورك وابدأ في ثواني
            </p>

            <div
            className="
            flex
            flex-col
            sm:flex-row
            justify-center
            items-center
            gap-4
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
                bg-white
                text-green-600
                font-bold
                px-10
                py-4
                rounded-2xl
                transition
                hover:scale-105
                "
            >
                أنا عميل
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
                bg-[#FFC61B]
                text-black
                font-bold
                px-10
                py-4
                rounded-2xl
                transition
                hover:scale-105
                "
            >
                أنا سائق
            </button>
            </div>
        </div>
        </section>
    );
    }
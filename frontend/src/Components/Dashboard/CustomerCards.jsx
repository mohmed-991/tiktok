
    import {
    MapPinned,
    History,
    } from "lucide-react";

    export default function CustomerCards() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* طلب جديد */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <MapPinned
                className="text-green-600"
                size={28}
            />

            </div>

            <h2 className="text-2xl font-bold mt-6">
            اطلب توكتوك
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
            ابدأ رحلة جديدة بسهولة واختر مكان الانطلاق والوجهة.
            </p>

            <button
            className="
            mt-8
            bg-green-600
            hover:bg-green-700
            transition
            text-white
            rounded-xl
            px-8
            py-3
            "
            >
            اطلب الآن
            </button>

        </div>

        {/* الرحلات */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border">

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

            <History
                className="text-yellow-500"
                size={28}
            />

            </div>

            <h2 className="text-2xl font-bold mt-6">
            رحلاتى السابقة
            </h2>

            <p className="text-gray-500 mt-3">
            لا توجد رحلات حتى الآن.
            </p>

        </div>

        </div>
    );
    }

    import {
    Clock3,
    Star,
    Truck,
    } from "lucide-react";

    export default function DriverCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
            icon={<Clock3 />}
            title="ساعات العمل"
            value="0"
        />

        <Card
            icon={<Star />}
            title="التقييم"
            value="--"
        />

        <Card
            icon={<Truck />}
            title="رحلات اليوم"
            value="0"
        />

        </div>
    );
    }

    function Card({
    icon,
    title,
    value,
    }) {
    return (
        <div className="bg-white rounded-3xl border shadow-sm p-8">

        <div className="text-green-600">
            {icon}
        </div>

        <h2 className="text-5xl font-bold mt-5">
            {value}
        </h2>

        <p className="text-gray-500 mt-4">
            {title}
        </p>

        </div>
    );
    }
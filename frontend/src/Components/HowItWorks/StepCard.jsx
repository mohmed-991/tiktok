

    export default function StepCard({
    step,
    icon,
    title,
    description,
    }) {
    return (
        <div
        className="
        relative
        bg-white
        border
        border-gray-200
        rounded-xl
        p-6
        w-[300px]
        h-[160px]
        text-center
        shadow-sm
        "
        >
        {/* Step Number */}
        <div
            className="
            absolute
            -top-3
            right-4
            w-7
            h-7
            rounded-full
            bg-green-600
            text-white
            text-sm
            flex
            items-center
            justify-center
            font-semibold
            "
        >
            {step}
        </div>

        <div className="flex justify-center mb-3">
            {icon}
        </div>

        <h3 className="font-bold text-gray-900 mb-2">
            {title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed">
            {description}
        </p>
        </div>
    );
    }

    import React from "react";

    export default function FeatureCard({
    icon,
    title,
    description,
    active = false,
    }) {
    return (
        <div
        className={`
        bg-white
        rounded-3xl
        border
        p-8
        transition-all
        duration-300
        hover:shadow-md

        ${
            active
            ? "border-green-400"
            : "border-gray-200"
        }
        `}
        >
        <div className="flex justify-end mb-6">
            <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-green-50
            flex
            items-center
            justify-center
            text-green-600
            "
            >
            {icon}
            </div>
        </div>

        <h3
            className="
            text-4xl
            font-bold
            text-right
            mb-4
            "
        >
            {title}
        </h3>

        <p
            className="
            text-right
            text-gray-500
            leading-8
            "
        >
            {description}
        </p>
        </div>
    );
    }
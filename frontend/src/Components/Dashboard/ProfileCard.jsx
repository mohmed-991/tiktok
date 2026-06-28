
    import { User, Mail, Phone, BadgeCheck } from "lucide-react";

    export default function ProfileCard({
    name,
    phone,
    email,
    role,
    }) {
    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border mt-8">

        <h2 className="text-2xl font-bold mb-8">
            بياناتي
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
            <User className="text-green-600" />
            <div>
                <p className="text-gray-500 text-sm">الاسم</p>
                <p className="font-semibold">{name}</p>
            </div>
            </div>

            <div className="flex items-center gap-3">
            <Phone className="text-green-600" />
            <div>
                <p className="text-gray-500 text-sm">رقم الهاتف</p>
                <p className="font-semibold">{phone}</p>
            </div>
            </div>

            <div className="flex items-center gap-3">
            <Mail className="text-green-600" />
            <div>
                <p className="text-gray-500 text-sm">البريد الإلكترونى</p>
                <p className="font-semibold">{email}</p>
            </div>
            </div>

            <div className="flex items-center gap-3">
            <BadgeCheck className="text-green-600" />
            <div>
                <p className="text-gray-500 text-sm">نوع الحساب</p>
                <p className="font-semibold">{role}</p>
            </div>
            </div>

        </div>

        </div>
    );
    }

    import logo from "../../assets/images/logo.png";

    export default function Logo() {
    return (
        <div className="flex items-center gap-1">
        <img src={logo} alt="مشوارك logo" className="w-24 h-24 object-contain" />

        <div className="leading-tight">
            <h2 className="font-bold text-2xl text-gray-900">
            مشوار
            </h2>

            <p className="text-gray-500 text-xs">
            توكتوك بضغطة زر
            </p>
        </div>
        </div>
    );
    }
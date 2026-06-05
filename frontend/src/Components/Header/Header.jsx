
    import Logo from "../Logo/Logo";
    import Navbar from "../Navbar/Navbar";

    export default function Header() {
    return (
        <header
        className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-white
        border-b
        border-gray-200
        "
        >
        <div
            className="
            h-24
            px-6
            lg:px-16
            flex
            items-center
            justify-between
            "
        >
            <Logo />
            <Navbar />
        </div>
        </header>
    );
    }
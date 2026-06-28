
export default function WelcomeSection({
    name,
    message
}) {
    return (

        <section className="mb-10">

            <h1 className="text-4xl md:text-5xl font-bold">

                أهلاً،

                <span className="mx-2">

                    {name}

                </span>

                👋

            </h1>

            <p className="text-gray-500 mt-3 text-lg">

                {message}

            </p>

        </section>

    );
}
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const Login = () => {
    const [providers, setstate] = useState()

    useEffect(() => {
        (async () => {
            const res = await getServereSideProps();
            setstate(res.providers);
        })()
    }, []);

    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
            {providers && (
                <>
                    {Object.values(providers).map(provider => (
                        <div key={provider.id}>
                            <button className="bg-[#18D860] text-white p-5 rounded-full"
                                onClick={() => signIn(provider.id, { callbackUrl: "/" , redirect: true})}
                            >
                                Log in with  {provider.name}
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Login

//server side render to get all of the providers
//server side render: will run on the server before the page get delivered every time
export const getServereSideProps = async () => {
    const providers = await getProviders();

    return {
        providers
    }
}
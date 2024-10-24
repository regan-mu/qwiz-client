import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-5 h-screen overflow-hidden bg-lightBg">
            <img className="h-80 w-96" src="/404.png" alt="404" />
            <div className="h-full flex flex-col gap-2">
                <h2 className="text-center text-2xl font-bold font-poppins">Page not found</h2>
                <Link to="/" className="bg-brand text-whiteSmoke py-2 px-7 rounded-full text-center">Go to Home</Link>
            </div>
        </div>
    )
}

export default PageNotFound;
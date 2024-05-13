import { Logo } from "@/components/logo";
import Image from "next/image";

import "@/app/style.css";


const ClerkLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return (
        <section className="h-full w-full flex justify-center items-center">
            <div className="bg-white m-6 p-4 rounded-md justify-center items-center h-fit w-fit grid grid-cols-2 gap-3">
                
                <div className="flex justify-center items-center md:grid cols-fr">
                    <div className="flex w-fit">
                        <Logo />
                    </div>
                    <div >
                            {children}
                        </div>
                </div>
                
                    
                <div className="hidden md:grid cols-fr justify-center items-center">
                    <img
                            src="/Illustration.svg"
                            alt="Logo"
                            className="size-full"
                        />
                </div>
            </div>
        </section>
    );
};

export default ClerkLayout;
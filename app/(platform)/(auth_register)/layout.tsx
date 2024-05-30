import { Logo } from "@/components/logo";

import "@/app/style.css";
import Link from "next/link";


const AuthRegisterLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return (
        <section className="h-full p-6 w-full flex items-start justify-center">
            <div className="bg-white p-4 rounded-md h-[96%] min-w-full 
            inline-grid
            md:grid-cols-2 gap-[5%] 
            ">
                <div className="hidden h-full w-full
                    md:col-span-1 md:inline-block                   
                    bg-clip-content bg-no-repeat bg-contain bg-center bg-[url('/Illustration.svg')]
                    ">
                    
                </div>
                <div className="col-span-1 inline-block ">
                    <Link href="/" className="hover:opacity-75 transition w-fit self-start ">
                        <Logo />
                    </Link>
                    <div className="h-full flex items-center" >
                            <div className="flex w-5/6 m-auto">
                                {children}
                            </div>
                            
                        </div>
                </div>
                
                    
                
            </div>
        </section>
    );
};

export default AuthRegisterLayout;
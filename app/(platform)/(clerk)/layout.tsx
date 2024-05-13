import { Logo } from "@/components/logo";

import "@/app/style.css";


const ClerkLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return (
        <section className="h-full w-full flex justify-center ">
            <div className="bg-white p-6 m-6 rounded-md ">
                <div className="w-fit">
                    <Logo  />
                </div>
                <div className="flex items-center justify-center gap-4 p-4">
                    <div className=" ">
                        {children}
                    </div>
                    <div>
                        <img className="p-10 hidden md:block" src="Illustration.svg" alt=""  />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClerkLayout;
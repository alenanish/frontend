import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
})  => {
    return (
        <div className="h-full bg-violet-100">
            <Navbar />
            <main className="pt-40 pb-20 bg-violet-100">
                {children}
            </main>
            
        </div>
    );
};

export default MarketingLayout;


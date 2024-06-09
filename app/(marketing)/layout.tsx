import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
})  => {
    return (
        <div className="h-full bg-primary/20">
            <Navbar />
            <main className="pt-40 pb-20">
                {children}
            </main>
            
        </div>
    );
};

export default MarketingLayout;


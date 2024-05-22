import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
})  => {
    return (
        <div className="h-full flex flex-row bg-violet-100">
            <Sidebar />
            <main className="w-full h-full flex items-center justify-center">
                {children}
            </main>
            
        </div>
    );
};

export default DashboardLayout;


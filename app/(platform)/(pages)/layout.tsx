import { Sidebar } from "./_components/sidebar"

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
})  => {
    return (
        <div className="h-full flex flex-row bg-violet-100 gap-2">
            
            <div className="">
                <Sidebar />  
            </div>

            <div className="w-full h-full block  ">
                <main>
                    {children}
                </main>
                
            </div>
            
        </div>
    );
};

export default DashboardLayout;


import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='m-auto max-w-[1300px]'>
            <Navbar />
            <div className='md:flex'>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}
export const dynamic = 'force-dynamic'
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-dvh min-h-screen flex items-center justify-center ">
            <div className="absolute top-6 right-6 flex gap-4 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-black">
                    홈으로
                </Link>
            </div>
            {children}
        </div>
    );
}

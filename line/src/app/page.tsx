import { Button } from '@/components/ui/button';
import { UsersRound, Store, MoveRight, MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="relative flex items-center justify-center h-dvh">
            <div className="absolute top-6 right-6 flex gap-4 text-sm font-medium text-gray-600">
                <Link href="/login" className="hover:text-black">
                    로그인
                </Link>
                <Link href="/signup" className="hover:text-black">
                    회원가입
                </Link>
            </div>

            <div className="flex gap-1.5">
                {/* 예약 버튼 */}
                <Link href="/reservation">
                    <Button className="flex-col w-35 h-45" variant="outline">
                        <UsersRound className="min-w-8 min-h-8" />
                        예약하러가기
                        <MoveLeft className="w-5 h-5 min-w-5 min-h-5" />
                    </Button>
                </Link>
                {/* 매장등록 버튼 */}
                <Link href="/store">
                    <Button className="flex-col w-35 h-45" variant="outline">
                        <Store className="min-w-8 min-h-8" />
                        매장등록
                        <MoveRight className="w-5 h-5 min-w-5 min-h-5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

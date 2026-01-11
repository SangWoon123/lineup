import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UsersRound, Store, ArrowRight, CalendarCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] gap-8">
            {/* Header Section */}
            <header className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
                        L
                    </div>
                    <span className="text-xl font-bold tracking-tight">LineUp</span>
                </div>
                <div className="flex gap-4 text-sm font-medium text-muted-foreground">
                    <Link href="/login" className="hover:text-primary transition-colors">
                        로그인
                    </Link>
                    <Link href="/signup" className="hover:text-primary transition-colors">
                        회원가입
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center gap-12 pb-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <Badge variant="secondary" className="mb-2">
                        Smart Reservation System
                    </Badge>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight lg:text-7xl">
                        기다림 없는 <br />
                        <span className="text-primary">즐거운 경험</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        더 이상 줄 서서 기다리지 마세요. <br className="hidden sm:inline" />
                        스마트한 예약/웨이팅 관리로 당신의 시간을 아껴드립니다.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {/* Customer Card */}
                    <Link href="/reservation" className="group">
                        <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CalendarCheck className="w-32 h-32" />
                            </div>
                            <CardHeader>
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                    <UsersRound className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-2xl">손님이신가요?</CardTitle>
                                <CardDescription className="text-base">
                                    주변 맛집과 핫플레이스를 찾아보고 <br />
                                    간편하게 예약/웨이팅을 등록하세요.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid gap-2 mb-6 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" /> 실시간 웨이팅 확인
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" /> 간편한 모바일 예약
                                    </li>
                                </ul>
                                <Button className="w-full group-hover:bg-primary/90">
                                    매장 찾기
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Store Owner Card */}
                    <Link href="/store" className="group">
                        <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Store className="w-32 h-32" />
                            </div>
                            <CardHeader>
                                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400">
                                    <Store className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-2xl">사장님이신가요?</CardTitle>
                                <CardDescription className="text-base">
                                    우리 매장을 등록하고 <br />
                                    효율적으로 고객을 관리해보세요.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid gap-2 mb-6 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" /> 효율적인 좌석/대기 관리
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" /> 노쇼 방지 및 고객 분석
                                    </li>
                                </ul>
                                <Button
                                    variant="outline"
                                    className="w-full group-hover:border-primary group-hover:text-primary"
                                >
                                    매장 등록하기
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
                <p>&copy; 2026 LineUp. All rights reserved.</p>
            </footer>
        </div>
    );
}

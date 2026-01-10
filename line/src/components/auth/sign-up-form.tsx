'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Store, User } from 'lucide-react';
import { useState } from 'react';
import { signUpAction } from '@/app/(auth)/actions';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
    const [role, setRole] = useState('USER');
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const response = await signUpAction(formData);

        if (response.success) {
            alert('회원가입이 완료되었습니다!');
            router.push('/');
            return;
        }
        alert(response.message);
        return;
    }

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>SignUp</CardTitle>
                <CardDescription>
                    {role === 'USER'
                        ? '간편하게 예약하고 줄서기를 시작하세요.'
                        : '매장을 등록하고 손님을 효율적으로 관리하세요.'}
                </CardDescription>
                <CardAction>
                    <Button>
                        <Link href="/login">Login</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form id="signup-form" action={handleSubmit}>
                    <Tabs onValueChange={(v) => setRole(v)} className="mb-4" defaultValue="USER">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="USER">
                                <User />
                                일반 회원
                            </TabsTrigger>
                            <TabsTrigger value="ADMIN">
                                <Store />
                                매장 사장님
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {/* Role */}

                    <input type="hidden" name="role" value={role} />
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input name="name" type="text" placeholder="김철수" required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Password</Label>
                            <Input name="password" id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button form="signup-form" type="submit" className="w-full">
                    {role === 'USER' ? '일반 회원으로 가입' : '사장으로 가입'}
                </Button>
                <div className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <Link href="#" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}

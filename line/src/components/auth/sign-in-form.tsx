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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function SignInForm() {
    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>SignIn</CardTitle>
                <CardDescription>회원으로 진행하여 원하는 매장 예약을 진행해보세요.</CardDescription>
                <CardAction>
                    <Button>
                        <Link href="/signup">SignUp</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form action="">
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
                <div className="mt-4 text-sm text-center">
                    Don't have an account?{' '}
                    <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                        SignUp
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}

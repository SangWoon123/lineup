'use client';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { Tooltip } from '@/components/ui/tooltip';
import { useRegisterStore } from '@/hooks/use-register-store';
import { InfoIcon, MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default function Store() {
    const { register } = useRegisterStore();

    return (
        <div className="flex justify-center items-center h-dvh">
            <form className="flex-col" action={register}>
                <InputGroup>
                    <InputGroupInput placeholder="매장을 입력하세요." type="text" name="name" />
                    <InputGroupAddon align="inline-end">
                        <Tooltip>
                            <InfoIcon></InfoIcon>
                        </Tooltip>
                    </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                    <InputGroupInput placeholder="주소" type="text" name="location" />
                </InputGroup>

                <InputGroup>
                    <InputGroupInput placeholder="인원" type="text" name="seat" />
                </InputGroup>

                <Button className="w-full" type="submit">
                    등록하기
                </Button>

                <Button asChild className="w-full">
                    <Link href="/">
                        <MoveLeft className="w-5 h-5 min-w-5 min-h-5" />
                        이전으로 이동
                    </Link>
                </Button>
            </form>
        </div>
    );
}

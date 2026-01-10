'use client';
import { useEffect, useRef, useState } from 'react';
import { Separator } from '../ui/separator';
import { ReservationSuccessView } from './reservation-success-view';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cancleReservationAction } from '@/app/reservation/actions';

export function ReservationStatusView({
    reservationId,
    storeId,
    onCancelSuccess,
}: {
    reservationId: number;
    storeId: number;
    onCancelSuccess: () => void;
}) {
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [waitingNumber, setWaitingNumber] = useState<number>();
    // useEffect eventSource를 관리하기위해서 useRef사용
    const eventSourceRef = useRef<EventSource>(null);

    const handleCancel = async () => {
        const result = await cancleReservationAction(reservationId);
        console.log(result);
        if (result.success) {
            eventSourceRef.current?.close();
            onCancelSuccess();
        }
    };

    useEffect(() => {
        const eventSource = new EventSource(`/api/reserve/${storeId}?reservationId=${reservationId}`);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
            console.log(event.data);

            const data = JSON.parse(event.data);
            const status = data.status;
            if (status === 'COMPLETE') {
                setIsComplete(true);
            }

            setWaitingNumber(data.waitingOrder);
        };
        return () => {
            eventSource.close();
            eventSourceRef.current = null;
            console.log('닫는다');
        };
    }, [storeId, reservationId]);

    if (isComplete) {
        return <ReservationSuccessView onConfirm={() => window.location.reload()} />;
    }

    return (
        <div className="w-full py-4 space-y-4">
            <Separator className="mb-6" />

            <div className="flex flex-col items-center justify-center space-y-6 py-4">
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-muted-foreground text-sm font-medium">현재 내 앞 대기</span>

                    <div className="relative flex items-center justify-center">
                        {/* 배경에 은은하게 돌아가는 스피너 */}
                        <Loader2 className="absolute -inset-8 size-24 text-primary/10 animate-spin-slow" />

                        <div className="flex items-baseline gap-1">
                            <span className="text-7xl font-black tracking-tighter text-primary">{waitingNumber}</span>
                            <span className="text-xl font-bold text-muted-foreground">팀</span>
                        </div>
                    </div>
                </div>

                {/* 하단 상태 메시지 */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping  absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    실시간으로 순번을 확인하고 있습니다
                </div>
            </div>

            <Separator className="mt-6" />

            <Button onClick={() => handleCancel()}>취소하기</Button>
        </div>
    );
}

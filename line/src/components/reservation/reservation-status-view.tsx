'use client';
import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { ReservationSuccessView } from './reservation-success-view';

export function ReservationStatusView({ reservationId, storeId }: { reservationId: number; storeId: number }) {
    const [isComplete, setIsComplete] = useState<boolean>(false);

    useEffect(() => {
        const eventSource = new EventSource(`/api/reserve/${storeId}?reservationId=${reservationId}`);
        eventSource.onmessage = (event) => {
            console.log(event.data);

            const data = JSON.parse(event.data);
            const status = data.status;
            if (status === 'COMPLETE') {
                setIsComplete(true);
            }
        };
        return () => {
            eventSource.close();
            console.log('닫는다');
        };
    }, [storeId, reservationId]);

    if (isComplete) {
        return <ReservationSuccessView onConfirm={() => window.location.reload()} />;
    }
    return (
        <div>
            <Separator></Separator>
            <div className="flex flex-col justify-center items-center space-y-4 h-45">
                <span className="text-muted-foreground text-sm">현재 내 앞 대기:</span>
                <p className="text-5xl font-bold text-primary underline">100</p>
                <span className="text-sm font-medium">팀</span>
            </div>
            <Separator></Separator>
        </div>
    );
}

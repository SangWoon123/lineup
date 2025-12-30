'use client';
import { useEffect } from 'react';
import { Separator } from '../ui/separator';

export function ReservationStatusView({ storeId }: { storeId: number }) {
    useEffect(() => {
        const eventSource = new EventSource(`/api/reserve/${storeId}`);
        eventSource.onmessage = (event) => {
            console.log(event);
        };
        return () => {
            eventSource.close();
            console.log('닫는다');
        };
    }, [storeId]);
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

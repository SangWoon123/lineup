'use client';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarCheck, Info, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ReservationStatusView } from '../reservation/reservation-status-view';
import { ReservationPopUpCard } from '../reservation/reservation-popup';
import { useState } from 'react';

interface StoreCardProps {
    data: any; // 매장 데이터
}

export function StoreCard({ data }: StoreCardProps) {
    const [isReserved, setIsReserved] = useState(false);
    const [resData, setResData] = useState<any>(null);

    const handleSuccess = (data: any) => {
        setResData(data);
        setIsReserved(true);
    };
    return (
        <>
            <Dialog
                onOpenChange={(open) => {
                    if (!open) {
                        setIsReserved(false);
                    }
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{data.name}</CardTitle>
                        <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {data.location}
                        </div>
                        <Badge variant="secondary" className="px-2 py-1">
                            <Users className="w-3 h-3" />
                            <span className="font-medium">{data.seat} / 100</span>
                        </Badge>
                    </CardHeader>
                    {/* <CardContent>
            </CardContent> */}
                    <CardFooter>
                        <DialogTrigger asChild>
                            <Button variant="default" className="w-full group">
                                예약하기
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>예약하기</DialogTitle>
                        <DialogDescription>해당 매장을 예약해서 이용해보세요.</DialogDescription>
                    </DialogHeader>
                    {!isReserved ? (
                        <ReservationPopUpCard storeId={data.id} onSuccess={(data) => handleSuccess(data)} />
                    ) : (
                        <ReservationStatusView reservationId={resData.reservationId} storeId={data.id} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

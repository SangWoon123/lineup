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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ReservationStatusView } from '../reservation/reservation-status-view';
import { ReservationPopUpCard } from '../reservation/reservation-popup';
import { useState } from 'react';

interface StoreCardProps {
    data: any; // 매장 데이터
}

export function StoreCard({ data }: StoreCardProps) {
    const [open, setOpen] = useState(false);
    const [showExitAlert, setShowExitAlert] = useState(false);
    const [isReserved, setIsReserved] = useState(false);
    const [resData, setResData] = useState<any>(null);

    const handleSuccess = (data: any) => {
        setResData(data);
        setIsReserved(true);
    };

    const handleCancle = () => {
        setIsReserved(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setOpen(true);
        } else {
            // 닫기 시도 시 항상 경고창 띄우기
            setShowExitAlert(true);
        }
    };

    const confirmClose = () => {
        setOpen(false);
        setShowExitAlert(false);
        setIsReserved(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{data.name}</CardTitle>
                        <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {data.location}
                        </div>
                        <Badge variant="secondary" className="px-2 py-1">
                            <Users className="w-3 h-3" />
                            <span className="font-medium">
                                {data.seat} / {data.capacity}
                            </span>
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
                        <ReservationStatusView
                            reservationId={resData.reservationId}
                            storeId={data.id}
                            onCancelSuccess={handleCancle}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={showExitAlert} onOpenChange={setShowExitAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>나가시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {!isReserved
                                ? '작성 중인 내용은 저장되지 않습니다.'
                                : '현재 대기 중입니다. 창을 닫으면 대기 상태 확인이 중단됩니다. 정말 닫으시겠습니까?'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmClose}>확인</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

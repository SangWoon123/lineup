'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CalendarCheck, Info } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Separator } from '../ui/separator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useState } from 'react';
import { createReservationAction } from '@/app/reservation/actions';

export function ReservationPopUpCard({ storeId, onSuccess }: { storeId: number; onSuccess: (data: any) => void }) {
    const [data, setData] = useState<any>({
        reservationId: null,
        storeId: storeId,
        guestName: '',
        phone: '',
        count: 1,
    });

    // 예약 확정 핸들러
    const handleConfirm = async () => {
        const response = await createReservationAction(data);

        if (response.success) {
            /**
           * 리액트에서는 state 를 변경해도 바로 반영되지 않고 변경할 계획 리스트에 넣는 개념
           * 
           * setData((prev:any) => ({...prev,reservationId: response.data?.id,}));
             onSuccess(data);
             : response.data?.id 값이 null로 들어옴
           */

            const updatedData = {
                ...data,
                reservationId: response.data?.id,
            };
            setData(updatedData);
            onSuccess(updatedData);
        }
    };

    return (
        <Tabs defaultValue="reserve" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reserve">
                    <CalendarCheck />
                    예약하기
                </TabsTrigger>
                <TabsTrigger value="info">
                    <Info />
                    매장 정보
                </TabsTrigger>
            </TabsList>

            <TabsContent value="reserve">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="guestName">예약자 성함</Label>
                        <Input
                            id="guestName"
                            placeholder="성함을 입력하세요"
                            onChange={(e) => setData({ ...data, guestName: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">연락처</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="010-0000-0000"
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="count">방문 인원수</Label>
                        <Input
                            id="count"
                            type="number"
                            defaultValue={data.count}
                            min={1}
                            onChange={(e) => setData({ ...data, count: parseInt(e.target.value, 10) })}
                        />
                    </div>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full mt-4">실시간 예약 확정</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>예약확정</AlertDialogTitle>
                            <AlertDialogDescription>예약을 확정하시겠습니까?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancle</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleConfirm()}>Action</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TabsContent>

            <TabsContent value="info">
                <div className="rounded-lg bg-muted p-4 space-y-3">
                    <div>
                        <h4 className="font-semibold text-sm">매장 소개</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                            저희 매장은 최고의 재료만을 사용하여 정성을 다해 모십니다. 단체석 완비 및 주차 가능합니다.
                        </p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 text-sm">
                        <span className="text-muted-foreground">영업 시간</span>
                        <span className="text-right">11:00 ~ 22:00</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                        <span className="text-muted-foreground">휴무일</span>
                        <span className="text-right">매주 월요일</span>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}

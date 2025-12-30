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

export function ReservationPopUpCard({ onSuccess }: { onSuccess: () => void }) {
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
                        <Input id="guestName" placeholder="성함을 입력하세요" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">연락처</Label>
                        <Input id="phone" type="tel" placeholder="010-0000-0000" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="count">방문 인원수</Label>
                        <Input id="count" type="number" defaultValue={1} min={1} />
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
                            <AlertDialogAction onClick={onSuccess}>Action</AlertDialogAction>
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

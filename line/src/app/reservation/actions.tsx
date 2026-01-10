'use server';
import prisma from '@/lib/prisma';
import { cancleReservationInDB } from '@/lib/store-queries';

interface ReservationInput {
    storeId: number;
    guestName: string;
    phone: string;
    count: number;
}

export async function createReservationAction(data: ReservationInput) {
    try {
        const storeId = data.storeId;
        const guestName = data.guestName;
        const phone = data.phone;
        const count = data.count;

        if (!storeId || !guestName || !phone || !count) {
            throw new Error('입력하지 않은 필드가 있습니다');
        }

        // 예약하기
        const result = await prisma.reservation.create({
            data: {
                storeId: Number(storeId),
                guestName: guestName,
                phone: phone,
                reservationCount: Number(count),
                // status: "WAITING" (기본값)
            },
        });
        return { success: true, data: result };
    } catch (error) {
        console.error('서버 액션 에러:', error);
        return { success: false, error: '예약 처리 중 오류가 발생했습니다.' };
    }
}

export async function cancleReservationAction(reservationId: number) {
    try {
        return await cancleReservationInDB(reservationId);
    } catch (error) {
        console.error('서버 액션 에러:', error);
        return { success: false, error: `예약취소 처리 중 오류가 발생했습니다. ${error}` };
    }
}

'use server';

import prisma from '@/lib/prisma';

// 매장 조회
export async function getStoreList() {
    try {
        return await prisma.store.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    } catch (error) {
        console.error(error);
    }
}

// 비관적 락 적용
export async function processStoreReservation(storeId: string, reservationId: string) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const store = await tx.store.findUnique({
                where: {
                    id: parseInt(storeId, 10),
                },
            });

            if (!store) throw new Error('매장을 찾을 수 없습니다.');

            // const reservation = await tx.reservation.findUnique({
            //     where: { id: Number(reservationId) }
            // });

            // if (reservation.status === 'CANCELLED') {
            // }

            //12.31 19:35 고민
            // reservation 데이터는 이미 생성된 상태인데 reservationId를 언제 가져올지..
            // 1. 컴포넌트로부터
            // 2. db 조회 (store_id로부터) << (결론) 못가져옴 예약자는 여러명인데 어떻게 가져오려고..?
            if (store.capacity > store.seat) {
                // 1. 매장 테이블 업데이트
                await tx.store.update({
                    where: {
                        id: store.id,
                    },
                    data: { seat: { increment: 1 } },
                });
                // 2. 예약 테이블 데이터 업데이트
                const updatedReservation = await tx.reservation.update({
                    where: { id: Number(reservationId) },
                    data: { status: 'COMPLETED' },
                });
                return { status: 'COMPLETE', data: updatedReservation };
            } else {
                // 예약자가 꽉 찬 경우 Waiting 테이블에 데이터를 넣는다
                const isReserved = await tx.waiting.findFirst({
                    where: {
                        reserverId: Number(reservationId),
                        storeId: store.id,
                    },
                });

                // 예약내역이 있으면
                if (!isReserved) {
                    const waitingEntry = await tx.waiting.create({
                        data: {
                            storeId: store.id,
                            reserverId: Number(reservationId),
                        },
                    });

                    const countAhead = await tx.waiting.count({
                        where: {
                            storeId: store.id,
                            createdAt: {
                                lt: waitingEntry.createdAt,
                            },
                        },
                    });

                    return {
                        status: 'WAITING',
                        data: waitingEntry,
                        waitingOrder: countAhead + 1,
                    };
                } else {
                    const countAhead = await tx.waiting.count({
                        where: {
                            storeId: store.id,
                            createdAt: { lt: isReserved.createdAt },
                        },
                    });

                    return {
                        status: 'WAITING',
                        data: isReserved,
                        waitingOrder: countAhead + 1,
                    };
                }
            }
        });

        return result;
    } catch (error) {
        console.error('DB 조회 중 에러:', error);
    }
}

/** 26.1.1 서버액션.ts 파일과 /lib 하위 store-queries.ts파일 의 차이
 *  직접적인 db 접근은 store-queries.ts
 *  브라우저의 접근은 서버액션.ts
 * */
export async function cancleReservationInDB(reservationId: number) {
    try {
        // Waiting 테이블 조회해서 컬럼 삭제 하고, 같은 가게 예약자들 순서 -1 씩
        const result = await prisma.$transaction(async (tx) => {
            await tx.waiting.deleteMany({
                where: { reserverId: reservationId },
            });

            await tx.reservation.update({
                where: { id: reservationId },
                data: { status: 'CANCELLED' },
            });
        });

        return { success: true, data: result };
    } catch (error) {
        console.error('서버 액션 에러:', error);
        return { success: false, error: '예약취소 처리 중 오류가 발생했습니다.' };
    }
}

import { processStoreReservation } from '@/lib/store-queries';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ storeId: string }> }) {
    // 1. 큐테이블 데이터 저장
    // 2. 가게 db 조회
    // 3. 가게 데이터중 수용인원(capacity) 및 예약가능좌석(seat) 비교
    const { storeId } = await params;
    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('reservationId') as string;

    // if 예약가능
    // reservation 테이블 기록 및 Store 테이블 seat +1 저장
    // 큐테이블 데이터 삭제

    // else 예약 불가능

    /**
     * 예약 결과
     */
    const result = await processStoreReservation(storeId, reservationId);
    let interval: NodeJS.Timeout;

    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();

            const sendData = (data: any) => {
                const message = `data: ${JSON.stringify(data)}\n\n`;
                controller.enqueue(encoder.encode(message));
            };

            // 데이터 전송
            sendData(result);

            interval = setInterval(async () => {
                const isKeeping = await processStoreReservation(storeId, reservationId);

                if (isKeeping.status === 'CANCELLED' || isKeeping.status === 'COMPLETE') {
                    sendData(isKeeping);
                    clearInterval(interval); // 클로저
                    controller.close();
                    return;
                }
                sendData(isKeeping);
            }, 2000);

            request.signal.addEventListener('abort', () => {
                clearInterval(interval);
                try {
                    controller.close();
                } catch (e) {
                    // 이미 닫힌 경우 무시
                }
            });
        },
        cancel() {
            console.log('SSE를 끊습니다.');
            clearInterval(interval);
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    });
}

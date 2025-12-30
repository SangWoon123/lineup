export async function GET() {
    //1. 예약 로직

    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();

            const sendData = (data: any) => {
                const message = `data: ${JSON.stringify(data)}\n\n`;
                controller.enqueue(encoder.encode(message));
            };

            const interval = setInterval(() => {
                sendData({ message: '실시간 업데이트 중', time: new Date().toISOString() });
            }, 2000);
        },
        cancel() {
            console.log('SSE를 끊습니다.');
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

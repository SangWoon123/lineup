import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

export function ReservationSuccessView({ onConfirm }: { onConfirm: () => void }) {
    return (
        <Card className="border-2 border-green-500/20 bg-green-50/30 dark:bg-green-950/10">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-green-700 dark:text-green-400">
                    지금 바로 입장해 주세요!
                </h3>
                <p className="mb-6 text-muted-foreground">
                    기다려주셔서 감사합니다. <br />
                    매장 직원에게 이 화면을 보여주세요.
                </p>
            </CardContent>

            <CardFooter>
                <Button size="lg" className="w-full" onClick={onConfirm}>
                    확인
                </Button>
            </CardFooter>
        </Card>
    );
}

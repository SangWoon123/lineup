'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createStore(formData: FormData) {
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const rawSeat = formData.get('seat') as string;
    const capacity = 100;

    if (!name || !location || !rawSeat) {
        return { success: false, message: '모든 필드를 입력해주세요.' };
    }

    const seat = Number(rawSeat);

    try {
        await prisma.store.create({
            data: {
                name: name,
                location: location,
                seat: seat,
                capacity: capacity,
            },
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, message: `매장 등록시 오류가 발생했습니다. ${error}` };
    }
}

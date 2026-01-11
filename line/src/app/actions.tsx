'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createStore(formData: FormData) {
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const capacity = formData.get('seat') as string;

    if (!name || !location || !capacity) {
        return { success: false, message: '모든 필드를 입력해주세요.' };
    }

    try {
        await prisma.store.create({
            data: {
                name: name,
                location: location,
                seat: 0,
                capacity: Number(capacity),
            },
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, message: `매장 등록시 오류가 발생했습니다. ${error}` };
    }
}

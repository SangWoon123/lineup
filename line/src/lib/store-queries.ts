'use server';

import prisma from '@/lib/prisma';

// 매장 조회
export async function getStoreList() {
    try {
        return await prisma.store.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });
    } catch (error) {
        console.error(error);
    }
}

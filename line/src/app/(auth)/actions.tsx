'use server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function signUpAction(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as Role;
    const password = formData.get('password') as string;

    if (!role || !email) {
        return { success: false, message: '모든 필드를 입력해주세요.' };
    }

    try {
        await prisma.user.create({
            data: {
                email: email,
                role: role,
            },
            
        });
        return { success: true };
    } catch (error) {
        return { success: false, message: `회원 가입 과정 에서 오류가 발생했습니다. ${error}` };
    }
}

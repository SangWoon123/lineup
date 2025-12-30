'use client';
import { createStore } from '@/app/actions';
import { useRouter } from 'next/navigation';

export function useRegisterStore() {
    const router = useRouter();

    const register = async function handleSubmit(formData: FormData) {
        const response = await createStore(formData);

        if (!response.success) {
            alert(`등록실패 ${response.message}`);
            return;
        }

        router.push('/');
    };

    return { register };
}

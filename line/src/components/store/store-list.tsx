'use client';

import { StoreCard } from '@/components/store/store-card';
export default function StoreList({ stores }: { stores: any[] }) {
    return (
        <>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
                {stores.map((store) => (
                    <StoreCard key={store.id} data={store} />
                ))}
            </div>
        </>
    );
}

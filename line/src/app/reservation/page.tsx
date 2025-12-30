import StoreList from '@/components/store/store-list';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { getStoreList } from '@/lib/store-queries';
import { ChevronDown } from 'lucide-react';

export default async function Register() {
    const stores = await getStoreList();
    return (
        <div className="flex flex-col h-dvh">
            <div className="w-full flex gap-2">
                <Input placeholder="찾으시는 매장 입력해주세요." />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            지역 <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </div>
            <div className="">
                <StoreList stores={stores}/>
            </div>
        </div>
    );
}

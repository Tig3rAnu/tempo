import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function CustomDropdownList({
  title,

  items,
}: {
  title: string;
  items: { key: string; name: string; path: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        {title}
        <ChevronDown size={16} className="mt-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {(items || []).map((service, index) => {
          return (
            <DropdownMenuItem key={index}>
              <Link href={service.path} className="block w-full">
                {service.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

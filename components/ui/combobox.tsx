'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ComboboxDemoProps {
  dataPropertys: Array<{ value: string; label: string }>;
  placeholder?: string;
  icon?: React.ReactNode;
  customClassName?: {
    button?: string;
    popoverContent?: string;
    input?: string;
    item?: string;
    itemActive?: string;
  };
  onValueChange?: (value: string) => void;
}

export const ComboboxDemo: React.FC<ComboboxDemoProps> = ({
  dataPropertys,
  placeholder = 'Select...',
  icon,
  customClassName = {},
  onValueChange
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', customClassName.button)}
        >
          {value ? dataPropertys.find((item) => item.value === value)?.label : placeholder}
          {icon && <span className="ml-2">{icon}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-full p-0', customClassName.popoverContent)}>
        <Command>
          <CommandInput placeholder={placeholder} className={cn('h-9', customClassName.input)} />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {dataPropertys.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  className={cn('cursor-pointer px-3 py-2 hover:bg-gray-200', customClassName.item, {
                    [customClassName.itemActive ?? 'bg-gray-300']: value === item.value,
                  })}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    if (onValueChange) {
                      onValueChange(currentValue === value ? '' : currentValue);
                    }
                  }}
                >
                  {item.label}
                  <Check className={cn('ml-auto', value === item.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

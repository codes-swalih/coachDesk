'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  setSelected: (values: string[]) => void;
  placeholder?: string;
  width?: string;
}

export function MultiSelect({
  options,
  selected,
  setSelected,
  placeholder = 'Select options',
  width = 'w-auto',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    setSelected(
      selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
    );
  };

  const removeOption = (value: string) => {
    setSelected(selected.filter((v) => v !== value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            '  px-3 py-0 text-sm justify-between border-muted-foreground/20 hover:border-primary transition-all',
            'flex items-center flex-wrap gap-2 text-left font-normal',
            width
          )}
        >
          <div className="w-1/2 ">
            <span className="text-muted-foreground text-sm">{placeholder}</span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn('p-0 ', width)}>
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem key={option.value} onSelect={() => toggleOption(option.value)}>
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selected.includes(option.value) && 'bg-primary text-black'
                  )}
                >
                  {selected.includes(option.value) && <Check className="h-4 w-4" />}
                </div>

                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

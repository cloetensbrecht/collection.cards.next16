import {Check, ChevronDownIcon, X} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React, {cloneElement, createElement, isValidElement} from 'react'

type SelectProps = {
  label?: string
  onSelect: (options: {label: string; value: string}) => void
  options: {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>
    label: string
    value: string
  }[]
  placeholder?: string
  selected?: string
}

export default function Select({
  label,
  onSelect,
  options,
  placeholder,
  selected
}: SelectProps) {
  const selectedIcon = selected
    ? options.find(option => option.value === selected)?.icon
    : undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex flex-col gap-1 items-start">
          <label className="font-medium text-foreground text-sm">{label}</label>
          <Button variant="outline" className="rounded-[8px]">
            {selectedIcon
              ? createElement(selectedIcon, {
                  'aria-hidden': 'true',
                  className: 'opacity-60',
                  width: 16,
                  height: 16
                })
              : null}
            {selected
              ? options.find(option => option.value === selected)?.label
              : placeholder || 'Select...'}
            <ChevronDownIcon
              aria-hidden="true"
              className="-me-1 opacity-60"
              size={16}
            />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="rounded-[8px]"
      >
        {options.map(option => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() =>
              onSelect({
                label: option.label,
                value: option.value
              })
            }
            className="rounded-[8px] group/item"
          >
            {option.icon && isValidElement(<option.icon />)
              ? cloneElement(<option.icon />, {
                  'aria-hidden': 'true',
                  className: 'opacity-60',
                  size: 16,
                  width: 16,
                  height: 16
                })
              : null}
            {option.label}
            {selected === option.value && (
              <>
                <Check
                  aria-hidden="true"
                  className="ml-auto opacity-60 group-hover/item:hidden"
                  size={16}
                />
                <X
                  aria-hidden="true"
                  className="ml-auto opacity-60 hidden group-hover/item:block"
                  size={16}
                />
              </>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

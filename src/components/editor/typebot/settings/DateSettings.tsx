'use client';

import React, { useState } from 'react';
import { Braces, Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import type { CanvasBlock } from '../../types';

export const DateBlockSettings = ({
  block,
  onUpdate,
  position,
  variables,
  onAddVariable,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
  variables: string[];
  onAddVariable: (name: string) => void;
}) => {
  const props = block.props || {};
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, { ...props, [key]: value });
  };

  const handleVariableSelect = (value: string) => {
    handleChange('variable', value);
    setOpen(false);
  };

  const handleCreateVariable = () => {
    if (searchTerm && !variables.includes(searchTerm)) {
      onAddVariable(searchTerm);
      handleVariableSelect(searchTerm);
    }
  };

  const filteredVariables = variables.filter((v) =>
    v.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const showCreateOption =
    searchTerm &&
    !filteredVariables.some((v) => v.toLowerCase() === searchTerm.toLowerCase());

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="is-range" className="text-sm">
          É um intervalo
        </Label>
        <Switch
          id="is-range"
          checked={props.isRange}
          onCheckedChange={(c) => handleChange('isRange', c)}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="with-time" className="text-sm">
          Com hora
        </Label>
        <Switch
          id="with-time"
          checked={props.withTime}
          onCheckedChange={(c) => handleChange('withTime', c)}
        />
      </div>

      <div>
        <Label className="text-xs text-white/50">Rótulo do botão</Label>
        <div className="relative mt-1">
          <Input
            placeholder="Enviar"
            value={props.buttonLabel || ''}
            onChange={(e) => handleChange('buttonLabel', e.target.value)}
            className="bg-[#181818] border-[#3f3f46] text-white pr-8"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Braces size={16} />
          </button>
        </div>
      </div>

      <div>
        <Label className="text-xs text-white/50">Min</Label>
        <div className="relative mt-1">
          <Input
            placeholder="YYYY-MM-DD"
            value={props.minDate || ''}
            onChange={(e) => handleChange('minDate', e.target.value)}
            className="bg-[#181818] border-[#3f3f46] text-white pr-8"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Braces size={16} />
          </button>
        </div>
      </div>

      <div>
        <Label className="text-xs text-white/50">Max</Label>
        <div className="relative mt-1">
          <Input
            placeholder="YYYY-MM-DD"
            value={props.maxDate || ''}
            onChange={(e) => handleChange('maxDate', e.target.value)}
            className="bg-[#181818] border-[#3f3f46] text-white pr-8"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Braces size={16} />
          </button>
        </div>
      </div>

      <div>
        <Label className="text-xs text-white/50">Formato</Label>
        <div className="relative mt-1">
          <Input
            placeholder="dd/MM/yyyy"
            value={props.format || ''}
            onChange={(e) => handleChange('format', e.target.value)}
            className="bg-[#181818] border-[#3f3f46] text-white pr-8"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Braces size={16} />
          </button>
        </div>
      </div>

      <div>
        <Label className="text-xs text-white/50">
          Salvar a resposta em uma variável
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-[#181818] border-[#3f3f46] hover:bg-[#181818] hover:text-white text-white mt-1"
            >
              {props.variable || 'Selecione uma variável...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 bg-[#262626] border-[#3f3f46] text-white">
            <Command>
              <CommandInput
                placeholder="Pesquisar ou criar..."
                className="h-9 text-white"
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                <CommandEmpty>Nenhuma variável encontrada.</CommandEmpty>
                <CommandGroup>
                  {filteredVariables.map((variable) => (
                    <CommandItem
                      key={variable}
                      value={variable}
                      onSelect={() => handleVariableSelect(variable)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          props.variable === variable ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {variable}
                    </CommandItem>
                  ))}
                  {showCreateOption && (
                    <CommandItem
                      onSelect={handleCreateVariable}
                      className="text-blue-400"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Criar <span className="font-bold mx-1">{searchTerm}</span>
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

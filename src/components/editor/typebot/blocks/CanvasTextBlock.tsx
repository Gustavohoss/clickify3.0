'use client';

import React, { useState, useEffect } from 'react';
import {
  ImageIcon as ImageIconLucide,
  AudioWaveform,
  Video,
  TextCursorInput,
  AtSign,
  Calendar,
  Clock10,
  MessageCircle,
  Check,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CanvasBlock } from '../../types';
import ReactPlayer from 'react-player';
import { Badge } from '@/components/ui/badge';
import { EditableTextBlock } from '../EditableTextBlock';
import { Button } from '@/components/ui/button';

export const CanvasTextBlock = React.memo(
  ({
    block,
    onBlockMouseDown,
    onContextMenu,
    isSelected,
    setSelectedBlockId,
    isChild = false,
    updateBlockProps,
    variables,
  }: {
    block: CanvasBlock;
    onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
    onContextMenu: (e: React.MouseEvent, block: CanvasBlock) => void;
    isSelected: boolean;
    setSelectedBlockId: (id: number | null) => void;
    isChild?: boolean;
    updateBlockProps: (id: number, props: any) => void;
    variables: string[];
  }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    const renderInputBlock = (icon: React.ReactNode, placeholder: string) => (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2 text-sm text-white/80 w-full">
          {icon}
          <span className="truncate">{placeholder}</span>
        </div>
        {block.props?.variable && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-white/60">Set</span>
            <Badge className="bg-indigo-500 text-white hover:bg-indigo-600 px-2 py-0.5">
              {block.props.variable}
            </Badge>
          </div>
        )}
      </div>
    );

    const getBlockContent = () => {
      switch (block.type) {
        case 'image':
          if (block.props?.imageUrl) {
            // Add min-h to prevent collapsing
            return (
              <div className="min-h-[50px]">
                <img
                  src={block.props.imageUrl}
                  alt="Conteúdo fornecido pelo usuário"
                  className="max-w-full h-auto object-contain rounded-md"
                />
              </div>
            );
          }
          return (
            <div className="flex items-center gap-2">
              <ImageIconLucide size={16} className="text-sky-400" />
              <span className="text-sm text-white/60">Clique para editar...</span>
            </div>
          );
        case 'audio':
          if (block.props?.audioUrl) {
            return (
              <div className="w-full">
                {hasMounted && (
                  <ReactPlayer
                    url={block.props.audioUrl}
                    width="100%"
                    height="50px"
                    controls
                    playing={block.props.autoplay}
                  />
                )}
              </div>
            );
          }
          return (
            <div className="flex items-center gap-2">
              <AudioWaveform size={16} className="text-sky-400" />
              <span className="text-sm text-white/60">
                Clique para editar...
              </span>
            </div>
          );
        case 'video':
          if (block.props?.videoUrl) {
            return (
              <div className="w-full aspect-video">
                {hasMounted && (
                  <ReactPlayer
                    url={block.props.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing={block.props.autoplayVideo}
                    loop={block.props.loopVideo}
                  />
                )}
              </div>
            );
          }
          return (
            <div className="flex items-center gap-2">
              <Video size={16} className="text-sky-400" />
              <span className="text-sm text-white/60">
                Clique para editar...
              </span>
            </div>
          );
        case 'embed':
           if (block.props?.url) {
            return (
              <div style={{ height: `${block.props.height || 200}px`, width: '100%' }}>
                <iframe
                  src={block.props.url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            );
          }
          return (
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-sky-400" />
              <span className="text-sm text-white/60">Clique para configurar o embed.</span>
            </div>
          );
        case 'input-text':
          return renderInputBlock(
            <TextCursorInput size={16} className="text-orange-400 flex-shrink-0" />,
            block.props?.placeholder || 'Digite sua resposta...'
          );
        case 'input-email':
          return renderInputBlock(
            <AtSign size={16} className="text-orange-400 flex-shrink-0" />,
            block.props?.placeholder || 'Digite seu email...'
          );
        case 'input-date':
          return renderInputBlock(
            <Calendar size={16} className="text-orange-400 flex-shrink-0" />,
            block.props?.placeholder || 'Escolha uma data...'
          );
        case 'logic-wait':
          return (
            <div className="flex items-center gap-2 text-sm text-white/80 w-full">
              <Clock10 size={16} className="text-indigo-400 flex-shrink-0" />
              <span className="truncate">
                Aguarde por {block.props.duration || 0} segundo(s)
              </span>
            </div>
          );
        case 'text':
          return (
            <EditableTextBlock
              initialContent={block.props?.content}
              onSave={(newContent) =>
                updateBlockProps(block.id, { content: newContent })
              }
              variables={variables}
              onVariableInsert={(variable) => {
                const currentContent = block.props?.content || '';
                const newContent = `${currentContent}{{${variable}}}`;
                updateBlockProps(block.id, { content: newContent });
              }}
            />
          );
        case 'input-buttons':
          return (
            <div className="flex flex-col gap-2 w-full text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded border-2 border-orange-400">
                  <Check size={12} className="text-orange-400" />
                </div>
                <EditableTextBlock
                  initialContent={block.props?.content || 'Click to edit'}
                  onSave={(newContent) =>
                    updateBlockProps(block.id, {
                      ...block.props,
                      content: newContent,
                    })
                  }
                  variables={variables}
                  onVariableInsert={(variable) => {
                    const currentContent = block.props?.content || '';
                    const newContent = `${currentContent}{{${variable}}}`;
                    updateBlockProps(block.id, { content: newContent });
                  }}
                />
              </div>

              {(block.props?.buttons || []).map((button: any, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-center bg-[#2a2a2a] border-[#3f3f46] text-white h-8"
                >
                  {button.text}
                </Button>
              ))}

              <Button
                variant="outline"
                className="w-full justify-center bg-[#2a2a2a] border-[#3f3f46] text-white h-8 mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const newButtons = [
                    ...(block.props?.buttons || []),
                    { text: 'New Button' },
                  ];
                  updateBlockProps(block.id, {
                    ...block.props,
                    buttons: newButtons,
                  });
                }}
              >
                Add Button
              </Button>
            </div>
          );
        default:
          return (
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-sky-400" />
              <span className="text-sm text-white/60">...</span>
            </div>
          );
      }
    };

    return (
      <div
        id={`block-${block.id}`}
        className={cn(
          'group w-full cursor-grab select-none pointer-events-auto',
          !isChild && 'absolute w-72'
        )}
        style={
          !isChild ? { transform: `translate(${block.position.x}px, ${block.position.y}px)` } : {}
        }
        onMouseDown={(e) => {
          if (e.button !== 0) return;
          onBlockMouseDown(e, block);
        }}
        onContextMenu={(e) => onContextMenu(e, block)}
      >
        <div
          className={cn(
            'w-full rounded-lg',
            !isChild && 'bg-[#262626] p-3',
            isChild && 'relative'
          )}
        >
          <div
            className={cn(
              'flex flex-col items-start justify-between rounded-md bg-[#181818] p-2 min-h-[40px] gap-2',
              isSelected &&
                (block.type.startsWith('input-') || block.type.startsWith('logic-')
                  ? 'ring-2 ring-orange-500'
                  : 'ring-2 ring-blue-500')
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBlockId(block.id);
            }}
          >
            {getBlockContent()}
          </div>
        </div>
      </div>
    );
  }
);

CanvasTextBlock.displayName = 'CanvasTextBlock';

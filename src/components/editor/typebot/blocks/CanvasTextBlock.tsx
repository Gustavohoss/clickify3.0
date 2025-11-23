
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
  PictureInPicture,
  Link2,
  ArrowRightLeft,
  GitCompareArrows,
  GitCommit,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CanvasBlock } from '../../types';
import ReactPlayer from 'react-player';
import { Badge } from '@/components/ui/badge';
import { EditableTextBlock } from '../EditableTextBlock';
import { Button } from '@/components/ui/button';
import { ConnectionHandle } from '../ui/ConnectionHandle';
import Image from 'next/image';

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
    onConnectionStart,
  }: {
    block: CanvasBlock;
    onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
    onContextMenu: (e: React.MouseEvent, block: CanvasBlock) => void;
    isSelected: boolean;
    setSelectedBlockId: (id: number | null) => void;
    isChild?: boolean;
    updateBlockProps: (id: number, props: any) => void;
    variables: string[];
    onConnectionStart?: (
      e: React.MouseEvent,
      fromBlockId: number,
      fromHandle: 'output',
      buttonIndex?: number
    ) => void;
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
                    playing={block.props.autoplay}
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
                  title="Embed Content"
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
        case 'input-website':
          return renderInputBlock(
            <Link2 size={16} className="text-orange-400 flex-shrink-0" />,
            block.props?.placeholder || 'Digite uma URL...'
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
        case 'logic-redirect':
          return (
            <div className="flex items-center gap-2 text-sm text-white/80 w-full">
              <ArrowRightLeft size={16} className="text-indigo-400 flex-shrink-0" />
              <span className="truncate">
                Redirecionar para uma URL
              </span>
            </div>
          );
        case 'logic-abtest':
          const percentageA = block.props.percentageA || 50;
          return (
            <div className="flex flex-col gap-1 w-full text-white/80">
              <div className="flex items-center gap-2 text-sm">
                <GitCompareArrows size={16} className="text-indigo-400 flex-shrink-0"/>
                <span>Teste A/B</span>
              </div>
               <div className="flex flex-col gap-1 w-full">
                  <div className="relative">
                    <Button variant="outline" className="w-full justify-start bg-[#2a2a2a] border-[#3f3f46] text-white h-8">
                        A <Badge className="ml-auto">{percentageA}%</Badge>
                    </Button>
                    {onConnectionStart && (
                        <ConnectionHandle data-handle-id={`output-${block.id}-0`} onMouseDown={(e) => { e.stopPropagation(); onConnectionStart(e, block.id, 'output', 0); }} />
                    )}
                  </div>
                  <div className="relative">
                     <Button variant="outline" className="w-full justify-start bg-[#2a2a2a] border-[#3f3f46] text-white h-8">
                        B <Badge className="ml-auto">{100 - percentageA}%</Badge>
                     </Button>
                      {onConnectionStart && (
                        <ConnectionHandle data-handle-id={`output-${block.id}-1`} onMouseDown={(e) => { e.stopPropagation(); onConnectionStart(e, block.id, 'output', 1); }} />
                    )}
                  </div>
              </div>
            </div>
          )
        case 'logic-jump':
            return (
              <div className="flex items-center gap-2 text-sm text-white/80 w-full">
                <GitCommit size={16} className="text-indigo-400 flex-shrink-0" />
                <span className="truncate">
                  {block.props.targetGroupId ? `Pular para: Grupo...` : 'Configure...'}
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
            <div className="flex flex-col gap-1 w-full">
              {(block.props?.buttons || []).map((button: any, index: number) => (
                <div key={index} className="relative">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-[#2a2a2a] border-[#3f3f46] text-white h-8"
                  >
                    {button.text}
                  </Button>
                  {onConnectionStart && (
                    <ConnectionHandle
                      data-handle-id={`output-${block.id}-${index}`}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        onConnectionStart(e, block.id, 'output', index);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        case 'input-pic':
          return (
             <div className="flex flex-col gap-2 w-full">
                {(block.props?.choices || []).map((choice: any, index: number) => (
                  <div key={index} className="relative w-full aspect-video rounded-md overflow-hidden border border-[#3f3f46]">
                     <Image src={choice.imageUrl} alt={`Choice ${index}`} layout="fill" objectFit="cover" />
                      {onConnectionStart && (
                        <ConnectionHandle
                          data-handle-id={`output-${block.id}-${index}`}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            onConnectionStart(e, block.id, 'output', index);
                          }}
                        />
                      )}
                  </div>
                ))}
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

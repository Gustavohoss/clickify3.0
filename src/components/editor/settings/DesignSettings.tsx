
'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Funnel } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const emojis = [
  // Smileys & People
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
  '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
  '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
  '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻',
  '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
  '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕',
  '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅',
  '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄',

  // Animals & Nature
  '🙈', '🙉', '🙊', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈',
  '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗',
  '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰',
  '🐇', '🐿️', '🦔', '🦇', '🐻', '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓',
  '🐣', '🐤', '🐥', '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢',
  '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡', '🦈', '🐙', '🐚', '🐌',
  '🦋', '🐛', '🐜', '🐝', '🐞', '🦗', '🕷️', '🕸️', '🦂', '🦟', '🦠', '💐', '🌸', '💮', '🏵️', '🌹',
  '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂',
  '🍃',

  // Food & Drink
  '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝', '🍅',
  '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🌰', '🍞',
  '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪',
  '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘',
  '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀',
  '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭',
  '🍮', '🍯', '🍼', '🥛', '☕', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤',
  '🧃', '🧉', '🧊', '🥢', '🍽️', '🍴', '🥄',

  // Activities
  '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍',
  '🏏', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️',
  '🏂', '🪂', '🏋️', '🤼', '🤸', '🤺', '🤾', '🏌️', '🏇', '🧘', '🧗', '🏄', '🏊', '🤽', '🚣', '🚴',
  '🚵', '🧗', '🎪', 'nT', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻',
  '🎲', '♟️', '🎯', '🎳', '🎮', '🎰',

  // Travel & Places
  '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵',
  '🏍️', '🛺', '✈️', '🛩️', '🛫', '🛬', '🚀', '🛰️', '⛵', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '⚓', '⛽',
  '🚧', '🚦', '🚥', '🛑', '🏁', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🌍', '🌎', '🌏', '🌐', '🗺️', '🗾',
  '🧭', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱', '🏘️', '🏚️',
  '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒',
  '🗼', '🗽', '⛪', '🕌', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁', '🌃', '🏙️', '🌄', '🌅', '🌆', '🌇',
  '🌉', '♨️', '🎠', '🎡', '🎢', '💈', '🎪', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊',
  '🚝', '🚞', '🚋', ' MON', '🚖', '🚔', '🚍', '🚘', '🚡', '🚠', '🚟', '🚁', '桨', 'S',

  // Objects
  '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼',
  '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭',
  '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸',
  '💵', '💴', '💶', '💷', '💰', '💳', '🧾', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩',
  '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿',
  '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺',
  '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪒', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️',
  '🛌', '🧸', '🖼️', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️',
  '📩', '📨', '📧', '💌', '📮', '📪', '📫', '📬', '📭', '📦', '📯', '📥', '📤', '📜', '📃', '📄',
  '📑', '🧾', '📊', '📈', '📉', '🗒️', '🗓️', '📆', '📅', '🗑️', '📇', '🗃️', '🗳️', '🗄️', '📋', '📁',
  '📂', '🗂️', '🗞️', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗',
  '📎', '🖇️', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊️', '🖋️', '✒️', '🖌️', '🖍️', '📝', '✏️', '🔍',
  '🔎', '🔏', '🔐', '🔒', '🔓',

  // Symbols
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘',
  '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊',
  '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶',
  '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️',
  '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳',
  '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱',
  '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾',
  '♿', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁',
  '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣',
  '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️',
  '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️',
  '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗',
  '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '👁️‍🗨️', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '⚪',
  '⚫', '🔴', '🔵', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️',
  '◻️', '⬛', '⬜', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '💬', '💭', '🗯️', '♠️', '♣️',
  '♥️', '♦️', '🃏', '🎴', '🀄', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛',
  '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧',
];

const ColorPicker = ({ label, color, onChange }: { label: string, color: string, onChange: (color: string) => void }) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    <div className="relative h-10 w-full rounded-md border border-input overflow-hidden">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="h-full w-full" style={{ backgroundColor: color }} />
    </div>
  </div>
);

const ColorsContent = ({
  primaryColor, setPrimaryColor,
  backgroundColor, setBackgroundColor,
  titleColor, setTitleColor,
  textColor, setTextColor,
  interactiveTextColor, setInteractiveTextColor
}: {
  primaryColor: string, setPrimaryColor: (c: string) => void,
  backgroundColor: string, setBackgroundColor: (c: string) => void,
  titleColor: string, setTitleColor: (c: string) => void,
  textColor: string, setTextColor: (c: string) => void,
  interactiveTextColor: string, setInteractiveTextColor: (c: string) => void
}) => {

    return (
        <Card className="border-none bg-transparent p-4 shadow-none">
            <div className="space-y-4">
            <ColorPicker label="Primária" color={primaryColor} onChange={setPrimaryColor} />
            <ColorPicker label="Fundo" color={backgroundColor} onChange={setBackgroundColor} />
            <ColorPicker label="Títulos" color={titleColor} onChange={setTitleColor} />
            <ColorPicker label="Textos" color={textColor} onChange={setTextColor} />
            <ColorPicker label="Textos Interativos" color={interactiveTextColor} onChange={setInteractiveTextColor} />
            </div>
        </Card>
    );
}

const HeaderSettings = ({ funnel, onUpdate }: { funnel: Funnel, onUpdate: (props: Partial<Funnel>) => void }) => {
  const logoType = funnel.headerLogoType || 'image';
  const logoValue = funnel.headerLogoValue || '';
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);

  return (
    <Card className="border-none bg-transparent p-4 shadow-none">
      <div className="space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground">Tipo de Logo</Label>
          <Select
            value={logoType}
            onValueChange={(value: 'image' | 'emoji') => onUpdate({ headerLogoType: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Imagem</SelectItem>
              <SelectItem value="emoji">Emoji</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {logoType === 'image' && (
          <div>
            <Label className="text-sm text-muted-foreground">URL da Imagem</Label>
            <Input
              value={logoValue}
              onChange={(e) => onUpdate({ headerLogoValue: e.target.value })}
              placeholder="https://..."
              className="mt-1"
            />
          </div>
        )}
        {logoType === 'emoji' && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Emoji</Label>
            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-12 justify-start text-2xl">
                  {logoValue || '🖼️'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <ScrollArea className="h-72">
                  <div className="grid grid-cols-8 gap-1 p-2">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={`${emoji}-${index}`}
                        variant="ghost"
                        className="text-lg p-1 h-8 w-8"
                        onClick={() => {
                          onUpdate({ headerLogoValue: emoji });
                          setIsEmojiPickerOpen(false);
                        }}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </Card>
  )
}

interface DesignSettingsProps {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    titleColor: string;
    setTitleColor: (color: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    interactiveTextColor: string;
    setInteractiveTextColor: (color: string) => void;
    funnel: Funnel;
    onUpdateFunnel: (props: Partial<Funnel>) => void;
}

export const DesignSettings: React.FC<DesignSettingsProps> = (props) => {
  const settings = [
    { title: 'GERAL', content: 'Configurações gerais em breve.' },
    { title: 'HEADER', content: <HeaderSettings funnel={props.funnel} onUpdate={props.onUpdateFunnel} /> },
    { title: 'CORES', content: <ColorsContent {...props} /> },
    { title: 'TIPOGRAFIA', content: 'Configurações de tipografia em breve.' },
    { title: 'ANIMAÇÃO', content: 'Configurações de animação em breve.' },
  ];

  return (
    <div className="w-full">
       <Accordion type="single" collapsible className="w-full">
         {settings.map((setting) => (
            <AccordionItem value={setting.title} key={setting.title}>
                <AccordionTrigger className="py-4 px-2 text-sm font-semibold uppercase text-foreground hover:no-underline [&>svg]:hidden">
                  {setting.title}
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  {typeof setting.content === 'string' ? (
                     <p className="p-4 text-sm text-muted-foreground">{setting.content}</p>
                  ) : (
                    setting.content
                  )}
                </AccordionContent>
            </AccordionItem>
         ))}
      </Accordion>
    </div>
  );
};

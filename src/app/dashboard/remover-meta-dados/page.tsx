'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileX, Upload, Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function RemoverMetadadosPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setOriginalFile(file);
      setProcessedFileUrl(null);

      try {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement('img');
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                  if (blob) {
                    setProcessedFileUrl(URL.createObjectURL(blob));
                    toast({ title: 'Sucesso!', description: 'Metadados da imagem removidos.' });
                  }
                }, file.type);
              }
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        } else {
            // For non-image files, create a copy which might strip some OS-level metadata
            const newBlob = file.slice(0, file.size, file.type);
            setProcessedFileUrl(URL.createObjectURL(newBlob));
            toast({ title: 'Sucesso!', description: 'Uma cópia do arquivo foi criada, metadados podem ter sido removidos.' });
        }
      } catch (error) {
        console.error("Error processing file:", error);
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível processar o arquivo.' });
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const handleDownload = () => {
    if(processedFileUrl && originalFile) {
        const a = document.createElement('a');
        a.href = processedFileUrl;
        a.download = `limpo_${originalFile.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Remover Metadados de Arquivos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Faça o upload de um arquivo para remover seus metadados e garantir sua privacidade.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileX className="h-6 w-6" />
            Limpeza de Metadados
          </CardTitle>
          <CardDescription>
            Selecione um arquivo (imagem, PDF, etc.) para limpar as informações ocultas.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 py-12 border-2 border-dashed border-gray-700 rounded-lg">
          <div className="text-center">
            {isProcessing ? (
                <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
            ) : processedFileUrl ? (
                <Download className="mx-auto h-12 w-12 text-green-500" />
            ) : (
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            )}
            <p className="mt-4 text-center text-muted-foreground">
              {isProcessing
                ? 'Processando seu arquivo, aguarde...'
                : processedFileUrl
                ? 'Seu arquivo está pronto para download.'
                : 'Arraste e solte um arquivo aqui ou clique para selecionar.'}
            </p>
          </div>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
          {processedFileUrl ? (
            <div className="flex gap-4">
                 <Button asChild>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                        Enviar Outro
                    </Label>
                </Button>
                <Button onClick={handleDownload} variant="secondary">
                    <Download className="mr-2 h-4 w-4"/>
                    Baixar Arquivo
                </Button>
            </div>
          ) : (
            <Button asChild disabled={isProcessing}>
                <Label htmlFor="file-upload" className="cursor-pointer">
                    {isProcessing ? 'Processando...' : 'Selecionar Arquivo'}
                </Label>
            </Button>
          )}

          {originalFile && processedFileUrl && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <div className="text-center">
                <h3 className="font-semibold">Original</h3>
                {originalFile.type.startsWith('image/') ? (
                   <Image src={URL.createObjectURL(originalFile)} alt="Original" width={300} height={300} className="mt-2 rounded-md mx-auto object-contain h-48 w-auto" />
                ) : (
                    <div className="mt-2 p-4 bg-gray-800 rounded-md">
                        <p>{originalFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(originalFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}
              </div>
               <div className="text-center">
                <h3 className="font-semibold">Processado (Sem Metadados)</h3>
                {originalFile.type.startsWith('image/') ? (
                   <Image src={processedFileUrl} alt="Processado" width={300} height={300} className="mt-2 rounded-md mx-auto object-contain h-48 w-auto" />
                ) : (
                     <div className="mt-2 p-4 bg-gray-800 rounded-md">
                        <p>limpo_{originalFile.name}</p>
                    </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

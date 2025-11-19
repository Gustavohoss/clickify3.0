import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image 
        src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/ayjzhz2ks1igerhd87qkgstr?v=1763468776521" 
        alt="Clickify Logo" 
        width={32} 
        height={32} 
        className="h-8 w-8"
      />
      <span className="text-xl font-bold font-headline">Clickify</span>
    </div>
  );
}

import { Header } from "@/components/landing/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* O conteúdo da sua nova página principal virá aqui */}
      </main>
    </div>
  );
}

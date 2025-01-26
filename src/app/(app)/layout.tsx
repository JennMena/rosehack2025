import AppBar from "./(components)/appbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <div>
      <AppBar />
      <main className="flex flex-col items-center justify-center h-screen ml-[var(--navbar-width)]">
        {children}
      </main>
    </div>
  );


}

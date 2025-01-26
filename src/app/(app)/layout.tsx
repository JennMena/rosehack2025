import AppBar from "./(components)/appbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <div>
      <AppBar />
      <main className="flex flex-col items-center justify-center h-full ml-[var(--navbar-width)] pt-10">
        {children}
      </main>
    </div>
  );


}

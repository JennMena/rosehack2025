import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = constructMetadata({});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Import Lexend font from Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
              <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet"/>
              <link rel="preconnect" href="https://rsms.me/" />
              <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </head>
            <body
              className={cn(
                "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth"
              )}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
              >
                {children}
                <ThemeToggle />
                <TailwindIndicator />
              </ThemeProvider>
            </body>
          </html>
        </ClerkProvider>

        );
}

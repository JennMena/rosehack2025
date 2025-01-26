import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Link = {
  text: string;
  url: string;
};

const links: Link[] = [
  { text: "Home", url: "/profile" },
  { text: "Motivation", url: "#motivation" },
];

export default function Footer() {
  return (
    <footer className="p-5 px-5 lg:px-10">
      <div className="flex items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-2">
          <img
            className="h-8 w-8 rounded-full"
            src="/Logo.png"
            alt="Company Logo"
          />
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            {siteConfig.name}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-x-10">
          <p className="text-[15px]/normal font-medium text-neutral-400 dark:text-neutral-400">
            © RoseHack 2025 - Nina & Jenn :D
          </p>
        </div>

        <ul className="flex items-center justify-center gap-x-10">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

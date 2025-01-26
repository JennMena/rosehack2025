import { siteConfig } from '@/lib/config';
import React from 'react';

const AppBar: React.FC = () => {
    return (
        <>
            {/* Hamburger Menu Button */}
            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-[var(--muted-foreground)] rounded-lg sm:hidden hover:bg-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 shadow-lg">
                    <a href="#" className="flex items-center ps-2.5 mb-5">
                        <img
                            src="/Logo.png"
                            className="h-6 me-3 sm:h-7"
                            alt={siteConfig.name}
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-[var(--foreground)]">
                            {siteConfig.name}
                        </span>
                    </a>

                    <ul className="space-y-2 font-medium">
                        {/* Sidebar Item */}
                        <li>
                            <a
                                href="/profile"
                                className="flex items-center p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] group"
                            >
                                <svg
                                    className="w-5 h-5 text-[var(--muted-foreground)] transition duration-75 group-hover:text-[var(--foreground)]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path
                                        d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"
                                    />
                                </svg>
                                <span className="ms-3">My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard"
                                className="flex items-center p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] group"
                            >
                                <svg
                                    className="w-5 h-5 text-[var(--muted-foreground)] transition duration-75 group-hover:text-[var(--foreground)]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Start Training</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            {/*<div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-[var(--border)]">
                    <p></p>
                </div>
            </div>*/}
        </>
    );
};

export default AppBar;

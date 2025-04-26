'use client';

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
    { label: 'Dashboard', path: '/interviews' },
    { label: 'Questions', path: '/interviews/questions' },
    { label: 'Upgrade', path: '/interviews/upgrade' },
    { label: 'How it Works', path: '/interviews/how-it-works' },
];

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-zinc-900 border-b dark:border-gray-800">
            <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={120} height={60} />
            </div>

            <ul className="flex items-center gap-6 text-gray-700 dark:text-gray-300 font-medium">
                {navLinks.map((link) => (
                    <li
                        key={link.path}
                        className={`cursor-pointer transition ${
                            pathname === link.path 
                                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                                : 'hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    >
                        {link.label}
                    </li>
                ))}
            </ul>

            <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    );
};

export default Header;

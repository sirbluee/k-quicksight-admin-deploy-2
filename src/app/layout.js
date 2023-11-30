'use client'

import {Inter} from 'next/font/google'
import './globals.css'
import NextUI_Provider from "@/app/NextUiProvider";
import SidebarAdmin from "@/components/Table/SidebarAdmin";

const inter = Inter({subsets: ['latin']})
import Providers from "@/store/Providers";

export const metadata = {
    title: 'k-quicksight',
    description: 'Analyze your data!',
}
export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className="bg-background-color">
        <Providers>
            <NextUI_Provider>
                <SidebarAdmin/>
                    {children}
            </NextUI_Provider>
        </Providers>
        </body>
        </html>
    )


}

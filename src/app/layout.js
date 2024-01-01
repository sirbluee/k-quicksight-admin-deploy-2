import {Inter} from 'next/font/google'
import './globals.css'
import NextUI_Provider from "@/app/NextUiProvider";
import SidebarAdmin from "@/components/Table/SidebarAdmin";

const inter = Inter({subsets: ['latin']})
import Providers from "@/store/Providers";

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className="bg-background-color">
            <Providers>
                <NextUI_Provider>

                    <div>
                        {children}
                    </div>
                </NextUI_Provider>
            </Providers>
        </body>
        </html>
    )


}

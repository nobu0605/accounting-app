import type { Metadata } from 'next'
import { Header } from '@/components/common/Header'
import './globals.css'
import { Flex } from '@/components/ui/Flex'
import MuiLocalizationProvider from '@/lib/MuiLocalizationProvider'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'

export const metadata: Metadata = {
  title: 'Accounting',
  description: '',
  icons: {
    icon: '/public/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HR:wght@100..400&display=swap'
          rel='stylesheet'
        ></link>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <meta name='viewport' content='width=1100' />
      </head>
      <body>
        <StyledComponentsRegistry>
          <MuiLocalizationProvider>
            <Flex $gap='10px' $direction='column'>
              <Header />
              <div style={{ margin: '10px' }}>{children}</div>
            </Flex>
          </MuiLocalizationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

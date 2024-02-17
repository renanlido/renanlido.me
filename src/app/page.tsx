import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { SVGProps } from 'react'

import { FlipCard } from '@/components/flip-card'

function WhatsappSvg({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="#000"
      height="800px"
      width="800px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      strokeWidth="2"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M26 0C11.663 0 0 11.663 0 26c0 4.891 1.359 9.639 3.937 13.762C2.91 43.36 1.055 50.166 1.035 50.237a.996.996 0 00.27.981c.263.253.643.343.989.237l10.306-3.17A25.936 25.936 0 0026 52c14.337 0 26-11.663 26-26S40.337 0 26 0zm0 50a23.94 23.94 0 01-12.731-3.651 1 1 0 00-.825-.108l-8.999 2.77a991.452 991.452 0 012.538-9.13c.08-.278.035-.578-.122-.821A23.907 23.907 0 012 26C2 12.767 12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z" />
      <path d="M42.985 32.126c-1.846-1.025-3.418-2.053-4.565-2.803-.876-.572-1.509-.985-1.973-1.218-1.297-.647-2.28-.19-2.654.188a1 1 0 00-.125.152c-1.347 2.021-3.106 3.954-3.621 4.058-.595-.093-3.38-1.676-6.148-3.981-2.826-2.355-4.604-4.61-4.865-6.146C20.847 20.51 21.5 19.336 21.5 18c0-1.377-3.212-7.126-3.793-7.707-.583-.582-1.896-.673-3.903-.273a1.01 1.01 0 00-.511.273c-.243.243-5.929 6.04-3.227 13.066 2.966 7.711 10.579 16.674 20.285 18.13 1.103.165 2.137.247 3.105.247 5.71 0 9.08-2.873 10.029-8.572a.996.996 0 00-.5-1.038zm-12.337 7.385c-10.264-1.539-16.729-11.708-18.715-16.87-1.97-5.12 1.663-9.685 2.575-10.717.742-.126 1.523-.179 1.849-.128.681.947 3.039 5.402 3.143 6.204 0 .525-.171 1.256-2.207 3.293A.996.996 0 0017 22c0 5.236 11.044 12.5 13 12.5 1.701 0 3.919-2.859 5.182-4.722a.949.949 0 01.371.116c.36.181.984.588 1.773 1.104 1.042.681 2.426 1.585 4.06 2.522-.742 3.57-2.816 7.181-10.738 5.991z" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-6">
      <div className="flex flex-col gap-1">
        <FlipCard height="400px" width="400px" />
        <span className="flex items-center justify-center gap-2 text-sm text-white">
          <ArrowUp className="stroke-white" width={12} height={12} /> This is an
          ester egg 🥚. Click or touch to show!
        </span>
      </div>

      <div className="mt-3 flex flex-col items-center gap-10 font-dm-sans md:mt-6 md:gap-20">
        <div className="flex flex-col items-center gap-5 md:gap-2">
          <h1 className="text-3xl text-white">
            Olá 👋, eu sou Renan Oliveira, desenvolvedor fullstack
          </h1>

          <h2 className="text-2xl font-[200] text-white">
            Este é meu portfólio e ele está em construção ⚒️
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8">
          <h3 className="text-2xl font-[200] text-white">
            Abaixo vou deixar algumas das minhas redes para que você possa me
            encontrar
          </h3>

          <div className="flex w-full max-w-[400px] flex-1 items-center justify-between">
            <Link
              href="mailto:renanlido@yahoo.com.br"
              className="group flex items-center justify-center gap-2 text-xl font-[200] text-white"
            >
              email
              <Mail
                width={16}
                height={16}
                className="stroke-none group-hover:stroke-white"
              />
            </Link>

            <Link
              href="https://www.linkedin.com/in/renanlido"
              className="group flex items-center justify-center gap-2 text-xl font-[200] text-white"
            >
              linkedin
              <Linkedin
                width={16}
                height={16}
                className="stroke-none group-hover:stroke-white"
              />
            </Link>

            <Link
              href="https://www.github.com/renanlido"
              className="group flex items-center justify-center gap-2 text-xl font-[200] text-white"
            >
              github
              <Github
                width={16}
                height={16}
                className="stroke-none group-hover:stroke-white"
              />
            </Link>

            <Link
              href="https://api.whatsapp.com/send?phone=5524981655382"
              className="group flex items-center justify-center gap-2 text-xl font-[200] text-white"
            >
              whatsapp
              <WhatsappSvg
                width={16}
                height={16}
                className="stroke-none group-hover:stroke-white"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

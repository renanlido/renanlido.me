'use client'

import Image from 'next/image'

import { withClick } from './flip-image'

type CardProps = {
  variant?: 'front' | 'back'
  width: string
  height: string
}

function Card({ variant = 'front' }: CardProps) {
  return (
    <>
      {variant === 'front' ? (
        <Image
          src="/eu-disney.png"
          alt="Minha imagem disney criada por IA"
          width={990}
          height={986}
          className="rounded-sm"
        />
      ) : (
        <Image
          src="/eu-normal.png"
          alt="Minha imagem"
          width={990}
          height={986}
          className="rounded-sm"
        />
      )}
    </>
  )
}

export const FlipCard = withClick(Card)

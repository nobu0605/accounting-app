'use client'
import { styled } from 'styled-components'
import type { CSSProperties } from 'react'

type ValueOf<T> = T[keyof T]

type CSSPropertyKeys<T extends keyof CSSProperties> = ValueOf<Pick<CSSProperties, T>>

export const Flex = styled('div')<{
  $items?: CSSPropertyKeys<'alignItems'>
  $content?: CSSPropertyKeys<'justifyContent'>
  $direction?: CSSPropertyKeys<'flexDirection'>
  $wrap?: CSSPropertyKeys<'flexWrap'>
  $flow?: CSSPropertyKeys<'flexFlow'>
  $gap?: CSSPropertyKeys<'gap'>
}>`
  display: flex;
  align-items: ${({ $items }) => ($items ? `${$items}` : null)};
  justify-content: ${({ $content }) => ($content ? `${$content}` : null)};
  flex-direction: ${({ $direction }) => ($direction ? `${$direction}` : null)};
  flex-wrap: ${({ $wrap }) => ($wrap ? `${$wrap}` : null)};
  flex-flow: ${({ $flow }) => ($flow ? `${$flow}` : null)};
  gap: ${({ $gap }) => ($gap ? `${$gap}` : null)};
`

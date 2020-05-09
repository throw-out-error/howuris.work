import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Container = styled.span`
  --color-primary: ${({ color }) => color};

  @media (min-width: 768px) {
    position: relative;
  }
`

const Popover = styled.div`
  --offset: 6rem;

  position: absolute;
  font-family: var(--font-family-regular);
  font-size: 1rem;
  width: 85%;
  white-space: normal;

  opacity: 0;
  top: var(--offset);
  transform: translateY(20px);
  animation: slideUp 0.5s ease forwards;

  @media (min-width: 768px) {
    width: 550px;
  }

  @media (min-width: 768px) and (min-height: 1000px) {
    --offset: 5rem;

    top: initial;
    width: 370px;

    ${({ orientation }) => {
      switch (orientation) {
        case 'top':
          return css`
            bottom: var(--offset);
            transform: translateY(-20px);
          `
        default:
          return css`
            top: var(--offset);
            transform: translateY(20px);
          `
      }
    }}

    ${({ align }) => {
      switch (align) {
        case 'right':
          return css`
            right: 0;
          `
        default:
          return css`
            left: 0;
          `
      }
    }}
  }

  @keyframes slideUp {
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  a {
    color: var(--color-primary) !important;
  }
`

export const Chunk = ({
  children,
  color,
  align,
  orientation,
  explanation,
  url,
}) => {
  const location = useLocation()
  const isActive = useMemo(() => {
    return location.pathname.includes(url)
  }, [location.pathname])

  return (
    <Container color={color}>
      <NavLink to={url}>{children}</NavLink>
      {isActive && explanation && (
        <Popover orientation={orientation} align={align}>
          {explanation()}
        </Popover>
      )}
    </Container>
  )
}

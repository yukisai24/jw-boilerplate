import { render, screen } from '@testing-library/react'
import { Button } from './button'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
  it('renders the button with children', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('renders the button with a specific variant', () => {
    render(<Button variant="destructive">Destructive Button</Button>)
    const button = screen.getByText('Destructive Button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-destructive') // Assuming destructive variant adds this class
  })

  it('renders the button with a specific size', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByText('Large Button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-10') // Assuming lg size adds this class
  })

  it('renders the button as a child component', () => {
    render(<Button asChild><a role="link">Link Button</a></Button>)
    expect(screen.getByRole('link')).toHaveTextContent('Link Button')
  })
})
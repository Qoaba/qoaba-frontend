import { render, screen } from '@testing-library/react'
import Home from './../page'
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const body = screen.getByText(/This is a test component/i)
 
    expect(body).toBeInTheDocument()
  })
})
import { render, screen } from "@testing-library/react"
import { Home } from "../pages/Home"

beforeAll(() => {
    render(<Home/>)
})

describe('Renders main page correctly', () => {
    it('should return the page correctly', () => {
        const button = screen.getByRole('button')

        expect(button).not.toBeNull()
    })
})
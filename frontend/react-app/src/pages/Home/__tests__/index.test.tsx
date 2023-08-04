import { render, screen } from '@testing-library/react';
import { Home } from './../index.tsx';

test('renders welcome text', () => {
    render(<Home />);
    const welcomeText = screen.getByText(/Welcome to Mantine!/i);
    expect(welcomeText).toBeInTheDocument();
    }
);
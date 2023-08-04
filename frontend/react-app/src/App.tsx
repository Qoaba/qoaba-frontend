import { ThemeProvider } from './ThemeProvider';
import { Home } from './pages/Home';

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
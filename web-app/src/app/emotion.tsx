"use client";

import { CacheProvider } from '@emotion/react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, useEmotionCache} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { CustomFonts } from './components/CustomFonts';

function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <CacheProvider value={cache}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <CustomFonts />
        <MantineProvider withGlobalStyles withNormalizeCSS
          theme={{
            fontFamily: 'Satoshi, sans-serif',
            colorScheme,
            colors: {
              blue: ['#f3f0ff', '#e5dbff', '#d0bfff', '#b197fc', '#9775fa', '#845ef7', '#7950f2', '#7048e8', '#6741d9', '#5f3dc4'],
            },

            components: {
              Input: {
                styles: (theme) => ({
                  input: { borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1] },
                }),
              },
            }
          }}
        >
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </CacheProvider>
  );
}

export default RootStyleRegistry;

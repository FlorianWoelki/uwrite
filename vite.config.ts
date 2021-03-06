import { UserConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import svgrPlugin from 'vite-plugin-svgr';
import { join } from 'path';

const srcRoot = join(__dirname, 'src');

export default ({ command }: ConfigEnv): UserConfig => {
  if (command === 'serve') {
    return {
      root: srcRoot,
      plugins: [
        react(),
        monacoEditorPlugin(),
        svgrPlugin({ svgrOptions: { icon: true } }),
      ],
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
      },
      optimizeDeps: {
        exclude: ['path'],
      },
    };
  }

  return {
    root: srcRoot,
    plugins: [
      react(),
      monacoEditorPlugin(),
      svgrPlugin({ svgrOptions: { icon: true } }),
    ],
    build: {
      outDir: join(srcRoot, '../dist'),
      emptyOutDir: true,
      rollupOptions: {},
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
    },
    optimizeDeps: {
      exclude: ['path'],
    },
  };
};

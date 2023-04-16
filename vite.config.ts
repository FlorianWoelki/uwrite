import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import { join } from 'path';

const srcRoot = join(__dirname, 'src');

export default (): UserConfig => {
  return {
    root: srcRoot,
    plugins: [react(), svgrPlugin({ svgrOptions: { icon: true } })],
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

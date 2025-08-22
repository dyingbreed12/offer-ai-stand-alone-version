    import type { NextConfig } from 'next';

    const nextConfig: NextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '', // Keep this empty unless your images are served on a specific port
            pathname: '/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/**', // The double asterisk allows any path after this prefix
          },
        ],
      },
    };

    export default nextConfig;
    
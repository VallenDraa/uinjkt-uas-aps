/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
				hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
			},
		],
	},
};

export default nextConfig;

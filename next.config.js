/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lscoecomm.scene7.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'lsco.scene7.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'img2.thuthuatphanmem.vn',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'lscoglobal.scene7.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;

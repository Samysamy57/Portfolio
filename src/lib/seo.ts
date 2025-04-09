import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'samy babouri ─ developer';
	const description = "Hey 👋 I'm samy babouri, a developer";

	return {
		title,
		description,
		canonical: `https://samy-babouri-portfolio.vercel.app/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'samy babouri',
			url: `https://samy-babouri-portfolio.vercel.app/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://samy-babouri-portfolio.vercel.app/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@sameemul_haque',
			site: '@sameemul_haque',
		},
		...props,
	};
}

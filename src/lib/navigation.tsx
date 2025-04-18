import { useTheme } from 'next-themes';

import { Status } from '~/components';
import { usePersistantState, useStatus } from '~/lib';

import { NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'line-md:home',
			text: 'Home',
			href: '/',
		},

		{
			type: NavigationItemType.LINK,
			icon: 'line-md:clipboard-check',
			text: 'Skills',
			href: '/skills',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'line-md:text-box-multiple',
			text: 'Projets',
			href: '/projects',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:clock',
			text: 'Mon Parcours',
			href: '/timeline',
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'line-md:linkedin',
			text: 'LinkedIn',
			href: 'https://www.linkedin.com/in/samy-babouri',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'line-md:github',
			text: 'GitHub',
			href: 'https://github.com/Samysamy57',
			external: true,
		},


		{
			type: NavigationItemType.LINK,
			icon: 'line-md:email',
			text: 'Email',
			href: 'mailto:samybabouri57@hotmail.com',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'mdi:resume',
			text: 'CV',
			href: 'https://drive.google.com/file/d/1Izlve3cknYSfkwEiu3u3HURDTpSXilRI/view?usp=sharing',
			external: true,
		},
	],
];

export function useNavigation(): {
	menu: NavigationItems;
	settings: NavigationItems;
} {
	const state = usePersistantState();
	const { animations: background, sound } = state.get();
	const { color, loading, status } = useStatus();
	const { theme, setTheme } = useTheme();

	const menuItems: NavigationItems = [
		...staticMenuItems,
		...(!loading && status.discord_status !== 'offline'
			? [
				[
					{
						type: NavigationItemType.LINK,
						icon: <Status.Indicator color={color} pulse />,
						text: 'Status',
						href: '/status',
					} as NavigationItem,
				],
			]
			: []),
	];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-circle' : 'feather:circle',
				text: `Animations ${background ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-circle' : 'feather:circle',
				text: `Sounds ${sound ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
			{
				type: NavigationItemType.DIVIDER,
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:monitor',
				endIcon: theme === Theme.SYSTEM ? 'feather:check-circle' : undefined,
				text: 'System Theme',
				onClick: () => setTheme(Theme.SYSTEM),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:sun',
				endIcon: theme === Theme.LIGHT ? 'feather:check-circle' : undefined,
				text: 'Light Theme',
				onClick: () => setTheme(Theme.LIGHT),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:moon',
				endIcon: theme === Theme.DARK ? 'feather:check-circle' : undefined,
				text: 'Dark Theme',
				onClick: () => setTheme(Theme.DARK),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}

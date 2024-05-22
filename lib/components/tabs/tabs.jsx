import {
	Tabs as ReactAriaTabs,
	TabList as ReactAriaTabList,
	Tab as ReactAriaTab,
	TabPanel as ReactAriaTabPanel,
} from 'react-aria-components';
import { __, sprintf } from '@wordpress/i18n';
import { classnames } from '../../utilities/classnames';
import { cloneElement, useId } from 'react';
import { Notice } from '../notice/notice';

export const Tabs = (props) => {
	const { children, vertical, className, ...rest } = props;

	const baseId = useId();

	let tabPanelCounter = 1;
	let tabCounter = 1;

	const preparedChildren = Array.isArray(children) ? children : [children];

	const childrenWithIds = preparedChildren.reduce((acc, child, index) => {
		if (child.type.displayName === 'TabList') {
			const childItems = Array.isArray(child?.props?.children)
				? child?.props?.children
				: [child?.props?.children].filter(Boolean);

			tabCounter = (childItems?.length ?? 0) + 1;
			if (childItems.length < 1) {
				return acc;
			}

			return [
				...acc,
				cloneElement(
					child,
					{
						key: index,
					},
					childItems?.map((innerChild, i) =>
						cloneElement(innerChild, {
							id: `tab-${baseId}-${i + 1}`,
							key: i,
							isParentVertical: vertical,
						}),
					),
				),
			];
		}

		if (child.type.displayName === 'TabPanel') {
			return [
				...acc,
				cloneElement(child, {
					id: `tab-${baseId}-${tabPanelCounter++}`,
					key: index,
					className: classnames(child.props.className, vertical && 'es-uic-border-l es-uic-border-l-300 es-uic-pl-3'),
				}),
			];
		}

		return acc;
	}, []);

	if (tabCounter !== tabPanelCounter) {
		return (
			<Notice
				type='error'
				label={__(
					'Component is not configured correctly. Skipping render to prevent errors.',
					'eightshift-components',
				)}
				subtitle={sprintf(
					__(
						'Number of <Tab>s (%s) and <TabPanel>s (%s) should be the same. <Tab>s should be within a <TabList>.',
						'eightshift-components',
					),
					tabCounter - 1,
					tabPanelCounter - 1,
				)}
				alignIconToTitle
			/>
		);
	}

	return (
		<ReactAriaTabs
			{...rest}
			orientation={vertical ? 'vertical' : 'horizontal'}
			className={classnames(
				vertical
					? 'es-uic-grid es-uic-size-full es-uic-min-h-40 es-uic-grid-cols-[minmax(0,_15rem),_2fr] es-uic-gap-4'
					: 'es-uic-flex-col',
				className,
			)}
		>
			{childrenWithIds}
		</ReactAriaTabs>
	);
};

Tabs.displayName = 'Tabs';

export const TabList = (props) => {
	const { children, 'aria-label': ariaLabel, className, ...other } = props;
	return (
		<ReactAriaTabList
			aria-label={ariaLabel ?? __('tabs', 'eightshift-components')}
			className={({ orientation }) =>
				classnames(
					'es-uic-flex es-uic-gap-1',
					orientation === 'vertical' && 'es-uic-h-full es-uic-flex-col es-uic-pr-1.5',
					orientation === 'horizontal' &&
						'es-uic-w-full es-uic-items-end es-uic-border-b es-uic-border-b-gray-300',
					className,
				)
			}
			{...other}
		>
			{children}
		</ReactAriaTabList>
	);
};

TabList.displayName = 'TabList';

export const Tab = (props) => {
	const { children, disabled, isParentVertical, className, ...other } = props;
	return (
		<ReactAriaTab
			{...other}
			isDisabled={disabled}
			className={({ isSelected, isDisabled }) => {
				return classnames(
					'es-uic-relative es-uic-flex es-uic-select-none es-uic-items-center es-uic-rounded es-uic-p-1.5 es-uic-text-sm es-uic-transition',
					'focus:es-uic-outline-none focus-visible:es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
					'after:es-uic-absolute after:es-uic-rounded-full after:es-uic-bg-teal-600 after:es-uic-shadow-sm after:es-uic-shadow-teal-500/25 after:es-uic-transition after:es-uic-duration-300 after:es-uic-content-[""]',
					!isParentVertical && 'after:es-uic-inset-x-0 after:-es-uic-bottom-px after:es-uic-h-0.5',
					isSelected && 'es-uic-border-b-teal-600 es-uic-text-teal-900 after:es-uic-opacity-100',
					isSelected && isParentVertical && 'after:es-uic-scale-y-100',
					isSelected && !isParentVertical && 'after:es-uic-scale-x-100',
					!isSelected &&
						!isDisabled &&
						'es-uic-text-gray-800 after:es-uic-opacity-0 hover:es-uic-bg-gray-100',
					!isSelected && !isDisabled && isParentVertical && 'after:es-uic-scale-y-75',
					!isSelected && !isDisabled && !isParentVertical && 'after:es-uic-scale-x-75',
					isDisabled && 'es-uic-text-gray-300 after:es-uic-hidden',
					isParentVertical &&
						'es-uic-pl-3 after:es-uic-inset-y-0 after:es-uic-left-px after:es-uic-right-auto after:es-uic-my-auto after:es-uic-h-7 after:es-uic-w-[0.1875rem]',
					className,
				);
			}}
		>
			{children}
		</ReactAriaTab>
	);
};

Tab.displayName = 'Tab';

export const TabPanel = (props) => {
	const { children, className, ...other } = props;
	return (
		<ReactAriaTabPanel
			{...other}
			className={classnames(
				'es-uic-mt-1.5 es-uic-space-y-2.5 es-uic-text-sm focus:es-uic-outline-none',
				className,
			)}
		>
			{children}
		</ReactAriaTabPanel>
	);
};

TabPanel.displayName = 'TabPanel';
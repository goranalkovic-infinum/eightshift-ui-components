import { cloneElement, useState } from 'react';
import { Group, Input, Label, NumberField, Text } from 'react-aria-components';
import { Button } from '../button/button';
import { icons } from '../../icons/icons';
import { classnames } from '../../utilities/classnames';
import { BaseControl } from '../base-control/base-control';

export const NumberPicker = ({
	value,
	onChange,
	min = 0,
	max,
	step = 1,
	label,
	icon,
	subtitle,
	help,
	readOnly,
	disabled,
	placeholder,
	prefix,
	fixedWidth = null,
	suffix,
	children,
	inline,
	noScrollToChange = false,
	...props
}) => {
	const [isInputFocused, setIsInputFocused] = useState(false);

	return (
		<NumberField
			value={value}
			onChange={onChange}
			isDisabled={disabled}
			isReadOnly={readOnly}
			minValue={min}
			maxValue={max}
			step={step}
			isWheelDisabled={noScrollToChange}
			{...props}
		>
			<BaseControl
				labelAs={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				help={help && <Text slot='description'>{help}</Text>}
				inline={inline}
				className='text-sm'
			>
				<Group
					className={classnames(
						'es-uic-flex es-uic-min-h-10 es-uic-w-fit es-uic-items-center es-uic-rounded-md es-uic-border es-uic-border-gray-300 es-uic-pl-1 es-uic-pr-0.5 es-uic-shadow es-uic-transition',
						isInputFocused && 'es-uic-outline-none focus-visible:es-uic-ring focus-visible:es-uic-ring-teal-500 focus-visible:es-uic-ring-opacity-50',
						!prefix && 'es-uic-pl-2',
					)}
				>
					{prefix && (
						<span
							slot='prefix'
							className='es-uic-col-start-1 es-uic-row-span-2 es-uic-mr-0.5 es-uic-select-none es-uic-self-center es-uic-text-gray-500'
						>
							{prefix}
						</span>
					)}
					<Input
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
						className='es-uic-col-start-2 es-uic-row-span-2 es-uic-bg-transparent es-uic-py-1 es-uic-tabular-nums focus:es-uic-outline-none'
						placeholder={placeholder}
						style={{
							width: fixedWidth
								? `${fixedWidth}ch`
								: `calc(${min < 0 ? '0.75ch + ' : ''}${(max ?? 1000)?.toString()?.length} * 1ch)`,
						}}
					/>
					{suffix && (
						<span
							slot='suffix'
							className='es-uic-col-start-3 es-uic-row-span-2 es-uic-select-none es-uic-self-center es-uic-text-gray-500'
						>
							{suffix}
						</span>
					)}
					<div>
						<Button
							type='ghost'
							className='es-uic-col-start-4 !es-uic-h-3 !es-uic-w-5 !es-uic-rounded !es-uic-text-gray-500 disabled:!es-uic-text-gray-300 [&>svg]:es-uic-size-[0.8rem]'
							slot='increment'
							icon={icons.caretUpFill}
						/>
						<Button
							type='ghost'
							className='es-uic-col-start-4 !es-uic-h-3 !es-uic-w-5 !es-uic-rounded !es-uic-text-gray-500 disabled:!es-uic-text-gray-300 [&>svg]:es-uic-size-[0.8rem]'
							slot='decrement'
							icon={icons.caretDownFill}
						/>
					</div>

					{children && (
						<>
							<div className='es-uic-h-[2.375rem] es-uic-w-px es-uic-bg-gray-300' />
							<div className='es-uic-pl-1 es-uic-pr-0.5'>
								{Array.isArray(children)
									? children.map((child) => cloneElement(child, { slot: null }))
									: cloneElement(children, { slot: null })}
							</div>
						</>
					)}
				</Group>
			</BaseControl>
		</NumberField>
	);
};

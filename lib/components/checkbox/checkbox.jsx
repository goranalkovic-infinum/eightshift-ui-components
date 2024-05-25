import { Checkbox as ReactAriaCheckbox } from 'react-aria-components';
import { classnames } from '../../utilities/classnames';
import { AnimatedVisibility } from '../animated-visibility/animated-visibility';
import { icons } from '../../icons/icons';
import { IconLabel } from '../icon-label/icon-label';

/**
 * A simple checkbox.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {JSX.Element} [props.icon] - The checkbox icon.
 * @param {string} [props.label] - The checkbox label.
 * @param {string} [props.subtitle] - The checkbox subtitle.
 * @param {boolean} props.checked - Whether the checkbox is checked.
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled.
 * @param {boolean} [props.readOnly] - Whether the checkbox is read-only.
 * @param {boolean} [props.indeterminate] - Whether the checkbox is in an indeterminate state.
 * @param {Function} props.onChange - The function to call when the checkbox is changed.
 * @param {string} [props.className] - Additional classes to add to the checkbox container.
 * @param {string} [props.labelClassName] - Additional classes to add to the label container.
 * @param {boolean} [props.alignEnd] - Whether the label should be aligned to the end.
 *
 * @returns {JSX.Element} The Checkbox component.
 *
 * @example
 * <Checkbox
 *  label='My label'
 *  checked={myValue}
 *  onChange={(value) => setMyValue(value)}
 * />
 *
 * @preserve
 */
export const Checkbox = (props) => {
	const {
		icon,
		label,
		subtitle,

		checked,
		disabled,
		readOnly,
		indeterminate,

		onChange,

		className,
		labelClassName,

		alignEnd,

		children,
		...other
	} = props;

	return (
		<ReactAriaCheckbox
			isDisabled={disabled}
			isIndeterminate={indeterminate}
			isReadOnly={readOnly}
			isSelected={checked ?? false}
			onChange={onChange}
			className={classnames(
				'es-uic-flex es-uic-w-full es-uic-items-center es-uic-gap-1.5 es-uic-text-sm',
				className,
			)}
			{...other}
		>
			{({ isIndeterminate, isSelected }) => (
				<>
				{((icon || alignEnd) && (label || subtitle)) && (
						<IconLabel
							icon={icon}
							label={label}
							subtitle={subtitle}
							className={labelClassName}
							fullWidth
						/>
					)}
					<div
						className={classnames(
							'es-uic-flex es-uic-size-5 es-uic-items-center es-uic-justify-center es-uic-rounded-md es-uic-border es-uic-text-gray-600 es-uic-shadow-sm es-uic-transition',
							isSelected
								? 'es-uic-border-teal-600 es-uic-bg-teal-600 es-uic-text-white'
								: 'es-uic-border-gray-300',
						)}
					>
						<AnimatedVisibility
							transition='scaleRotateFade'
							visible={isIndeterminate}
						>
							<div className='es-uic-h-[1.5px] es-uic-w-3 es-uic-rounded es-uic-bg-white' />
						</AnimatedVisibility>

						<AnimatedVisibility
							transition='scaleRotateFade'
							visible={!isIndeterminate && isSelected}
							className='[&>svg]:es-uic-size-3 [&>svg]:es-uic-stroke-2'
							noInitial
						>
							{icons.check}
						</AnimatedVisibility>
					</div>
					{(!icon && !alignEnd && (label || subtitle)) && (
						<IconLabel
							label={label}
							subtitle={subtitle}
							className={labelClassName}
						/>
					)}
					{!(icon || label || subtitle) && children}
				</>
			)}
		</ReactAriaCheckbox>
	);
};

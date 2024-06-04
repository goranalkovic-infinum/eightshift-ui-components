/* eslint-disable react/prop-types */
import { Label } from 'react-aria-components';
import { Switch } from './switch';
import { IconLabel } from '../icon-label/icon-label';

/**
 * A toggle switch with a label and optional icon and subtitle.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.checked - Whether the switch is checked.
 * @param {Function} props.onChange - Function to call when the switch is toggled.
 * @param {boolean} [props.disabled] - Whether the switch is disabled.
 * @param {JSX.Element} [props.icon] - Icon to display.
 * @param {string} props.label - Label to display.
 * @param {string} [props.subtitle] - Subtitle to display.
 * @param {string} [props.className] - Classes to pass to the toggle switch.
 * @param {string} [props.labelClassName] - Classes to pass to the label.
 *
 * @returns {JSX.Element} The Toggle component.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 *
 * <Toggle
 * 	icon={icons.myIcon}
 * 	label='My toggle'
 * 	checked={checked}
 * 	onChange={() => setChecked(!checked)}
 * />
 *
 * @preserve
 */
export const Toggle = (props) => {
	const { checked, onChange, icon, label, subtitle, disabled, className, labelClassName } = props;

	return (
		<Switch
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			className={className}
		>
			<IconLabel
				as={Label}
				icon={icon}
				label={label}
				subtitle={subtitle}
				className={labelClassName}
				fullWidth
			/>
		</Switch>
	);
};

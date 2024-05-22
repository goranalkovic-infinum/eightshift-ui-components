import './animated-visibility.d';

import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component that allows animating the visibility of its children.
 *
 * @component
 * @param {AnimatedVisibilityProps} props - The component props.
 * @returns {JSX.Element} The AnimatedVisibility component.
 *
 * @example
 * const [visible, setVisible] = useState(false);
 *
 * <AnimatedVisibility visible={visible}>
 * 	<div>Content</div>
 * </AnimatedVisibility>
 */
export const AnimatedVisibility = (props) => {
	const {
		visible,
		className,
		children,
		noInitial = false,
		transition = 'slideFade',
		...other
	} = props;

	const transitions = {
		slideFade: {
			initial: { opacity: 0, y: -5 },
			animate: { opacity: 1, y: 0 },
			exit: { opacity: 0, y: -5 },
		},
		scaleFade: {
			initial: { opacity: 0, scale: 0.9 },
			animate: { opacity: 1, scale: 1 },
			exit: { opacity: 0, scale: 0.9 },
		},
	};

	return (
		<AnimatePresence initial={!noInitial}>
			{visible && (
				<motion.div
					initial={transitions[transition].initial}
					animate={transitions[transition].animate}
					exit={transitions[transition].exit}
					className={className}
					{...other}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

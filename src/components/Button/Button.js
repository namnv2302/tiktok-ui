import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, leftIcon, rightIcon, disabled, type, size, className, children, onClick, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary: type === 'primary',
        outline: type === 'outline',
        outline_2: type === 'outline_2',
        rounded: type === 'rounded',
        small: size === 'small',
        large: size === 'large',
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;

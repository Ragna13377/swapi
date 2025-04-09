import type { Ref } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router';
import type { LinkProps } from 'react-router';

type TColors = keyof typeof colors;
type LinkButtonProps = LinkProps & {
	ref?: Ref<HTMLAnchorElement>;
	variant?: TColors;
};

const colors = {
	primary: 'hsla(45, 100%, 51%, 1)',
	secondary: 'hsla(122, 54%, 64%, 1)',
} as const;

const StyledLink = styled(Link)<LinkButtonProps>`
	min-inline-size: 14.62rem;
	min-block-size: 4rem;
	padding: 1rem 3.75rem;
	border-radius: 0.75rem;
	border: none;
	font-size: 1.4375rem;
	font-weight: 700;
	line-height: 100%;
	text-align: center;
	vertical-align: middle;
	color: hsla(0, 0%, 13%, 1);
	background: ${({ variant = 'primary' }) => colors[variant]};
	box-shadow: 0 -0.5625rem 0 0 hsla(0, 0%, 0%, 0.18) inset;
	transition: box-shadow 0.15s ease-in-out;
	cursor: pointer;
`;

export const LinkButton = (props: LinkButtonProps) => <StyledLink {...props} />;

import { type PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { Header } from '@shared/ui/Header';

type LayoutWrapperProps = PropsWithChildren & {
	$background?: string;
};

const StyledMain = styled.main<LayoutWrapperProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	block-size: 100%;
	inline-size: 100%;
	background: ${({ $background = 'white' }) => $background};
	overflow: hidden;
	padding-block-start: 5.75rem;
	@meida (max-width: 720px) {
		padding-block-start: 10.75rem;
	}
`;

const StyledWrapper = styled.div`
	max-inline-size: 1440px;
	inline-size: 100%;
	height: 100%;
	padding: 0 clamp(1rem, 5vw + 1rem, 9.875rem) 0;
`;

export const PageWrapper = ({ $background, children }: LayoutWrapperProps) => (
	<>
		<Header />
		<StyledMain $background={$background}>
			<StyledWrapper>{children}</StyledWrapper>
		</StyledMain>
	</>
);

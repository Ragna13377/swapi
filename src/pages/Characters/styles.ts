import { styled } from 'styled-components';

export const StyledContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	padding-block: 4.75rem;
	block-size: 100%;
`;

export const StyledCardWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	gap: 45px 34px;
	overflow-y: scroll;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const StyledTitle = styled.h2`
	font-weight: 400;
	font-size: 35px;
	line-height: 1;
	letter-spacing: 3px;
	text-align: center;
	color: hsla(0, 0%, 0%, 1);
	text-shadow:
		-1px -1px 0 hsla(0, 0%, 0%, 1),
		0px 4px 4px hsla(0, 0%, 0%, 0.25);
	span {
		font-weight: 700;
	}
`;

export const StyledFilterWrapper = styled.div`
	display: flex;
	inline-size: max-content;
	gap: 0.625rem;
`;

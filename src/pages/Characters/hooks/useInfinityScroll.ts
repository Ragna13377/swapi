import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@shared/hooks/useIntersectionObserver';

type UseInfinityScrollProps = {
	charactersCount: number;
	onLoadMore: () => void;
	isEnabled: boolean;
};

export const useInfinityScroll = ({
	charactersCount,
	onLoadMore,
	isEnabled,
}: UseInfinityScrollProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [observerTarget, setObserverTarget] = useState<Element | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const children = container.children;
		const targetIndex = Math.max(0, children.length - 4);
		const newTarget = children[targetIndex] || null;
		setObserverTarget((prev) => (prev !== newTarget ? newTarget : prev));
	}, [charactersCount]);

	useIntersectionObserver({
		element: observerTarget,
		onIntersect: onLoadMore,
		isEnabled,
	});

	return { containerRef };
};

import { useEffect, useRef } from 'react';

type UseInfinityScrollProps = {
	onIntersect: () => void;
	intersectedElementFromEnd?: number;
	isDisabled: boolean;
};

const observerConfig = {
	rootMargin: '100px',
	threshold: 0,
};

export const useInfinityScroll = ({
	onIntersect,
	isDisabled,
	intersectedElementFromEnd = 1,
}: UseInfinityScrollProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver>(null);

	useEffect(() => {
		if (isDisabled || !containerRef.current) {
			observerRef.current?.disconnect();
			return;
		}
		const container = containerRef.current;
		const children = container.children;
		const targetIndex = Math.max(
			0,
			children.length - intersectedElementFromEnd
		);
		const target = children[targetIndex];

		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]: IntersectionObserverEntry[]) => {
				console.log('🟡 Intersection observed', {
					isIntersecting: entry.isIntersecting,
					target: entry.target,
					time: entry.time,
					boundingClientRect: entry.boundingClientRect,
					intersectionRect: entry.intersectionRect,
				});
				if (entry.isIntersecting) onIntersect();
			},
			observerConfig
		);

		observer.observe(target);
		observerRef.current = observer;

		return () => observer.disconnect();
	}, [isDisabled, intersectedElementFromEnd, onIntersect]);

	return { containerRef };
};

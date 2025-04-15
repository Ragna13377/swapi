import { useEffect, useRef } from 'react';

const defaultObserverConfig: IntersectionObserverInit = {
	rootMargin: '100px',
	threshold: 0,
};

type UseInfinityScrollProps = {
	element: Element | null;
	onIntersect: () => void;
	observerConfig?: IntersectionObserverInit;
	isEnabled?: boolean;
};

export const useIntersectionObserver = ({
	element,
	onIntersect,
	observerConfig = defaultObserverConfig,
	isEnabled,
}: UseInfinityScrollProps) => {
	const observerRef = useRef<IntersectionObserver>(null);
	useEffect(() => {
		if (!element || !isEnabled) {
			observerRef.current?.disconnect();
			return;
		}

		const observer = new IntersectionObserver(([entry], obs) => {
			if (entry.isIntersecting) {
				onIntersect();
				obs.unobserve(entry.target);
			}
		}, observerConfig);

		observer.observe(element);
		observerRef.current = observer;

		return () => observerRef.current?.disconnect();
	}, [element, observerConfig, isEnabled]);
};

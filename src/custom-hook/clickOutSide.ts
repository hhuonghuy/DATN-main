import { useEffect, useState } from 'react';

function useIsOutsideElement(containerRef: React.RefObject<HTMLElement>) {
	const [isOutside, setIsOutside] = useState<boolean>(true);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOutside(true);
			} else {
				setIsOutside(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [containerRef]);

	return isOutside;
}

export default useIsOutsideElement;

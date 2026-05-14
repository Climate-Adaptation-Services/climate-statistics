const measureCache = new Map();
let sharedCanvas;

function getContext() {
	if (typeof document === 'undefined') return null;
	if (!sharedCanvas) sharedCanvas = document.createElement('canvas');
	return sharedCanvas.getContext('2d');
}

export function measureTextWidth(text, fontSize = 14, fontFamily = 'Silka, sans-serif') {
	const key = `${fontSize}|${fontFamily}|${text}`;
	if (measureCache.has(key)) return measureCache.get(key);
	const ctx = getContext();
	if (!ctx) {
		const fallback = String(text).length * fontSize * 0.6;
		measureCache.set(key, fallback);
		return fallback;
	}
	ctx.font = `${fontSize}px ${fontFamily}`;
	const width = ctx.measureText(String(text)).width;
	measureCache.set(key, width);
	return width;
}

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

export function computeMargins({
	width,
	height,
	yTickLabels = [],
	hasLegendOnRight = false,
	fontSize = 14
} = {}) {
	const longest = yTickLabels.reduce(
		(acc, label) => Math.max(acc, measureTextWidth(label, fontSize)),
		0
	);

	const left = clamp(longest + 16, 48, Math.max(60, width * 0.25));
	const right = hasLegendOnRight
		? clamp(width * 0.15, 80, 160)
		: clamp(left, 24, 80);
	const top = clamp(height * 0.08, 24, 80);
	const bottom = clamp(height * 0.12, 40, 80);

	return { top, right, bottom, left };
}

export function getBreakpoint(width) {
	if (width < 480) return 'sm';
	if (width < 768) return 'md';
	return 'lg';
}

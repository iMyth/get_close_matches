function dp(a, b, current = 0) {
	const lengtha = a.length;
	const lengthb = b.length;
	if (lengtha === 1 && lengthb === 1) {
		return (a === b ? 0 : 1) + current;
	}

	if (lengtha === 1 && lengthb > 1) {
		return (a === b[0] ? lengthb - 1 : lengthb) + current;
	}

	if (a.length > 1 && b.length === 1) {
		return (a[0] === b ? lengtha - 1 : lengtha) + current;
	}

	if (a[0] === b[0]) {
		return dp(a.slice(1, lengtha), b.slice(1, lengthb), current);
	}

	return Math.min(
		dp(`${b[0]}${a}`, b, current + 1),
		dp(a.slice(1, lengtha), b.slice(1, lengthb), current + 1)
	);
}

module.exports = (letter, keywords) => {
	if (!letter || !Array.isArray(keywords)) {
		return;
	}
	const mapping = keywords.map(p => ({
		keyword: p,
		steps: dp(letter, p)
	}));

	const leastStep = Math.min(...mapping.map(p => p.steps));

	return mapping.filter(p => p.steps === leastStep).map(p => p.keyword);
};

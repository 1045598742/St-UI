/**
 * 处理计算精度
 * @param value
 */
export function precisionFormat(value: number) {
	return parseFloat(value.toFixed(9))
}

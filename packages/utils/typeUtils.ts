type TypeUtils = {
	/** 是否是数字 */
	isNumber: (value: any) => value is number
	/** 是否是字符串 */
	isString: (value: any) => value is string
	/** 是否是布尔值 */
	isBoolean: (value: any) => value is boolean
	/** 是否是函数 */
	isFunction: (value: any) => value is Function
	/** 是否是undefined */
	isUndefined: (value: any) => value is undefined
	/** 是否是对象 */
	isObject: (value: any) => value is Record<any, any>
	/** 是否是数组 */
	isArray: (value: any) => value is any[]
	/** 是否是日期 */
	isDate: (value: any) => value is Date
	/** 是否是正则 */
	isRegexp: (value: any) => value is RegExp
	/** 是否是文件 */
	isFile: (value: any) => value is File
	/** 是否是async函数 */
	isAsyncFunction: (value: any) => value is () => Promise<any>
}

function toStringTag(value: any) {
	return Object.prototype.toString.call(value).slice(8, -1)
}

/** 函数柯里化 */
function currying<R>(this: any, fn: Function): R {
	// eslint-disable-next-line no-shadow
	function inner(this: any, ...args: unknown[]): unknown {
		if (args.length < fn.length) {
			// eslint-disable-next-line no-shadow
			return function (this: any, ...rest: any[]) {
				return inner.call(this, ...args, ...rest)
			}
		} else {
			return fn.call(this, ...args)
		}
	}

	return inner.call(this) as R
}

/** 判断类型 */
function judgeType(this: any, type: string, value: any) {
	return toStringTag(value) === type
}

const getType = currying<Function>(judgeType)

const typeTags = [
	'String',
	'Null',
	'Number',
	'Boolean',
	'Function',
	'Undefined',
	'Object',
	'Array',
	'Date',
	'Regexp',
	'File',
	'AsyncFunction'
] as const

export const typeUtils = {
	...typeTags.reduce<TypeUtils>((it, typeTag) => {
		return {
			...it,
			[`is${typeTag}` as const]: getType(typeTag)
		}
	}, {} as any),
	/** 是否是空值（不包含0） */
	isEmpty(value: unknown): boolean {
		return !value && value !== 0
	},
	/** 是否为空值（简单判断） */
	isEasyEmpty(value: any) {
		return !value
	}
}

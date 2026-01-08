const _serviceTypes = <const>[
	'hight',
	'foot-line',
	'foot-ground',
	'contact',
	'court',
	'flick',
]

const _ralyTypes = <const>[
	'net',
	'touch',
	'double',
	'over-net',
	'under-net',
	// "contact",
]

const _pointTypes = <const>['fair', 'out']

const serviceTypes = _serviceTypes.map(
	(t) => `s:${t}` satisfies `s:${ServiceTypesType}`
)

const ralyTypes = _ralyTypes.map(
	(t) => `ir:${t}` satisfies `ir:${RalyTypesType}`
)

const pointTypes = _pointTypes.map(
	(t) => `p:${t}` satisfies `p:${PointTypesType}`
)

const commentaryTypes = <const>[...pointTypes, ...ralyTypes, ...serviceTypes]

type ServiceTypesType = (typeof _serviceTypes)[number]

type RalyTypesType = (typeof _ralyTypes)[number]

type PointTypesType = (typeof _pointTypes)[number]

type CommentaryTypesType =
	| (typeof pointTypes)[number]
	| (typeof ralyTypes)[number]
	| (typeof serviceTypes)[number] //(typeof commentaryTypes)[number];

export type { CommentaryTypesType }

export { pointTypes, ralyTypes, serviceTypes, commentaryTypes }

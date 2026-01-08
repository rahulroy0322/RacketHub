import type { CommentaryTypesType } from './type'

const typeToMsgMap = {
	// Raly
	// "ir:contact": "",
	'ir:double':
		"One shot only! You can't hit the bird twice, and partners can't 'pass' it to each other.",
	'ir:net':
		'Clear the mesh! If your shot gets stuck in the net or fails to pass over, the rally is over.',
	'ir:over-net':
		'Safe follow-through! You can follow through over the net only if you hit it on your side first.',
	// Control your swing! Hitting the net after a smash is still a fault.
	'ir:touch':
		'Hands off! If the shuttle touches your clothes, your arm, or any part of your body(a part from racket), the point is over.',
	// "ir:under-net": "Got under net is still a fault",
	'ir:under-net':
		"Watch your step! Your racket or feet cannot invade the opponent's court even under the net.",

	// Point
	'p:fair': 'Well Played!',
	'p:out': 'Better Luck Next Time.',

	// Service
	's:contact':
		'Hit the cork! The initial point of contact must be on the base (cork) of the shuttle.',
	's:court':
		"Aim for the diagonal! No Serve into the wrong service box or the 'short' area.",
	's:flick':
		"No tricks! No unnecessary delay or 'fake' movements to distract the opponent.",
	's:foot-ground':
		"Keep 'em planted! Both feet must remain in contact with the floor until the serve is delivered.",
	's:foot-line':
		"Stay in the box! Don't step on the lines your feet until the serve is struck.",
	's:hight':
		'Keep it low! The shuttle must be hit below 1.15m (or your lowest rib).',
	// Clear the line! If the shuttle lands before the 'short service line,' you lose the point."

	// "Know your lines! In singles, the back line is long; in doubles, the inner back line is the limit."
} satisfies Record<CommentaryTypesType, string>

const typeToTitleMap = {
	// Raly
	// "ir:contact": "",
	'ir:double': 'Double',
	'ir:net': 'Net Touch',
	'ir:over-net': 'Net Over',
	'ir:touch': 'Body',
	'ir:under-net': 'Net Under',

	// Point
	'p:fair': 'Fair Point',
	'p:out': 'Out',

	// Service
	's:contact': 'Fatcher',
	's:court': 'Wrong Box',
	's:flick': 'Movement',
	's:foot-ground': 'Feet Up',
	's:foot-line': 'Line Touch',
	's:hight': 'High Serve',
} satisfies Record<CommentaryTypesType, string>

export { typeToMsgMap, typeToTitleMap }

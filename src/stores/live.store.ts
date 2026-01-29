import { create } from 'zustand'
import type { TeamType } from '@/types'

type UseLiveType = {
	teamId: TeamType['_id'] | null
	teamA: TeamType | null
	teamB: TeamType | null
	scoreA: number
	scoreB: number
	lastPoint: TeamType['_id'] | null
	maxPoints: number
}

const useLive = create<UseLiveType>(() => ({
	teamId: null,
	teamA: null,
	teamB: null,
	scoreA: 0,
	scoreB: 0,
	lastPoint: null,
	maxPoints: 0,
}))

const { setState: set } = useLive

const setTeamId = (teamId: string | null) =>
	set({
		teamId,
	})

const setTeam = (teams: { teamA: TeamType | null; teamB: TeamType | null }) =>
	set(teams)

export { useLive, setTeamId, setTeam }

export default useLive

export type MyElementData =
	| {
			resource: 'group'
			isGroup: boolean
			groupUuid: string
	  }
	| {
			resource: 'pod'
			isPod: boolean
			podUuid: string
	  }

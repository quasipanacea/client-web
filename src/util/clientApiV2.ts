import type * as schema from '../../common/schemaV2'
import * as util from '@/util/util'

//
//
// Pod
export async function podAdd(
	data: schema.podAdd_reqT,
): Promise<schema.podAdd_resT> {
	const result = await util.unwrap<schema.podAdd_reqT, schema.podAdd_resT>(
		'/api/v2/pod/add',
		data,
	)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function podRemove(
	data: schema.podRemove_reqT,
): Promise<schema.podRemove_resT> {
	const result = await util.unwrap<
		schema.podRemove_reqT,
		schema.podRemove_resT
	>('/api/v2/pod/remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function podList(
	data: schema.podList_reqT,
): Promise<schema.podList_resT> {
	const result = await util.unwrap<schema.podList_reqT, schema.podList_resT>(
		'/api/v2/pod/list',
		data,
	)
	if (result instanceof Error) {
		return { pods: [] }
	} else {
		return result
	}
}

export async function podListPlugins(
	data: schema.podListPlugins_reqT,
): Promise<schema.podListPlugins_resT> {
	const result = await util.unwrap<
		schema.podListPlugins_reqT,
		schema.podListPlugins_resT
	>('/api/v2/pod/list-plugins', data)
	if (result instanceof Error) {
		return { plugins: [] }
	} else {
		return result
	}
}

export async function podQuery(
	data: schema.podQuery_reqT,
): Promise<schema.podQuery_resT> {
	const result = await util.unwrap<schema.podQuery_reqT, schema.podQuery_resT>(
		'/api/v2/pod/query',
		data,
	)
	if (result instanceof Error) {
		return { handler: '', name: '' }
	} else {
		return result
	}
}

//
//
// Area
export async function areaAdd(
	data: schema.areaAdd_reqT,
): Promise<schema.areaAdd_resT> {
	const result = await util.unwrap<schema.areaAdd_reqT, schema.areaAdd_resT>(
		'/api/v2/area/add',
		data,
	)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function areaRemove(
	data: schema.areaRemove_reqT,
): Promise<schema.areaRemove_resT> {
	const result = await util.unwrap<
		schema.areaRemove_reqT,
		schema.areaRemove_resT
	>('/api/v2/area/remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function areaRename(
	data: schema.areaRename_reqT,
): Promise<schema.areaRename_resT> {
	const result = await util.unwrap<
		schema.areaRename_reqT,
		schema.areaRename_resT
	>('/api/v2/area/rename', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function areaList(
	data: schema.areaList_reqT,
): Promise<schema.areaList_resT> {
	const result = await util.unwrap<schema.areaList_reqT, schema.areaList_resT>(
		'/api/v2/area/list',
		data,
	)
	if (result instanceof Error) {
		return { areas: [] }
	} else {
		return result
	}
}

//
//
// Topic
export async function topicAdd(
	data: schema.topicAdd_reqT,
): Promise<schema.topicAdd_resT> {
	const result = await util.unwrap<schema.topicAdd_reqT, schema.topicAdd_resT>(
		'/api/v2/topic/add',
		data,
	)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function topicRemove(
	data: schema.topicRemove_reqT,
): Promise<schema.topicRemove_resT> {
	const result = await util.unwrap<
		schema.topicRemove_reqT,
		schema.topicRemove_resT
	>('/api/v2/topic/remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function topicRename(
	data: schema.topicRename_reqT,
): Promise<schema.topicRename_resT> {
	const result = await util.unwrap<
		schema.topicRename_reqT,
		schema.topicRename_resT
	>('/api/v2/topic/rename', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function topicList(
	data: schema.topicList_reqT,
): Promise<schema.topicList_resT> {
	const result = await util.unwrap<
		schema.topicList_reqT,
		schema.topicList_resT
	>('/api/v2/topic/list', data)
	if (result instanceof Error) {
		return { topics: [] }
	} else {
		return result
	}
}

//
//
// Note
export async function noteAdd(
	data: schema.noteAdd_reqT,
): Promise<schema.noteAdd_resT> {
	const result = await util.unwrap<schema.noteAdd_reqT, schema.noteAdd_resT>(
		'/api/v2/note/add',
		data,
	)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteRemove(
	data: schema.noteRemove_reqT,
): Promise<schema.noteRemove_resT> {
	const result = await util.unwrap<
		schema.noteRemove_reqT,
		schema.noteRemove_resT
	>('/api/v2/note/remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteRename(
	data: schema.noteRename_reqT,
): Promise<schema.noteRename_resT> {
	const result = await util.unwrap<
		schema.noteRename_reqT,
		schema.noteRename_resT
	>('/api/v2/note/rename', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteRead(
	data: schema.noteRead_reqT,
): Promise<schema.noteRead_resT> {
	const result = await util.unwrap<schema.noteRead_reqT, schema.noteRead_resT>(
		'/api/v2/note/read',
		data,
	)
	if (result instanceof Error) {
		return { content: '' }
	} else {
		return result
	}
}

export async function noteWrite(
	data: schema.noteWrite_reqT,
): Promise<schema.noteWrite_resT> {
	const result = await util.unwrap<
		schema.noteWrite_reqT,
		schema.noteWrite_resT
	>('/api/v2/note/write', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteQuery(
	data: schema.noteQuery_reqT,
): Promise<schema.noteQuery_resT> {
	const result = await util.unwrap<
		schema.noteQuery_reqT,
		schema.noteQuery_resT
	>('/api/v2/note/query', data)
	if (result instanceof Error) {
		return {
			result: '',
		}
	} else {
		return result
	}
}

export async function noteList(
	data: schema.noteList_reqT,
): Promise<schema.noteList_resT> {
	const result = await util.unwrap<schema.noteList_reqT, schema.noteList_resT>(
		'/api/v2/note/list',
		data,
	)
	if (result instanceof Error) {
		return {
			notes: [],
		}
	} else {
		return result
	}
}

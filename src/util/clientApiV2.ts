import * as schema from '../../common/schemaV2'
import * as util from '@/util/util'

export type Result<T> = Promise<T | null>

//
//
// Area
export async function areaAdd(
	data: schema.areaAdd_reqT,
): Result<schema.areaAdd_resT> {
	const result = await util.unwrap<schema.areaAdd_reqT, schema.areaAdd_resT>(
		'/api/v2/area-add',
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
): Result<schema.areaRemove_resT> {
	const result = await util.unwrap<
		schema.areaRemove_reqT,
		schema.areaRemove_resT
	>('/api/v2/area-remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function areaRename(
	data: schema.areaRename_reqT,
): Result<schema.areaRename_resT> {
	const result = await util.unwrap<
		schema.areaRename_reqT,
		schema.areaRename_resT
	>('/api/v2/area-rename', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function areaList(
	data: schema.areaList_reqT,
): Result<schema.areaList_resT> {
	const result = await util.unwrap<schema.areaList_reqT, schema.areaList_resT>(
		'/api/v2/area-list',
		data,
	)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

//
//
// Topic
export async function topicAdd(
	data: schema.topicAdd_reqT,
): Result<schema.topicAdd_resT> {
	const result = await util.unwrap<schema.topicAdd_reqT, schema.topicAdd_resT>(
		'/api/v2/topic-add',
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
): Result<schema.topicRemove_resT> {
	const result = await util.unwrap<
		schema.topicRemove_reqT,
		schema.topicRemove_resT
	>('/api/v2/topic-remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function topicRename(
	data: schema.topicRename_reqT,
): Result<schema.topicRename_resT> {
	const result = await util.unwrap<
		schema.topicRename_reqT,
		schema.topicRename_resT
	>('/api/v2/topic-rename', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function topicList(
	data: schema.topicList_reqT,
): Result<schema.topicList_resT> {
	const result = await util.unwrap<
		schema.topicList_reqT,
		schema.topicList_resT
	>('/api/v2/topic-list', data)
	if (result instanceof Error) {
		return { galaxies: [] }
	} else {
		return result
	}
}

//
//
// Note
export async function noteAdd(
	data: schema.noteAdd_reqT,
): Result<schema.noteAdd_resT> {
	const result = await util.unwrap<schema.noteAdd_reqT, schema.noteAdd_resT>(
		'/api/v2/note-add',
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
): Result<schema.noteRemove_resT> {
	const result = await util.unwrap<
		schema.noteRemove_reqT,
		schema.noteRemove_resT
	>('/api/v2/note-remove', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteRename(
	data: schema.noteRename_reqT,
): Result<schema.noteRename_resT> {
	const result = await util.unwrap<
		schema.noteRename_reqT,
		schema.noteRename_resT
	>('/api/v2/note-rename', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteRead(
	data: schema.noteRead_reqT,
): Result<schema.noteRead_resT> {
	const result = await util.unwrap<schema.noteRead_reqT, schema.noteRead_resT>(
		'/api/v2/note-read',
		data,
	)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteWrite(
	data: schema.noteWrite_reqT,
): Result<schema.noteWrite_resT> {
	const result = await util.unwrap<
		schema.noteWrite_reqT,
		schema.noteWrite_resT
	>('/api/v2/note-write', data)
	if (result instanceof Error) {
		return {}
	} else {
		return result
	}
}

export async function noteQuery(
	data: schema.noteQuery_reqT,
): Result<schema.noteQuery_resT> {
	const result = await util.unwrap<
		schema.noteQuery_reqT,
		schema.noteQuery_resT
	>('/api/v2/note-query', data)
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
): Result<schema.noteList_resT> {
	const result = await util.unwrap<schema.noteList_reqT, schema.noteList_resT>(
		'/api/v2/note-list',
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

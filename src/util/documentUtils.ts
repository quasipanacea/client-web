import type * as schema from '../../common/schema'
import * as util from '@/util/util'

export async function listDocuments() {
	const [success, data] = await util.extractResponse<
		schema.documentListResType,
		schema.documentListReqType
	>('/api/document/list', {
		type: 'type-regular',
	})
	if (!success) return console.error(data)

	return data
}

export async function createNewDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentCreateResType,
		schema.documentCreateReqType
	>('/api/document/create', { type: 'type-regular', name: documentId })
	if (!success) console.error(data)
}

export async function deleteDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentCreateResType,
		schema.documentCreateReqType
	>('/api/document/delete', { type: 'type-regular', name: documentId })
	if (!success) console.error(data)
}

import type * as schema from '@/schema'
import * as util from '@/util/util'

export async function createNewDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentCreateResType,
		schema.documentCreateReqType
	>('/api/document/create', { name: documentId })
	if (!success) console.error(data)
}

export async function deleteDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentCreateResType,
		schema.documentCreateReqType
	>('/api/document/delete', { name: documentId })
	if (!success) console.error(data)
}

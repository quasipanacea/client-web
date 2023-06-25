import type * as cytoscape from 'cytoscape'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Deno: any
}

declare module 'cytoscape' {
	interface CoreExport extends cytoscape.CoreExport {
		json(): cytoscape.CytoscapeOptions
	}

	interface ElementDataDefinition extends cytoscape.ElementDataDefinition {
		label?: string
	}

	interface SingularData extends cytoscape.SingularData {
		/**
		 * Get the entire data object.
		 */
		data(): cytoscape.ElementDataDefinition
		/**
		 * Get a particular data field for the element.
		 *
		 * @param name The name of the field to get.
		 */
		data(name: string)
		/**
		 * Set a particular data field for the element.
		 *
		 * @param name The name of the field to set.
		 * @param value The value to set for the field.
		 */
		data(name: string, value: unknown)
		/**
		 * Update multiple data fields at once via an object.
		 *
		 * @param obj The object containing name-value pairs to update data fields.
		 */
		data(obj: Record<string, unknown>)

		/**
		 * Removes all mutable data fields for the elements.
		 */
		removeData()
		/**
		 * Removes the specified mutable data fields for the elements.
		 *
		 * @param names A space-separated list of fields to delete.
		 */
		removeData(names: string)

		json(): cytoscape.ElementDefinition
	}
}

export {}

export const bodyhabitFormComponents = {
	formId: 'bodyhabit',
	title: 'Bodyhabit',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bodyhabit title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bodyhabit description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

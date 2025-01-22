export const bodystressFormComponents = {
	formId: 'bodystress',
	title: 'Bodystress',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bodystress title',
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
					value: 'fill bodystress description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

export const bodyfoodFormComponents = {
	formId: 'bodyfood',
	title: 'Bodyfood',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bodyfood title',
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
					value: 'fill bodyfood description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

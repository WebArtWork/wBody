export const bodymoodFormComponents = {
	formId: 'bodymood',
	title: 'Bodymood',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bodymood title',
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
					value: 'fill bodymood description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

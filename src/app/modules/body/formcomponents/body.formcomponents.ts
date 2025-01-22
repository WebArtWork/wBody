export const bodyFormComponents = {
	formId: 'body',
	title: 'Body',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill body title',
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
					value: 'fill body description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

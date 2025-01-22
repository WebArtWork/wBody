export const bodytargetFormComponents = {
	formId: 'bodytarget',
	title: 'Bodytarget',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill bodytarget title',
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
					value: 'fill bodytarget description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}

import React, { useState } from 'react';
import ReactQuill from 'react-quill';

const modules = {
	toolbar: [
		[{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' },
		{ 'indent': '-1' }, { 'indent': '+1' }],
		['link', 'image', 'video'],
		['clean']
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	}
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
	'header', 'font', 'size',
	'bold', 'italic', 'underline', 'strike', 'blockquote',
	'list', 'bullet', 'indent',
	'link', 'image', 'video'
]

const progressTypes = {
	0: 'instructions', 1: 'resources', 2: 'submission', 3: 'done'
}

const CreateInstructions = ({ dispatch, step }) => {
	const [value, setValue] = useState('');

	const onChange = (content, delta, source, editor) => {
		const html = editor.getHTML()
		setValue(html)
		dispatch({
			type: progressTypes[step],
			payload: { field: progressTypes[step], value: html },
		})
	}

	console.log(value)

	return (
		<ReactQuill
			theme={'snow'}
			modules={modules}
			formats={formats}
			onChange={onChange}
			bounds={'.app'}
			placeholder={"Hello there..."}
		/>
	)
}

export default CreateInstructions;
import React, { useState } from 'react'

function Create() {
	const [description, setDescription] = useState('')
	const [file, setFile] = useState(null)
	console.log(file)
	const baseURI = 'http://localhost:1337'
	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('data', JSON.stringify({ description }))
		formData.append('files.image', file)
		const response = await fetch(`${baseURI}/posts`, {
			method: 'POST',

			body: formData
		})
		const data = await response.json()
		console.log('data', data)
	}
	return (
		<div className="Create">
			<h2>Create</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
				<input type="file" placeholder="Add file" onChange={(e) => setFile(e.target.files[0])} />
				<button>Submit</button>
			</form>
		</div>
	)
}

export default Create

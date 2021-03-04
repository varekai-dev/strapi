import React, { useState } from 'react'

function Create() {
	const [description, setDescription] = useState('')
	const [file, setFile] = useState(null)
	const [error, setError] = useState('')
	console.log(file)
	const baseURI = 'http://localhost:1337'
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!description) {
			setError('Please add description')
			return
		}
		if (!file) {
			setError('Please add file')
			return
		}

		const formData = new FormData()
		formData.append('data', JSON.stringify({ description }))
		formData.append('files.image', file)
		try {
			await fetch(`${baseURI}/posts`, {
				method: 'POST',

				body: formData
			})
			// const data = await response.json()
		} catch (err) {
			setError(err)
		}
	}
	return (
		<div className="Create">
			<h2>Create</h2>

			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Description"
					onChange={(e) => {
						setError('')
						setDescription(e.target.value)
					}}
					value={description}
				/>
				<input
					type="file"
					placeholder="Add file"
					onChange={(e) => {
						setError('')
						setFile(e.target.files[0])
					}}
				/>
				<button>Submit</button>
			</form>
		</div>
	)
}

export default Create

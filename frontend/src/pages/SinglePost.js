import React, { useState, useEffect, useContext } from 'react'
import Post from '../components/Post'

import { UserContext } from '../context/UserContext'

function SinglePost({ match, history }) {
	const { user } = useContext(UserContext)
	const { id } = match.params
	const [post, setPost] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [edit, setEdit] = useState(false)
	//used for edit form
	const [description, setDescription] = useState('')

	const fetchPost = async () => {
		try {
			const response = await fetch(`http://localhost:1337/posts/${id}`)
			const data = await response.json()
			setPost(data)
			setLoading(false)
			setDescription(data.description)
		} catch (e) {
			setLoading(false)
			setError(e)
		}
	}
	const handleEditSubmit = async (e) => {
		e.preventDefault()

		await fetch(`http://localhost:1337/posts/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.jwt}`
			},
			body: JSON.stringify({
				description
			})
		})
		fetchPost()
	}

	const handleDelete = async () => {
		await fetch(`http://localhost:1337/posts/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.jwt}`
			}
		})
		history.push('/')
	}
	useEffect(() => {
		fetchPost()
	}, []) //eslint-disable-line
	return (
		<div className="Single__Post">
			{!error ? (
				<>
					{loading && <p>Loading...</p>}
					{!loading && (
						<>
							{post.id && (
								<>
									<Post description={post.description} url={post.image && post.image.url} likes={post.likes} />
									{user && (
										<>
											<button onClick={handleDelete}>Delete this Post</button>
											<button onClick={() => setEdit(!edit)}>{!edit ? 'Edit' : 'Cancel'}</button>
										</>
									)}
									{edit && (
										<form onSubmit={handleEditSubmit}>
											<input
												type="text"
												value={description}
												onChange={(e) => {
													setDescription(e.target.value)
												}}
												placeholder="new description"
											/>
											<button>Confirm</button>
										</form>
									)}
								</>
							)}
							{!post.id && <p>404 - not found</p>}
						</>
					)}
				</>
			) : (
				<p>{error.message}</p>
			)}
		</div>
	)
}

export default SinglePost

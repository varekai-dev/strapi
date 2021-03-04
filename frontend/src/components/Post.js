import React from 'react'

function Post({ likes, description, url }) {
	const baseURI = 'http://localhost:1337'
	return (
		<div className="Post">
			<img className="Post__Image" src={`${baseURI}${url}`} alt="photomo" />
			<h4>{description}</h4>
			<div>
				<span>Likes: {likes}</span>
			</div>
		</div>
	)
}

export default Post

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PostDetails.css'

function PostDetail() {
    const [blogdetail, setBlogDetail] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://dummyapi.online/api/blogposts/${id}`)
            .then(res =>
                setBlogDetail(res.data)
            )
            .catch(err => console.log(err))
    }, []);
    return (
        <>
            <div className="blog-container1">
                <Link to="/" className="back-button">Back</Link>
            </div>
            {/* <div className="blog-post1"> */}
            <h3>{blogdetail.title}</h3>
            <p className='blog-detail'>{blogdetail.content}</p> {/* Show a short preview */}
            <h2 className='blog-detail' style={{ color: 'black' }}>{blogdetail.author}</h2>
            {/* </div> */}

        </>
    )
}

export default PostDetail
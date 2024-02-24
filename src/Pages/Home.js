import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [postsPerPage] = useState(8);
    const [records, setRecords] = useState([]);

    const observer = useRef();
    const [loadingForScroll, setLoadingForScroll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://dummyapi.online/api/blogposts?_page=${currentPage}`);
                setBlogPosts(prevPosts => [...prevPosts, ...response.data]);
                setRecords(prevRecords => [...prevRecords, ...response.data]);
                setHasMore(response.data.length > 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [currentPage]);

    useEffect(() => {
        if (!hasMore) return;

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setLoadingForScroll(true);
                setTimeout(() => {
                    setCurrentPage(prevPage => prevPage + 1);
                    setLoadingForScroll(false);
                }, 2000); // Adjust loading time as needed
            }
        });

        if (blogPosts.length > 0) {
            observer.current.observe(document.querySelector('.blog-post:last-child'));
        }
    }, [blogPosts, hasMore]);

    const getInputData = (e) => {
        const inputValue = e.target.value;
        setBlogPosts(records.filter(post => post.title.toLowerCase().includes(inputValue.toLowerCase())));
    }

    return (
        <>
            <h2 className='blog-name'>Blog Post</h2>
            <div className="navbar navbar-expand-lg bg-body-tertiary container-fluid searchbar">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={getInputData} />
                    <button className="btn btn-outline-success">Search</button>
                </form>
            </div>
            <div className="blog-container">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-post">
                        <h2>{post.title}</h2>
                        <p>{post.content.substring(0, 100)}...</p>
                        <Link to={`/read/${post.id}`} className="details-link">View Details</Link>
                    </div>
                ))}
            </div>
            {loadingForScroll && (
                <div className="loading-container">
                    <div className="loading-text">Loading...</div>
                </div>
            )}
            {!loading && !loadingForScroll && !hasMore && <div>No more blog posts</div>}
        </>
    );
}

export default Home;

import { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";


export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();


  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setPostInfo(postInfo);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  async function deletePost() {
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo && userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit this post
          </Link>
          <Link className="delete-btn" onClick={deletePost}>
            Delete this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html: postInfo.content}} />
    </div>
  );
}

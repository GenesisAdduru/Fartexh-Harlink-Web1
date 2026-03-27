import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/communityforum-post.css';

const STORAGE_KEY = 'hairlinkForumPosts';

const defaultPosts = [
  {
    id: 1,
    author: 'Cristine T.',
    authorInitial: 'C',
    role: 'Donor',
    category: 'stories',
    title: 'Just donated 14 inches of hair! 💇‍♀️',
    content:
      "After growing my hair for 3 years, I finally made the cut today! It feels amazing to know that my hair will be turned into a wig for someone in need. If you're thinking about donating, I highly encourage it. The process was so easy and the feeling is incredible.",
    comments: [
      {
        id: 101,
        name: 'Sam',
        text: 'This is so inspiring. Thank you for sharing your journey!',
        image: null,
        createdAt: new Date().toISOString(),
      },
    ],
    likes: 6,
    votes: 14,
    createdAt: '2026-03-20T10:00:00.000Z',
    image: null,
  },
  {
    id: 2,
    author: 'Sam D.',
    authorInitial: 'S',
    role: 'Recipient',
    category: 'questions',
    title: 'How long does the wig request process usually take?',
    content:
      'I just submitted my request recently and wanted to ask how long the usual waiting time is before receiving an update. I would really appreciate hearing from anyone who has gone through the process.',
    comments: [],
    likes: 3,
    votes: 9,
    createdAt: '2026-03-19T15:30:00.000Z',
    image: null,
  },
  {
    id: 3,
    author: 'Owen P.',
    authorInitial: 'O',
    role: 'Staff',
    category: 'updates',
    title: 'Weekend donation drive schedule is now available',
    content:
      'Our weekend donation drive is now open for registrations. Please check the official announcement page for the updated venue schedule and accepted donation guidelines.',
    comments: [],
    likes: 2,
    votes: 7,
    createdAt: '2026-03-18T09:15:00.000Z',
    image: null,
  },
];

const formatCategory = (category) => {
  if (category === 'stories') return 'Stories';
  if (category === 'questions') return 'Questions';
  if (category === 'updates') return 'Updates';
  return 'All';
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

export default function CommunityForumPost() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [posts, setPosts] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentImage, setCommentImage] = useState(null);
  const [fileName, setFileName] = useState('No file selected');
  const [hasPost, setHasPost] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPosts(JSON.parse(saved));
      setHasPost(true);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
      setHasPost(true);
    }
  }, []);

  const post = useMemo(() => {
    const id = Number(postId);
    return posts.find((p) => p.id === id);
  }, [posts, postId]);

  const savePosts = (nextPosts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
    setPosts(nextPosts);
  };

  const updateVote = (value) => {
    if (!post) return;
    const next = posts.map((p) => (p.id === post.id ? { ...p, votes: p.votes + value } : p));
    savePosts(next);
  };

  const updateLike = () => {
    if (!post) return;
    const next = posts.map((p) => (p.id === post.id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    savePosts(next);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !post) return;

    const imageData = commentImage ? URL.createObjectURL(commentImage) : null;

    const updated = posts.map((p) => {
      if (p.id !== post.id) return p;
      return {
        ...p,
        comments: [
          ...(p.comments || []),
          { id: Date.now(), name: commentName.trim(), text: commentText.trim(), image: imageData, createdAt: new Date().toISOString() },
        ],
      };
    });

    savePosts(updated);
    setCommentName('');
    setCommentText('');
    setCommentImage(null);
    setFileName('No file selected');
  };

  if (!hasPost) {
    return <div className="post-page">Loading...</div>;
  }

  if (!post) {
    return (
      <main className="post-page">
        <Link to="/communityforum-dashboard" className="back-btn">
          <i className="fa-solid fa-chevron-left" />
          Back to Forum
        </Link>
        <div className="empty-comments">Post not found.</div>
      </main>
    );
  }

  return (
    <main className="post-page">
      <Link to="/communityforum-dashboard" className="back-btn">
        <i className="fa-solid fa-chevron-left" />
        Back to Forum
      </Link>

      <section className="forum-hero">
        <div className="forum-hero-content">
          <h1>Hairlink community</h1>
          <p>Join the conversation, show support, and share your thoughts with the community.</p>
        </div>
      </section>

      <section className="post-detail-wrapper" id="postDetailWrapper">
        <article className="post-detail-card">
          <div className="vote-column">
            <button className="vote-btn" type="button" onClick={() => updateVote(1)}>
              <i className="fa-solid fa-chevron-up" />
            </button>
            <span className="vote-count">{post.votes}</span>
            <button className="vote-btn" type="button" onClick={() => updateVote(-1)}>
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>

          <div className="post-content">
            <div className="post-top">
              <div className="avatar">{post.authorInitial}</div>
              <div className="post-meta">
                <div className="name-row">
                  <h3>{post.author}</h3>
                  <span className="role-badge">
                    <i className="fa-regular fa-id-card" />
                    {post.role}
                  </span>
                  <span className="category-badge">{formatCategory(post.category)}</span>
                </div>
                <div className="post-title">{post.title}</div>
              </div>
            </div>

            {post.image && <img src={post.image} alt="Post" className="post-image" />}

            <p className="post-body">{post.content}</p>

            <div className="post-footer">
              <div className="post-stats">
                <button type="button" className={`like-btn ${post.likes > 0 ? 'active' : ''}`} onClick={updateLike}>
                  <i className="fa-regular fa-heart" />
                  Like ({post.likes || 0})
                </button>
                <span className="meta-text">
                  <i className="fa-regular fa-comment" />
                  {(post.comments || []).length} comments
                </span>
              </div>
              <span className="meta-text">
                <i className="fa-regular fa-clock" />
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="comment-form-card">
        <h2>Join the conversation</h2>
        <form id="commentForm" onSubmit={submitComment}>
          <div className="form-group">
            <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} id="commentName" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} id="commentText" placeholder="Write your comment here..." required />
          </div>
          <div className="comment-actions">
            <div className="upload-side">
              <input type="file" id="commentPhoto" hidden accept="image/*" onChange={(e) => { if (e.target.files.length > 0) { setCommentImage(e.target.files[0]); setFileName(e.target.files[0].name); } else { setCommentImage(null); setFileName('No file selected'); } }} />
              <button type="button" className="photo-btn" id="photoBtn" onClick={() => document.getElementById('commentPhoto').click()}>
                <i className="fa-regular fa-image" />
                Add Photo
              </button>
              <span className="file-name" id="fileName">{fileName}</span>
            </div>
            <button type="submit" className="publish-btn">
              <i className="fa-regular fa-paper-plane" />
              Post Comment
            </button>
          </div>
        </form>
      </section>

      <section className="comments-section">
        <h2>Comments</h2>
        <div className="comments-wrapper" id="commentsWrapper">
          {(!post.comments || post.comments.length === 0) && (
            <div className="empty-comments">No comments yet. Be the first one to say something.</div>
          )}
          {post.comments && [...post.comments].reverse().map((comment) => (
            <article key={comment.id} className="comment-card">
              <div className="comment-top">
                <div className="comment-avatar">{comment.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="comment-name">{comment.name}</div>
                  <div className="comment-date">{formatDate(comment.createdAt)}</div>
                </div>
              </div>
              <div className="comment-body">{comment.text}</div>
              {comment.image && <img src={comment.image} alt="Comment" className="comment-image" />}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/communityforum-dashboard.css';

const STORAGE_KEY = 'hairlinkForumPosts';

const starterPosts = [
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

export default function CommunityForum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('new');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ category: 'stories', title: '', content: '', image: null });
  const [fileName, setFileName] = useState('No file selected');

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      setPosts(JSON.parse(existing));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(starterPosts));
      setPosts(starterPosts);
    }
  }, []);

  const deskPosts = useMemo(() => {
    let filtered = [...posts];
    if (category !== 'all') filtered = filtered.filter((post) => post.category === category);
    if (sort === 'new') filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else filtered.sort((a, b) => b.votes - a.votes);
    return filtered;
  }, [posts, category, sort]);

  const savePosts = (nextPosts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
    setPosts(nextPosts);
  };

  const handleVote = (id, delta) => {
    const next = posts.map((post) => (post.id === id ? { ...post, votes: post.votes + delta } : post));
    savePosts(next);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const item = {
      id: Date.now(),
      author: 'You',
      authorInitial: 'Y',
      role: 'Member',
      category: newPost.category,
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      comments: [],
      likes: 0,
      votes: 1,
      createdAt: new Date().toISOString(),
      image: newPost.image,
    };

    const next = [item, ...posts];
    savePosts(next);
    setNewPost({ category: 'stories', title: '', content: '', image: null });
    setFileName('No file selected');
    setIsModalOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return setFileName('No file selected');

    setFileName(file.name);
    const imageUrl = URL.createObjectURL(file);
    setNewPost((prev) => ({ ...prev, image: imageUrl }));
  };

  return (
    <main className="forum-page">
      <Link to="/donor-dashboard" className="back-btn">
        <i className="fa-solid fa-chevron-left" />
        Back to Dashboard
      </Link>

      <section className="forum-hero">
        <div className="forum-hero-content">
          <h1>Hairlink community</h1>
          <p>Share your journey, celebrate others, ask questions, and find support from people who truly understand.</p>
          <button className="create-post-btn" id="openPostModal" type="button" onClick={() => setIsModalOpen(true)}>
            <i className="fa-solid fa-plus" />
            Create Post
          </button>
        </div>
      </section>

      <section className="forum-controls">
        <div className="tabs-group">
          {['all', 'stories', 'questions', 'updates'].map((c) => (
            <button key={c} type="button" className={`tab-btn ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
              {formatCategory(c)}
            </button>
          ))}
        </div>

        <div className="sort-group">
          {['new', 'top'].map((s) => (
            <button key={s} type="button" className={`sort-btn ${sort === s ? 'active' : ''}`} onClick={() => setSort(s)}>
              {s === 'new' ? 'New' : 'Top'}
            </button>
          ))}
        </div>
      </section>

      <section className="posts-wrapper" id="postsWrapper">
        {deskPosts.length === 0 ? (
          <div className="empty-state">
            <p>No posts available in this category yet.</p>
          </div>
        ) : (
          deskPosts.map((post) => (
            <article key={post.id} className="post-card" onClick={() => navigate(`/community/${post.id}`)}>
              <div className="vote-column">
                <button className="vote-btn" type="button" onClick={(e) => { e.stopPropagation(); handleVote(post.id, 1); }}>
                  <i className="fa-solid fa-chevron-up" />
                </button>
                <span className="vote-count">{post.votes}</span>
                <button className="vote-btn" type="button" onClick={(e) => { e.stopPropagation(); handleVote(post.id, -1); }}>
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
                    <h4>{post.title}</h4>
                  </div>
                </div>
                {post.image && <img src={post.image} alt="Post" className="post-image" />}
                <p className="post-body">{post.content}</p>
                <div className="post-footer">
                  <span className="comment-count">
                    <i className="fa-regular fa-comment" /> {post.comments.length} comments
                  </span>
                  <span className="post-time">
                    <i className="fa-regular fa-clock" /> {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`} id="postModal" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
        <div className="modal-box">
          <div className="modal-header">
            <h2>Create a Post</h2>
            <button className="close-modal" id="closePostModal" type="button" onClick={() => setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <form id="createPostForm" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <div className="select-wrap">
                <select id="postCategory" value={newPost.category} onChange={(e) => setNewPost((p) => ({ ...p, category: e.target.value }))} required>
                  <option value="stories">Stories</option>
                  <option value="questions">Questions</option>
                  <option value="updates">Updates</option>
                </select>
                <i className="fa-solid fa-chevron-down" />
              </div>
            </div>
            <div className="form-group">
              <input type="text" id="postTitle" placeholder="Post Title.." value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} required />
            </div>
            <div className="form-group">
              <textarea id="postContent" placeholder="Share your thoughts with this community..." value={newPost.content} onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))} required />
            </div>
            <div className="modal-actions">
              <div className="upload-side">
                <input type="file" id="postPhoto" hidden accept="image/*" onChange={handleImageChange} />
                <button type="button" className="photo-btn" id="photoBtn" onClick={() => document.getElementById('postPhoto').click()}>
                  <i className="fa-regular fa-image" />
                  Add Photo
                </button>
                <span className="file-name" id="fileName">{fileName}</span>
              </div>
              <button type="submit" className="publish-btn">
                <i className="fa-regular fa-paper-plane" />
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

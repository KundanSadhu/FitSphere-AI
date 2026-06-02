import { useState, KeyboardEvent } from 'react';
import { Post } from '../types';
import { Heart, MessageSquare, Send, ShieldCheck, Share2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onComment: (id: string, author: string, content: string) => void;
  key?: any;
}

export const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const submitComment = () => {
    const text = commentInput.trim();
    if (!text) return;
    onComment(post.id, 'Kundan Saduyashwanth', text);
    setCommentInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitComment();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-soft-sm p-5 space-y-4">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.authorPhoto || 'https://picsum.photos/seed/profile/100/100'}
            alt={post.authorName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-xl object-cover shrink-0 border shadow-sm"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-slate-900 tracking-tight text-sm leading-tight">
                {post.authorName}
              </span>
              {post.authorName.includes('Coach') && (
                <span className="text-[8px] bg-indigo-600 text-white font-mono font-bold px-1 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5 fill-slate-50" /> STAFF
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase mt-0.5">
              {post.timeAgo}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm font-semibold text-slate-700 leading-relaxed">
        {post.content}
      </p>

      {/* Optional attached image */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden border border-slate-50">
          <img
            src={post.image}
            alt="Feed attachment"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover max-h-[300px]"
          />
        </div>
      )}

      {/* Action buttons triggers */}
      <div className="flex items-center gap-6 pt-3 border-t border-slate-50 text-slate-600 font-bold text-xs select-none">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
            post.liked ? 'text-rose-500' : 'hover:text-slate-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${post.liked ? 'fill-rose-500 stroke-rose-400' : ''}`} />
          <span>{post.likes} Likes</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1.5 cursor-pointer transition-colors hover:text-slate-800 ${
            showComments ? 'text-indigo-600' : ''
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments.length} Comments</span>
        </button>

        <button
          className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 ml-auto"
          onClick={() => alert('Social sharing index simulated successfully!')}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Expandable comments drawer block */}
      {showComments && (
        <div className="border-t border-slate-100 pt-4 space-y-4">
          <div className="space-y-3.5 pl-1">
            {post.comments.map((c, i) => (
              <div key={i} className="flex gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-lg bg-slate-100/80 text-slate-500 font-bold font-mono uppercase text-[9px] flex items-center justify-center shrink-0">
                  {c.authorName.slice(0, 2)}
                </div>
                <div className="flex-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100/50">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-extrabold text-slate-900">{c.authorName}</span>
                    <span className="text-[8px] font-bold text-slate-400 font-mono tracking-wider">{c.timeAgo}</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-normal">{c.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comment text box input */}
          <div className="flex gap-2 items-center bg-slate-50 border p-1 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/15 focus-within:bg-white transition-all">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a supportive comment..."
              className="flex-1 bg-transparent px-3 py-1.5 text-xs outline-none text-slate-900 font-medium placeholder:text-slate-400"
            />
            <button
              onClick={submitComment}
              disabled={!commentInput.trim()}
              className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-600 disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

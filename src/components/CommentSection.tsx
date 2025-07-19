
import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
  isAnswer?: boolean;
}

interface CommentSectionProps {
  lessonId: string;
}

export function CommentSection({ lessonId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'Great explanation of ownership! I was struggling with this concept but your examples made it crystal clear. The analogy with physical objects really helped.',
      timestamp: '2 hours ago',
      upvotes: 8,
      downvotes: 0,
      replies: [
        {
          id: '2',
          author: 'Mike Johnson',
          content: 'I agree! The code examples are very practical. Looking forward to the next lesson on borrowing.',
          timestamp: '1 hour ago',
          upvotes: 3,
          downvotes: 0,
          replies: []
        }
      ]
    },
    {
      id: '3',
      author: 'Alex Rodriguez',
      content: 'Quick question about the move semantics example. What happens if we try to use a moved value in a different scope? Does the compiler catch this at compile time?',
      timestamp: '4 hours ago',
      upvotes: 5,
      downvotes: 0,
      replies: [
        {
          id: '4',
          author: 'CodeMaster Pro',
          content: 'Excellent question! Yes, the Rust compiler will catch this at compile time and throw an error. This is one of Rust\'s key safety features - it prevents use-after-move errors that could cause undefined behavior in other languages.',
          timestamp: '3 hours ago',
          upvotes: 12,
          downvotes: 0,
          replies: [],
          isAnswer: true
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [votedComments, setVotedComments] = useState<Set<string>>(new Set());

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: []
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: replyContent,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: []
    };
    
    const updateComments = (commentList: Comment[]): Comment[] => {
      return commentList.map(comment => {
        if (comment.id === parentId) {
          return { ...comment, replies: [reply, ...comment.replies] };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateComments(comment.replies) };
        }
        return comment;
      });
    };
    
    setComments(updateComments(comments));
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleVote = (commentId: string, type: 'up' | 'down') => {
    if (votedComments.has(commentId)) return;
    
    setVotedComments(prev => new Set(prev).add(commentId));
    
    const updateVotes = (commentList: Comment[]): Comment[] => {
      return commentList.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upvotes: type === 'up' ? comment.upvotes + 1 : comment.upvotes,
            downvotes: type === 'down' ? comment.downvotes + 1 : comment.downvotes
          };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateVotes(comment.replies) };
        }
        return comment;
      });
    };
    
    setComments(updateVotes(comments));
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <Card key={comment.id} className={`${depth > 0 ? 'ml-8 mt-4' : 'mb-6'} animate-fade-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {comment.author}
                </span>
                {comment.isAnswer && (
                  <Badge variant="default" className="text-xs">
                    ✓ Answer
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {comment.timestamp}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {comment.content}
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(comment.id, 'up')}
              disabled={votedComments.has(comment.id)}
              className="h-8 px-2 text-gray-500 hover:text-green-600"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{comment.upvotes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(comment.id, 'down')}
              disabled={votedComments.has(comment.id)}
              className="h-8 px-2 text-gray-500 hover:text-red-600"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              <span>{comment.downvotes}</span>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="h-8 px-2 text-gray-500 hover:text-blue-600"
          >
            <Reply className="w-4 h-4 mr-1" />
            Reply
          </Button>
        </div>
        
        {replyingTo === comment.id && (
          <div className="mt-4 animate-fade-in">
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim()}
              >
                <Send className="w-4 h-4 mr-1" />
                Reply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        {comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* New Comment Form */}
      <Card>
        <CardContent className="pt-6">
          <Textarea
            placeholder="Ask a question or share your thoughts about this lesson..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4"
            rows={4}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Be respectful and constructive in your comments
            </p>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Comments List */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h4>
        
        {comments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div>
            {comments.map(comment => renderComment(comment))}
          </div>
        )}
      </div>
    </div>
  );
}

import styles from './Comments.module.scss';
import { useEffect, useState } from 'react';
import Input from '../UI/Input';
import CommentItem from './CommentItem';
import { Comment } from '../../types/types';
import { addCommentToDeal } from '../../features/deals/dealSlice';
import { useAppDispatch } from '../../store/hooks';

interface CommentDealProps {
  comments: Comment[];
  dealId: number;
}

const CommentsDeal: React.FC<CommentDealProps> = (props) => {
  const [comment, setComment] = useState<string>('');
  const [sortComments, setSortComments] = useState<Comment[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sortedComments = [...props.comments].sort((a, b) => b.id - a.id);
    setSortComments(sortedComments);
  }, [props.comments]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && comment.trim()) {
      await dispatch(
        addCommentToDeal({ dealId: props.dealId, content: comment })
      );
      setComment(''); // Очищаем поле после отправки
    }
  };
  return (
    <div className={styles.containerCommentDeal}>
      <div className={styles.containerCommentInput}>
        <Input
          id="comment"
          className={styles.commentInput}
          placeholder="Введите комментарий"
          label="Комментарий"
          value={comment}
          onChange={handleCommentChange}
          onKeyDown={handleKeyDown}
          type="text"
          controlled={true}
        />
      </div>
      <div className={styles.containerCommentItem}>
        {sortComments.map((c: Comment) => (
          <CommentItem key={c.id} id={c.id} comment={c.content} />
        ))}
      </div>
    </div>
  );
};

export default CommentsDeal;

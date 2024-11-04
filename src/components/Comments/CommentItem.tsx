import styles from './Comments.module.scss';

interface CommentItemProps {
  id: number;
  comment: string;
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  return (
    <div className={styles.commentItem}>
      <p className={styles.commentText}>{props.comment}</p>
    </div>
  );
};

export default CommentItem;

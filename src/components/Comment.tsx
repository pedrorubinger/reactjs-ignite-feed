import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";

import { Avatar } from "./Avatar";

import styles from "./Comment.module.css";

interface Props {
  content: string;
  deleteComment: (comment: string) => void;
}

export function Comment({ content, deleteComment }: Props) {
  const [likeCount, setLikeCount] = useState(0);

  const onDeleteComment = () => {
    deleteComment(content);
  };

  const onLikeComment = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/pedrorubinger.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Pedro Rubinger</strong>
              <time
                title="21 de Janeiro às 16:41"
                dateTime="2023-01-21 16:41:44"
              >
                Há cerca de 1h
              </time>
            </div>

            <button title="Excluir comentário" onClick={onDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={onLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

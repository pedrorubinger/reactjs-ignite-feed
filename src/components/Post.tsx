import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
  href: string;
}

interface Props {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: Props) {
  const [comments, setComments] = useState(["Post muito bacana!!!"]);
  const [commentText, setCommentText] = useState("");

  const formatedDateTitle = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setComments([...comments, commentText]);
    setCommentText("");
  };

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity("");
    setCommentText(event.target.value);
  };

  const onSubmitInvalidComment = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity("Este campo é obrigatório!");
  };

  const deleteComment = (comment: string) => {
    setComments([...comments].filter((c) => c !== comment));
  };

  const isCommentEmpty = !commentText.length;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong className={styles.author}>{author.name}</strong>
            <span className={styles.position}>{author.role}</span>
          </div>
        </div>

        <time title={formatedDateTitle} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item, i) => {
          if (item.type === "paragraph") {
            return <p key={item.content}>{item.content}</p>;
          }

          if (item.type === "link") {
            return (
              <p key={item.content}>
                <a href={item.href}>{item.content}</a>
              </p>
            );
          }

          return null;
        })}
      </div>

      <form onSubmit={onSubmit} className={styles.commentForm}>
        <strong>Deixe seu comentário!</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={commentText}
          onChange={onChangeComment}
          onInvalid={onSubmitInvalidComment}
          required
        />

        <footer>
          <button type="submit" disabled={isCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}

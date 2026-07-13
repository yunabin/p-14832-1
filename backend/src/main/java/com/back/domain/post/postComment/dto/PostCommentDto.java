package com.back.domain.post.postComment.dto;

import com.back.domain.post.postComment.entity.PostComment;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

public record PostCommentDto (
        @NonNull long id,
        @NonNull LocalDateTime createDate,
        @NonNull LocalDateTime modifyDate,
        @NonNull String authorName,
        @NonNull String content
) {
    public PostCommentDto(PostComment postComment) {
        this(
                postComment.getId(),
                postComment.getCreateDate(),
                postComment.getModifyDate(),
                postComment.getAuthor().getNickname(),
                postComment.getContent()
        );
    }
}

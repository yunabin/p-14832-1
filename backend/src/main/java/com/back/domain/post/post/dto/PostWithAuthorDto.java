package com.back.domain.post.post.dto;

import com.back.domain.post.post.entity.Post;

import java.time.LocalDateTime;

public record PostWithAuthorDto(
        long id,
        LocalDateTime createDate,
        LocalDateTime modifyDate,
        long authorId,
        String authorName,
        String title,
        String content
) {
    public PostWithAuthorDto(Post post) {
        this(
                post.getId(),
                post.getCreateDate(),
                post.getModifyDate(),
                post.getAuthor().getId(),
                post.getAuthor().getNickname(),
                post.getTitle(),
                post.getContent()
        );
    }
}

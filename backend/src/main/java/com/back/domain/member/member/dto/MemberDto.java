package com.back.domain.member.member.dto;

import com.back.domain.member.member.entity.Member;

import java.time.LocalDateTime;

public record MemberDto(
        long id,
        LocalDateTime createDate,
        LocalDateTime modifyDate,
        String nickname,
        boolean isAdmin,
        String profileImageUrl
) {
    public MemberDto(Member member) {
        this(
                member.getId(),
                member.getCreateDate(),
                member.getModifyDate(),
                member.getNickname(),
                member.isAdmin(),
                member.getProfileImgUrlDefault()
        );
    }
}

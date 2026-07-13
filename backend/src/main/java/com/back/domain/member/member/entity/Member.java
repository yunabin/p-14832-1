package com.back.domain.member.member.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@ToString
@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseEntity {
    @Column(unique = true)
    private String username;
    private String password;
    private String nickname;
    @Column(unique = true)
    private String apiKey;
    private String profileImgUrl;

    public Member (long id, String username, String nickname) {
        this.id = id;
        this.username = username;
        this.nickname = nickname;
    }

    public Member(String username, String password, String nickname, String profileImgUrl) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
        this.apiKey = UUID.randomUUID().toString();
    }

    public void modifyApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public boolean isAdmin() {
        if ("system".equals(username)) return true;
        if ("admin".equals(username)) return true;

        return false;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
         return getAuthoritiesStringList()
                 .stream()
                 .map(SimpleGrantedAuthority::new)
                 .toList();
    }

    public List<String> getAuthoritiesStringList() {
        List<String> authorities = new ArrayList<>();

        if (isAdmin()) {
            authorities.add("ROLE_ADMIN");
        }

        return authorities;
    }

    public void modify(String nickname, String profileImgUrl) {
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
    }

    public String getProfileImgUrlDefault() {
        if (profileImgUrl == null) {
            return "https://picsum.photos/id/237/600/600";
        }

        return profileImgUrl;
    }
}

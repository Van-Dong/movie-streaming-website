package com.dongnv.movie_website.mapper;

import com.dongnv.movie_website.dto.request.user.CreateCommentRequest;
import com.dongnv.movie_website.dto.response.CommentResponse;
import com.dongnv.movie_website.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment toComment(CreateCommentRequest request);

    CommentResponse toCommentResponse(Comment comment);
}

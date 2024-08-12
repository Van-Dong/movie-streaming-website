package com.dongnv.movie_website.service;

import com.dongnv.movie_website.dto.request.user.CreateCommentRequest;
import com.dongnv.movie_website.dto.request.user.UpdateCommentRequest;
import com.dongnv.movie_website.dto.response.CommentResponse;
import com.dongnv.movie_website.entity.Comment;
import com.dongnv.movie_website.entity.User;
import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.dongnv.movie_website.mapper.CommentMapper;
import com.dongnv.movie_website.repository.CommentRepository;
import com.dongnv.movie_website.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CommentService {
    CommentRepository commentRepository;
    CommentMapper commentMapper;
    UserRepository userRepository;

    public CommentResponse createComment(CreateCommentRequest request) {
        Comment comment = commentMapper.toComment(request);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        comment.setUser(user);
        comment = commentRepository.save(comment);

        CommentResponse commentResponse = commentMapper.toCommentResponse(comment);
        commentResponse.setUsername(username);
        return commentResponse;
    }

    public List<CommentResponse> getComment(String movieId, int page, int size) {
        List<Comment> comments = commentRepository.findAllByMovieId(movieId,
                PageRequest.of(page, size, Sort.by("createdAt").descending()));

        return comments.stream().map(c -> {
            var cr = commentMapper.toCommentResponse(c);
            cr.setUsername(c.getUser().getUsername());
            return cr;
        }).toList();
    }

    public CommentResponse updateComment(Long id, UpdateCommentRequest request) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.COMMENT_NOT_FOUND)
        );

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!username.equals(comment.getUser().getUsername()))
            throw new AppException(ErrorCode.UNAUTHORIZED);

        comment.setComment(request.getComment());
        commentRepository.save(comment);

        CommentResponse commentResponse = commentMapper.toCommentResponse(comment);
        commentResponse.setUsername(username);
        return commentResponse;
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.COMMENT_NOT_FOUND)
        );

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!username.equals(comment.getUser().getUsername()))
            throw new AppException(ErrorCode.UNAUTHORIZED);

        commentRepository.deleteById(id);
    }
}

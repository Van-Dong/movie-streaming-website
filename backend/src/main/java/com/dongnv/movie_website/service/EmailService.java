package com.dongnv.movie_website.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String username, String token) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

        try {
            helper.setTo(to);
            helper.setSubject("Moi nhap ma xac thuc sau vao trong movie website");
            String body = "<p>Ma xac nhan cua nguoi dung <b>" + username + "</b> la: </p>\n" + "<h2>" + token + "</h2>";
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MessagingException exception) {
            throw new AppException(ErrorCode.FAILED_SEND_EMAIL);
        }
    }

    public void sendNewPasswordEmail(String to, String username, String password) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

        try {
            helper.setTo(to);
            helper.setSubject("Mat khau moi tai movie website");
            String body =
                    "<p>Mat khau moi cho tai khoan <b>" + username + "</b> la: </p>" + "<h2>" + password + "</h2>";
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MessagingException exception) {
            throw new AppException(ErrorCode.FAILED_SEND_EMAIL);
        }
    }
}

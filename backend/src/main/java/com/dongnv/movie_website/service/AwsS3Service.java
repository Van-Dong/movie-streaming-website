package com.dongnv.movie_website.service;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dongnv.movie_website.exception.AppException;
import com.dongnv.movie_website.exception.ErrorCode;
import com.github.slugify.Slugify;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

@Service
public class AwsS3Service {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${aws.s3.folderName}")
    private String folderName;

    @Value("${aws.s3.publicFolder}")
    private String publicFolder;

    @Value("${aws.s3.cdnName}")
    private String cdnName;

    private final S3Client s3Client;
    private final Slugify slugify;
    private final S3Presigner presigner;

    public AwsS3Service(S3Client s3Client) {
        this.s3Client = s3Client;
        slugify = Slugify.builder()
                .customReplacement("Đ", "d")
                .customReplacement("đ", "d")
                .build();
        presigner = S3Presigner.builder()
                .credentialsProvider(s3Client.serviceClientConfiguration().credentialsProvider())
                .region(s3Client.serviceClientConfiguration().region())
                .build();
    }

    public List<String> getObjectsInBucket() {
        ListObjectsV2Request listObjectsV2Request =
                ListObjectsV2Request.builder().bucket(bucketName).build();

        try {
            ListObjectsV2Response listObjectsV2Response = s3Client.listObjectsV2(listObjectsV2Request);
            return listObjectsV2Response.contents().stream().map(S3Object::key).toList();
        } catch (S3Exception exception) {
            throw new AppException(ErrorCode.GET_LIST_OBJECTS_IN_S3_FAILED);
        }
    }

    public String uploadVideo(MultipartFile file, String title) {
        String fileName = file.getOriginalFilename();
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String contentType = file.getContentType();

        String key = slugify.slugify(title + "-" + UUID.randomUUID().toString().substring(0, 8)) + fileExtension;

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(folderName + "/" + key)
                .acl(ObjectCannedACL.PRIVATE)
                .contentType(contentType)
                .contentLength(file.getSize())
                .build();

        PutObjectResponse putObjectResponse;
        try (InputStream inputStream = file.getInputStream()) {
            putObjectResponse = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(inputStream.readAllBytes()));
        } catch (IOException e) {
            throw new AppException(ErrorCode.UPLOAD_FILE_FAILED);
        }

        return key;
    }

    public String uploadFilePublic(MultipartFile file, String title) {
        String fileName = file.getOriginalFilename();
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String contentType = file.getContentType();

        String key = publicFolder + "/"
                + slugify.slugify(title + "-" + UUID.randomUUID().toString().substring(0, 8)) + fileExtension;

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .contentLength(file.getSize())
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();

        PutObjectResponse putObjectResponse;
        try (InputStream inputStream = file.getInputStream()) {
            putObjectResponse = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(inputStream.readAllBytes()));
        } catch (IOException e) {
            throw new AppException(ErrorCode.UPLOAD_FILE_FAILED);
        }

        return cdnName + key;
    }

    public void deleteFile(String objectKey) {
        if (Objects.isNull(objectKey)) return;

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(folderName + "/" + objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    public void deleteMultiFile(List<String> objectKeys) {

        List<ObjectIdentifier> keys = objectKeys.stream()
                .map(key ->
                        ObjectIdentifier.builder().key(folderName + "/" + key).build())
                .toList();

        Delete delete = Delete.builder().objects(keys).build();

        DeleteObjectsRequest deleteObjectsRequest =
                DeleteObjectsRequest.builder().bucket(bucketName).delete(delete).build();

        s3Client.deleteObjects(deleteObjectsRequest);
    }

    public void deleteByUrl(String url) {
        if (Objects.isNull(url)) return;

        String key = url.substring(url.indexOf(publicFolder + "/"));
        DeleteObjectRequest deleteObjectRequest =
                DeleteObjectRequest.builder().bucket(bucketName).key(key).build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    public String getPreSignedUrl(String objectKey, long minuteDuration) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(folderName + "/" + objectKey)
                .build();

        GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                .getObjectRequest(getObjectRequest)
                .signatureDuration(Duration.ofMinutes(10))
                .build();

        PresignedGetObjectRequest presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);

        return presignedGetObjectRequest.url().toExternalForm();
    }
}

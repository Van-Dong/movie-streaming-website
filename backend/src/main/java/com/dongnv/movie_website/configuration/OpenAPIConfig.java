package com.dongnv.movie_website.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI openAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Movie website server");

        Contact contact = new Contact();
        contact.setEmail("dongnv4724@gmail.com");
        contact.setName("Dong Nguyen");
        contact.setUrl("https://nguyenvandong.id.vn");

        License license = new License();
        license.setName("Copyright © 2024 by DongNV4724");
        license.url("https://license....");

        Info info = new Info()
                .title("Movie website API")
                .version("1.0")
                .contact(contact)
                .description("Api generate by OpenApi SpringDoc")
                .license(license);

        return new OpenAPI().info(info).addServersItem(server);
    }
}

package com.example.backendSurfReport.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    private String firstname;
    private String lastname;
    private String email;
    private String password;

    private List<String> roles = new ArrayList<>();

    private List<String> favoriteSpots = new ArrayList<>();
}

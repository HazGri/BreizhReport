package com.example.backendSurfReport.Repository;

import com.example.backendSurfReport.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User,String> {
    User findByEmail(String email);
}


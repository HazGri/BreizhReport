package com.example.backendSurfReport.Repository;

import com.example.backendSurfReport.Model.Spot;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SpotRepo extends MongoRepository<Spot,String> {
}

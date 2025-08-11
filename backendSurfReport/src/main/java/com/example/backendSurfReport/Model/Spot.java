package com.example.backendSurfReport.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;


@Document(collection = "spots")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Spot {
    @Id
    private String id;
    private String name;
    private String description;

    private Location location;
    private List<String> orientation;
    private String difficulty;
    private List<String> tide;
    private List<String> optimalDirection;
    private List<String> wind;
    @Field("crowd_level")
    private String crowdLevel;
}

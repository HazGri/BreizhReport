package com.example.backendSurfReport.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Location {
    private String region;
    private String city;
    private GPS gps;
}

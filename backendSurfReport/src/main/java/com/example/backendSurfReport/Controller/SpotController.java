package com.example.backendSurfReport.Controller;

import com.example.backendSurfReport.Model.Spot;
import com.example.backendSurfReport.Repository.SpotRepo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://breizhreport.vercel.app"
})

public class SpotController {
    private final SpotRepo spotRepo;

    public SpotController(SpotRepo spotRepo) {
        this.spotRepo = spotRepo;
    }
    @GetMapping("/spots")
    public List<Spot> getSpots() {
        return spotRepo.findAll();
    }

}

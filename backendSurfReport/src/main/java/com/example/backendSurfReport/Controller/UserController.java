package com.example.backendSurfReport.Controller;

import com.example.backendSurfReport.Model.Spot;
import com.example.backendSurfReport.Model.User;
import com.example.backendSurfReport.Repository.SpotRepo;
import com.example.backendSurfReport.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepo;
    private final SpotRepo spotRepo;

    @GetMapping("/favorites")
    public ResponseEntity<?> getFavoriteSpots(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        User user = userRepo.findByEmail(userDetails.getUsername());
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        List<Spot> favoriteSpots = spotRepo.findAllById(user.getFavoriteSpots());

        return ResponseEntity.ok(favoriteSpots);
    }

    @PostMapping("/favorites/toggle/{spotId}")
    public ResponseEntity<?> toggleFavoriteSpot(@AuthenticationPrincipal UserDetails userDetails,
                                                @PathVariable String spotId) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        User user = userRepo.findByEmail(userDetails.getUsername());

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (!spotRepo.existsById(spotId)) {
            return ResponseEntity.status(404).body("Spot not found");
        }

        List<String> favorites = user.getFavoriteSpots();

        if (favorites.contains(spotId)) {
            favorites.remove(spotId);
        } else {
            favorites.add(spotId);
        }

        user.setFavoriteSpots(favorites);
        userRepo.save(user);

        List<Spot> updatedFavorites = spotRepo.findAllById(user.getFavoriteSpots());

        return ResponseEntity.ok(updatedFavorites);
    }
}

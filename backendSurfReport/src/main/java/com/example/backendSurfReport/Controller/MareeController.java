package com.example.backendSurfReport.Controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class MareeController {

    @GetMapping("/api/marees/{dep}")
    public Map<String, String> getMarees(@PathVariable String dep) throws IOException {
        String url = "https://maree.info/" + dep;
        Document doc = Jsoup.connect(url).get();

        Map<String, String> marees = new LinkedHashMap<>();

        for (int i = 0; i < 4; i++) {
            String id = "MareeJours_" + i;
            Element jour = doc.getElementById(id);
            if (jour != null) {
                marees.put(String.valueOf(i), jour.text());
            } else {
                marees.put(String.valueOf(i), "Introuvable");
            }
        }

        return marees;
    }
}

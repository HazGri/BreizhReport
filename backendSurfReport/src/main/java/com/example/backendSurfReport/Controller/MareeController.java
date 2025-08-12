package com.example.backendSurfReport.Controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://breizhreport.vercel.app"
})

@RestController
public class MareeController {

    @GetMapping("/api/marees/{dep}")
    public Map<String, String> getMarees(@PathVariable String dep) throws IOException {
        String url = "https://maree.info/" + dep;
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")
                .referrer("https://google.com")
                .header("Accept-Language", "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7")
                .timeout(10_000)
                .get();


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

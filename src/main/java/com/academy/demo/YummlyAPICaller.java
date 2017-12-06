package com.academy.demo;

import java.io.*;
import java.net.*;
import java.util.Scanner;

public class YummlyAPICaller{
    public static void main(String[] args) throws UnsupportedEncodingException {

        // http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters

        String url = "http://api.yummly.com/v1/api/recipes";
        String charset = "UTF-8";  // Or in Java 7 and later, use the constant: java.nio.charset.StandardCharsets.UTF_8.name()
        String param1 = "92951a32";
        String param2 = "d9bea4f85046c51b5bc24474077128d7";
        String query = String.format("_app_id=%s&_app_key=%s",
                URLEncoder.encode(param1, charset),
                URLEncoder.encode(param2, charset));

        URLConnection connection = null;

        try {
            connection = new URL(url + "?" + query).openConnection();
            connection.setRequestProperty("Accept-Charset", charset);
            InputStream response = connection.getInputStream();
            try (Scanner scanner = new Scanner(response)) {
                String responseBody = scanner.useDelimiter("\\A").next();
                System.out.println(responseBody);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
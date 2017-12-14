package com.academy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@SessionAttributes("favorites")
public class MainController {

    @Autowired
    Repository repository;
    User user;
    Recipe[] favorites;


    @GetMapping("/login")
    public ModelAndView logIn() {
        return new ModelAndView("login");
    }

    @PostMapping("/login")
    public String submitLogIn( HttpSession session, @RequestParam String username, @RequestParam String password, String email, String confirmPassword) {
        this.user = new User( username, password, email);
        boolean exists = repository.registration(username, password, email, confirmPassword);
        if (exists) {
            System.out.println("user already exists");
            return "login";
        }

        User user = repository.logIn(username, password);
        if (user != null) {
            System.out.println("email and password match");
            if (session.getAttribute("user") == null) {
                session.setAttribute("user", user);
                session.setAttribute("userid", user.getId());
                session.setAttribute("favorites", repository.getFavorites((int) session.getAttribute("userid")));
            }
            return "index";
        } else {
            System.out.println("Wrong email or password");
            return "nextpage";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session, HttpServletResponse res) {
        session.invalidate();
        Cookie cookie = new Cookie("jsessionid", "");
        cookie.setMaxAge(0);
        res.addCookie(cookie);
        return "login";
    }

    @PostMapping ("/index")
    public void addFavorite (HttpSession session, @RequestParam String newFavorite) {
        String[] favoriteData = newFavorite.split(",");
        int userID = (int) session.getAttribute("userid");
        String recipeName = favoriteData[0];
        String recipeURL = favoriteData[1];
        String pictureURL = favoriteData[2];
        repository.addFavorite(userID, recipeName, recipeURL, pictureURL);
    }
}

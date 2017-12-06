package com.academy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class MainController {

    @Autowired
    private Repository repository;
    User user;


    @PostMapping("/register")
    public String submit(HttpSession session, @RequestParam String email, @RequestParam String password, @RequestParam String username, @RequestParam String confirmPassword) {

        user = new User(username, password, email);
        boolean exists = repository.registration(username, password, email, confirmPassword);
        if (exists) {
            System.out.println("user already exist");
            return "register";
        }
        return "login";
    }

    @GetMapping("/register")
    public ModelAndView register() {
        return new ModelAndView("register");
    }

    @GetMapping("/login")
    public ModelAndView logIn() {
        return new ModelAndView("login");
    }

    @PostMapping("/login")
    public String submitLogIn(HttpSession session, @RequestParam String username, @RequestParam String password) {
        User user = repository.logIn(username, password);
        if (user != null) {
            System.out.println("email and password matches");
            if (session.getAttribute("user") == null) {
                session.setAttribute("user", user);
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
}

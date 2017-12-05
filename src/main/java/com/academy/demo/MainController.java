package com.academy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class MainController {

    @Autowired
    private Repository repository;

    public MainController() {
    }

    @GetMapping("/login")
    public ModelAndView login() {
        return new ModelAndView("login").addObject("user", new User());
    }

    @PostMapping("/loginSubmit")
    public ModelAndView loginSubmit(@ModelAttribute User user, HttpSession session) {
        
        if (!user.getUsername().isEmpty()) {
            session.setAttribute("username", user.getUsername());
            session.setAttribute("email", user.getEmail());
            return new ModelAndView("nextpage");
        } else {
            return new ModelAndView("login");
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

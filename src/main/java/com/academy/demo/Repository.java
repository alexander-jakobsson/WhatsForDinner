package com.academy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.*;
import javax.sql.DataSource;

@Component
public class Repository {

    @Autowired
    private DataSource dataSource;

    public User logIn(@RequestParam String username, @RequestParam String password) {
        Connection dbconn = null;

        try {
            Connection conn = dataSource.getConnection();
            boolean login;
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM UserFood WHERE username = ? AND password = ?");
            ps.setString(1, username);
            ps.setString(2, password);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    login = false;
                } else {
                    return getUser(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeDb(dbconn);
        }
        return null;
    }

    private User getUser(ResultSet rs) throws SQLException {
        return new User(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("email"));
    }

    public boolean registration(String username, String password, String email, String confirmPassword) {
        Connection dbconn = null;

        if (password.equals(confirmPassword)) {

            try {
                Connection conn = dataSource.getConnection();
                boolean exists = true;
                PreparedStatement ps = conn.prepareStatement("SELECT username FROM UserFood WHERE username = ?");
                ps.setString(1, username);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) exists = false;
                    else return true;
                }
                if (!exists) {
                    ps = conn.prepareStatement("INSERT INTO UserFood (username, password, email) VALUES (?,?,?)");
                    ps.setString(1, username);
                    ps.setString(2, password);
                    ps.setString(3, email);
                    ps.executeUpdate();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                closeDb(dbconn);
            }
        } else {
            System.out.println("Passwords don't match");
        }
        return false;
    }


    public boolean addFavorite(int userID, String recipeName, String recipeID, String picURL) {
        Connection dbconn = null;

        try {
            Connection conn = dataSource.getConnection();
            boolean exists;
            PreparedStatement ps = conn.prepareStatement("SELECT RecipeName FROM FavoriteFood WHERE userID = ? AND recipeName = ?");
            ps.setInt(1, userID);
            ps.setString(2, recipeName);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) exists = false;
                else return true;
            }
            if (!exists) {
                ps = conn.prepareStatement("INSERT INTO dbo.favoriteFood (userID, recipeID, recipeName, picURL) VALUES (?,?,?,?)");
                ps.setInt(1, userID);
                ps.setString(2, recipeID);
                ps.setString(3, recipeName);
                ps.setString(4, picURL);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeDb(dbconn);
        }
        return false;
    }

    public String getFavorites(int UserID) {
        Connection dbconn = null;
        Recipe[] favoriteRecipes = new Recipe[2];

        try {
            Connection conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM FavoriteFood WHERE userID = ?");
            ps.setInt(1, UserID);
            ResultSet rs = ps.executeQuery();
            int counter = 0;
            while (rs.next()) {
                Recipe recipe = new Recipe
                        (rs.getString("recipeName"),
                        rs.getString("recipeID"),
                        rs.getString("picURL"));
                favoriteRecipes[counter] = recipe;
                counter++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeDb(dbconn);
        }
        String favorites = "";
        for (int i = 0; i < favoriteRecipes.length; i++) {
            favorites = favorites + favoriteRecipes[i].getRecipeName() + ",";
            favorites = favorites + favoriteRecipes[i].getRecipeID() + ",";
            favorites = favorites + favoriteRecipes[i].getPicURL() + ";";
        }
        return favorites.substring(0, favorites.length() - 1);
    }

    public void closeDb(Connection dbconn) {
        if (dbconn != null) {
            try {
                dbconn.close();
            } catch (SQLException e) {
                e.printStackTrace();
                e.getErrorCode();
                System.out.println("Could not close the DB");
            }
        }
    }
}

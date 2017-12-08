package com.academy.demo;

public class Recipe {
    private String recipeName;
    private String recipeID;
    private String picURL;

    public Recipe(String recipeName, String recipeID, String picURL) {
        this.recipeName = recipeName;
        this.recipeID = recipeID;
        this.picURL = picURL;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getRecipeID() {
        return recipeID;
    }

    public void setRecipeID(String recipeID) {
        this.recipeID = recipeID;
    }

    public String getPicURL() {
        return picURL;
    }

    public void setPicURL(String picURL) {
        this.picURL = picURL;
    }
}

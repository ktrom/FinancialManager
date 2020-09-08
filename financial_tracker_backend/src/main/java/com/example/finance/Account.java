package com.example.finance;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String username;
    private final String password;

    public Account(){
        username = "null";
        password = "null";
    }
    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername(){return username;}
    public String getPassword() {return password;}
}

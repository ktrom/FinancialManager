package com.example.finance;


import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    private final String username;
    private final String password;

    @OneToMany(mappedBy = "account")
    private Set<FinanceItem> finance_items;

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

    public void addItem(FinanceItem item)
    {
        finance_items.add(item);
    }

    public Set<FinanceItem> getItems()
    {
        return finance_items;
    }
}

package com.example.finance;


import javax.persistence.*;

@Entity
@Table(name = "finance_items")
public class FinanceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;
    private final String name;
    private final double value;

    @ManyToOne
    @JoinColumn(name="finance_item_id", nullable = false)
    private Account account;

    public FinanceItem(){
        name = "null";
        value = 0;
    }

    public FinanceItem(String name, double value) {
        this.name = name;
        this.value = value;
    }

    public String getUsername(){return name;}
    public double getValue() {return value;}

    public void setAccount(Account account)
    {
        this.account = account;
    }
}

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
    private boolean assigned;

    @ManyToOne
    @JoinColumn(name="finance_item_id", nullable = false)
    private Account account;

    public FinanceItem(){
        name = "null";
        assigned = false;
        value = 0;
    }

    public FinanceItem(String name, double value, boolean assigned) {
        this.name = name;
        this.value = value;
        this.assigned = assigned;
    }

    public String getUsername(){return name;}
    public double getValue() {return value;}
    public boolean getAssigned(){return assigned;}

    public void setAccount(Account account)
    {
        this.account = account;
    }
}

package com.example.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(path="/item")
public class ItemController {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ItemRepository itemRepository;

    @CrossOrigin
    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody
    String addNewItem (@RequestParam String username
            , @RequestParam String name, @RequestParam double value) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        FinanceItem f = new FinanceItem(name, value);
        Account a = accountRepository.findAccountByUsername(username).get(0);
        f.setAccount(a);
        a.addItem(f);
        itemRepository.save(f);
        return "Saved";
    }

    @CrossOrigin
    @PostMapping(path="/get") // Map ONLY POST Requests
    public @ResponseBody
    Set<FinanceItem> getItems (@RequestParam String username) {
        Account a = accountRepository.findAccountByUsername(username).get(0);
        return a.getItems();
    }
}

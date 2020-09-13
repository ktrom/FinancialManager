package com.example.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/account")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @CrossOrigin
    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody
    String addNewUser (@RequestParam String username
            , @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Account a = new Account(username, password);
        accountRepository.save(a);
        return "Saved";
    }

        @GetMapping(path="/all")
    public @ResponseBody Iterable<Account> getAllAccounts() {
        // This returns a JSON or XML with the users
        return accountRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(path="/userExists")
    public @ResponseBody boolean accountExists(@RequestParam String username){
        List<Account> accountsWithUsername = accountRepository.findAccountByUsername(username);
        return accountsWithUsername.size() > 0;
    }

    @CrossOrigin
    @GetMapping(path="/verifyAccount")
    public @ResponseBody boolean isCorrectPassword(@RequestParam String username, @RequestParam String password){
        List<Account> accountsWithUsername = accountRepository.findAccountByUsername(username);
        return accountsWithUsername.get(0).getPassword().equals(password);
    }


}
package com.example.finance;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository
        extends CrudRepository<FinanceItem, Long> {
}

package com.example.Laboratorio.repository;

import com.example.Laboratorio.entity.Desempeno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesempenoRepository extends JpaRepository<Desempeno,Long> {
}

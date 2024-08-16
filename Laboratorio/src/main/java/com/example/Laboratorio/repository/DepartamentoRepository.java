package com.example.Laboratorio.repository;

import com.example.Laboratorio.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento,Long> {
    public Departamento findByNombre(String nombre);
}
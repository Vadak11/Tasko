package com.example.Laboratorio.repository;

import com.example.Laboratorio.entity.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    List<Proyecto> findByUsers_Id(Long userId);
    List<Proyecto> findAllByActivo(int activo);
}

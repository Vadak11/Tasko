package com.example.Laboratorio.repository;

import com.example.Laboratorio.entity.EstadoTarea;
import com.example.Laboratorio.entity.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findTareaByEstado(EstadoTarea estado);
    List<Tarea> findByProyectoId(Long proyecto_id);
    List<Tarea> findByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE Tarea t SET t.estado = 'ASIGNADA', t.user.id = :userId WHERE t.id = :id")
    void assingTaskToUser(Long id, Long userId);
}
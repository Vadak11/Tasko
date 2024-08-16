package com.example.Laboratorio.service;

import com.example.Laboratorio.entity.EstadoTarea;
import com.example.Laboratorio.entity.Proyecto;
import com.example.Laboratorio.entity.Tarea;
import com.example.Laboratorio.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {
    @Autowired
    private TareaRepository tareaRepository;
    public List<Tarea> findAll() {return tareaRepository.findAll();}
    public void save(Tarea tarea) {
        tareaRepository.save(tarea);
    }
    public void update(Tarea tarea) {tareaRepository.save(tarea);}
    public Optional<Tarea> findById(Long id) {
        return tareaRepository.findById(id);
    }
    public void delete(Long id) {
        tareaRepository.deleteById(id);
    }
    public List<Tarea> findByProjectoId(Long projectId) {return tareaRepository.findByProyectoId(projectId);}
    public List<Tarea> findByEstado(EstadoTarea estado) {return tareaRepository.findTareaByEstado(estado);}

    public List<Tarea> findBy_UserId(Long userId) {
        return tareaRepository.findByUserId(userId);
    }

    public void assignTaskToUser(Long id, Long userId) {tareaRepository.assingTaskToUser(id, userId);}
}

package com.example.Laboratorio.service;

import com.example.Laboratorio.entity.Proyecto;
import com.example.Laboratorio.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProyectoService {
    @Autowired
    private ProyectoRepository proyectoRepository;
    public List<Proyecto> findAll() {
        return proyectoRepository.findAll();
    }
    public void save(Proyecto proyecto) {
        proyectoRepository.save(proyecto);
    }
    public void update(Proyecto proyecto) {
        proyectoRepository.save(proyecto);
    }
    public Optional<Proyecto> findById(Long id) {
        return proyectoRepository.findById(id);
    }
    public void delete(Long id) {proyectoRepository.deleteById(id);}
    public List<Proyecto> findBy_UserId(Long userId) {return proyectoRepository.findByUsers_Id(userId);}
    public List<Proyecto> findAllByActivo(int activo) {return proyectoRepository.findAllByActivo(activo);}
}

package com.example.Laboratorio.service;

import com.example.Laboratorio.entity.Departamento;
import com.example.Laboratorio.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartamentoService {
    @Autowired
    private DepartamentoRepository departamentoRepository;
    public List<Departamento> findAll() {
        return departamentoRepository.findAll();
    }
    public void save(Departamento departamento) {
        departamentoRepository.save(departamento);
    }
    public void update(Departamento departamento) {
        departamentoRepository.save(departamento);
    }
    public Optional<Departamento> findById(Long id) {
        return departamentoRepository.findById(id);
    }
    public void delete(Long id) {
        departamentoRepository.deleteById(id);
    }
    public Optional<Departamento> findByNombre(String nombre) {
        return Optional.ofNullable(departamentoRepository.findByNombre(nombre));
    }
}
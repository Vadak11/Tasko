package com.example.Laboratorio.service;

import com.example.Laboratorio.entity.Desempeno;
import com.example.Laboratorio.repository.DesempenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesempenoService {
    @Autowired
    private DesempenoRepository desempenoRepository;
    public List<Desempeno> findAll() {
        return desempenoRepository.findAll();
    }
    public void save(Desempeno departamento) {
        desempenoRepository.save(departamento);
    }
    public void update(Desempeno departamento) {
        desempenoRepository.save(departamento);
    }
    public Optional<Desempeno> findById(Long id) {
        return desempenoRepository.findById(id);
    }
    public void delete(Long id) {
        desempenoRepository.deleteById(id);
    }
}

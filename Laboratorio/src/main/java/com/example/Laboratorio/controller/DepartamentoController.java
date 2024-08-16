package com.example.Laboratorio.controller;

import com.example.Laboratorio.entity.Departamento;
import com.example.Laboratorio.service.DepartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/departamento")
public class DepartamentoController {
    private final DepartamentoService departamentoService;

    @GetMapping
    public List<Departamento> findAll(){
        return departamentoService.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Departamento> findById(@PathVariable("id") Long id){
        return  departamentoService.findById(id);
    }
    @PostMapping
    public void save(@RequestBody Departamento departamento){
        departamentoService.save(departamento);
    }
    @PutMapping
    public void update(@RequestBody Departamento departamento){
        departamentoService.update(departamento);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){departamentoService.delete(id);}
}
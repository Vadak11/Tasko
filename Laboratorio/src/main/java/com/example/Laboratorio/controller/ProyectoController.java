package com.example.Laboratorio.controller;

import com.example.Laboratorio.entity.Departamento;
import com.example.Laboratorio.entity.Proyecto;
import com.example.Laboratorio.service.DepartamentoService;
import com.example.Laboratorio.service.ProyectoService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/proyecto")
public class ProyectoController {
    private final ProyectoService proyectoService;

    @GetMapping()
    public List<Proyecto> findAll() {
        return proyectoService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Proyecto> findById(@PathVariable("id") Long id) {
        return proyectoService.findById(id);
    }

    @PostMapping
    public void save(@RequestBody Proyecto proyecto) {
        proyectoService.save(proyecto);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Proyecto proyecto) {
        proyectoService.update(proyecto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        proyectoService.delete(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/findByUserId/{userId}")
    public List<Proyecto> findByUserId(@PathVariable("userId") Long userId) {
        return proyectoService.findBy_UserId(userId);
    }

    @GetMapping("/findAllByActivo/{activo}")
    public List<Proyecto> findAllByActivo(@PathVariable("activo") int activo) {
        return proyectoService.findAllByActivo(activo);
    }
}

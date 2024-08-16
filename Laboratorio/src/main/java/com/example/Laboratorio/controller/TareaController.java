package com.example.Laboratorio.controller;

import com.example.Laboratorio.entity.EstadoTarea;
import com.example.Laboratorio.entity.Proyecto;
import com.example.Laboratorio.entity.Tarea;
import com.example.Laboratorio.service.ProyectoService;
import com.example.Laboratorio.service.TareaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/tarea")
public class TareaController {
    private final TareaService tareaService;

    @GetMapping()
    public List<Tarea> getAllTareas() {
        return tareaService.findAll();
    }

    @GetMapping("/getByEstado")
    public List<Tarea> getTareasByEstado(EstadoTarea estado) {
        return tareaService.findByEstado(estado);
    }

    @GetMapping("/{proyectoId}")
    public List<Tarea> findByProyectoId(@PathVariable Long proyectoId) {
        return tareaService.findByProjectoId(proyectoId);
    }

    @PostMapping("")
    public void createTarea(@RequestBody Tarea tarea) {
        tareaService.save(tarea);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        tareaService.delete(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/findByUserId/")
    public List<Tarea> findByUserId(@RequestParam Long userId) {
        return tareaService.findBy_UserId(userId);
    }

    @PutMapping("/assingTaskToUser/")
    public ResponseEntity<?> assignTaskToUser(@RequestParam Long id, @RequestParam Long userId) {
        tareaService.assignTaskToUser(id, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}

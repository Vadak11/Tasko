package com.example.Laboratorio.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Data
public class Proyecto extends Base {
    private Date fechaInicio;
    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date fechaFin;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String descripcion;
    @Column(nullable = false)
    private int activo;
    //
    @OneToMany(mappedBy = "proyecto", orphanRemoval = true)
    private Set<Tarea> tareas = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "Proyecto_users",
            joinColumns = @JoinColumn(name = "proyecto_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id"))
    private Set<User> users = new LinkedHashSet<>();

}
package com.example.Laboratorio.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class Tarea extends Base {
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String descripcion;
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime fechaInicio;
    private String proridad;
    private Date fechaFin;
    @Column(nullable = false)
    private int activo;
    //
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    //
    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private Proyecto proyecto;
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoTarea estado;
    @Enumerated(EnumType.STRING)
    @Column(name = "PrioridadTarea", nullable = false)
    private PrioridadTarea prioridadTarea;
}
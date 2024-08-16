package com.example.Laboratorio.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Desempeno extends Base {
    private String descripcion;
    private int calificacion;
    //
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    //
    @ManyToOne(optional = false)
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;
}
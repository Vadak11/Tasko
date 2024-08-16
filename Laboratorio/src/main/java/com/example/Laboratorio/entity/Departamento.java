package com.example.Laboratorio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Data
public class Departamento extends Base {
    @Column(nullable = false, unique = true)
    private String nombre;
    @Column(nullable = false)
    private int activo;

    @ManyToMany(mappedBy = "departamentos")
    private Set<User> users = new LinkedHashSet<>();

//

}
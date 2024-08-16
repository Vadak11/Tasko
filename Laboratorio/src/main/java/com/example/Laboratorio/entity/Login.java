package com.example.Laboratorio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Login extends Base {
    @Column(nullable = false)
    private int activo;
    @Column(nullable = false, unique = true)
    private int idUser;
    //
    @OneToOne(mappedBy = "login", optional = false, orphanRemoval = true)
    private User user;
}
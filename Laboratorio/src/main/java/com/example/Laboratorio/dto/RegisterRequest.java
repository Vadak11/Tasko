package com.example.Laboratorio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    String nombre;
    String apellido;
    String segundoApellido;
    String email;
    String direccion;
    String telefono;
    int activo;
    String username;
    String password;
}
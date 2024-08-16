package com.example.Laboratorio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User extends Base implements UserDetails {
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String apellido;
    private String segundoApellido;
    @Column(nullable = false, unique = true)
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(nullable = false)
    private String direccion;
    @Column(nullable = false)
    private String telefono;
    @Column(nullable = false)
    private int activo;
    //

    //
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private Set<Tarea> tareas = new LinkedHashSet<>();
    //
    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "login_id")
    private Login login;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(name = "User_departamentos",
            joinColumns = @JoinColumn(name = "User_id"),
            inverseJoinColumns = @JoinColumn(name = "departamentos_id"))
    private Set<Departamento> departamentos = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "users")
    private Set<Proyecto> proyectos = new LinkedHashSet<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
package com.example.Laboratorio.service;

import com.example.Laboratorio.entity.User;
import com.example.Laboratorio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Optional<User> findByUsername(String username) {return userRepository.findByUsername(username);}

    public List<User> findAll() {
        return userRepository.findAll();
    }
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    public void update(User user) {
        userRepository.save(user);}
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}

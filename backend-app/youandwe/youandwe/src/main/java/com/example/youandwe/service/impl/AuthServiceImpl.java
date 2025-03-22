package com.example.youandwe.service.impl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.youandwe.dto.JwtAuthResponse;
import com.example.youandwe.dto.LoginDto;
import com.example.youandwe.dto.SignupDto;
import com.example.youandwe.entity.Role;
import com.example.youandwe.entity.User;
import com.example.youandwe.exception.HelpRequestAPIException;
import com.example.youandwe.repository.RoleRepository;
import com.example.youandwe.repository.UserRepository;
import com.example.youandwe.security.JwtTokenProvider;
import com.example.youandwe.service.AuthService;
import com.example.youandwe.service.EmailService;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private EmailService emailService;

    @Override
    public String signup(SignupDto signupDto) {

        // check username is already exists in database
        if(userRepository.existsByUsername(signupDto.getUsername())){
            throw new HelpRequestAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        // check email is already exists in database
        if(userRepository.existsByEmail(signupDto.getEmail())){
            throw new HelpRequestAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
        }

        User user = new User();
        user.setName(signupDto.getName());
        user.setUsername(signupDto.getUsername());
        user.setEmail(signupDto.getEmail());
        user.setPassword(passwordEncoder.encode(signupDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);

        user.setRoles(roles);

        userRepository.save(user);
     // Send welcome email
        String subject = "Welcome to Our Application!";
        String body = "Dear " + user.getUsername() + ",\n\nYour YouAndWe account was successfully created with the following credentials: Username:"+ user.getUsername() +"Thank you for transforming lives with YouAndWe!!";
        emailService.sendWelcomeEmail(user.getEmail(), subject, body);
        return "Finish setting up your account\r\n"
        		+ "\r\n"
        		+ "Information on how to activate your account has been sent to your email address. Please check your inbox and spam folders.";


    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),
                loginDto.getUsernameOrEmail());

        String role = null;
        if(userOptional.isPresent()){
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();

            if(optionalRole.isPresent()){
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        return jwtAuthResponse;
    }
}

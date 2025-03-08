package com.example.youandwe.service;

import com.example.youandwe.dto.JwtAuthResponse;
import com.example.youandwe.dto.LoginDto;
import com.example.youandwe.dto.SignupDto;

public interface AuthService {
    String signup(SignupDto signupDto);

    JwtAuthResponse login(LoginDto loginDto);

}

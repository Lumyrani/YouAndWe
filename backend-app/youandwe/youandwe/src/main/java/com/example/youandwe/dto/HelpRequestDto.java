package com.example.youandwe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HelpRequestDto {


    private Long id;
    private String username;;
//    private String email;
    private String help;
    private String details;
}

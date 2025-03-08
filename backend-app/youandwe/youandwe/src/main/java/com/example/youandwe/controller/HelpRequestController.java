package com.example.youandwe.controller;


import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.youandwe.dto.HelpRequestDto;
import com.example.youandwe.service.HelpRequestService;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/helpRequests")
@AllArgsConstructor
public class HelpRequestController {
	private HelpRequestService helpRequestService;

    // Build Add HelpRequest REST API

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<HelpRequestDto> addHelpRequest(@RequestBody HelpRequestDto helpRequestDto){

    	HelpRequestDto savedHelpRequest = helpRequestService.addHelpRequest(helpRequestDto);

        return new ResponseEntity<>(savedHelpRequest, HttpStatus.CREATED);
    }

    // Build Get HelpRequest REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<HelpRequestDto> getHelpRequest(@PathVariable("id") Long todoId){
    	HelpRequestDto HelpRequestDto = helpRequestService.getHelpRequest(todoId);
        return new ResponseEntity<>(HelpRequestDto, HttpStatus.OK);
    }

    // Build Get All HelpRequests REST API
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<HelpRequestDto>> getAllHelpRequests(){
        List<HelpRequestDto> helpRequests = helpRequestService.getAllHelpRequests();
        //return new ResponseEntity<>(helpRequests, HttpStatus.OK);
        return ResponseEntity.ok(helpRequests);
    }

    // Build Update HelpRequest REST API
    @PreAuthorize("hasRole('ADMIN','USER)")
    @PutMapping("{id}")
    public ResponseEntity<HelpRequestDto> updateTodo(@RequestBody HelpRequestDto helpRequestDto, @PathVariable("id") Long helpRequestId){
    	HelpRequestDto updatedHelpRequest = helpRequestService.updateHelpRequest(helpRequestDto, helpRequestId);
        return ResponseEntity.ok(updatedHelpRequest);
    }

    // Build Delete HelpRequest REST API
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteHelpRequest(@PathVariable("id") Long helpRequestId){
        helpRequestService.deleteHelpRequest(helpRequestId);
        return ResponseEntity.ok("Todo deleted successfully!.");
    }

  
}


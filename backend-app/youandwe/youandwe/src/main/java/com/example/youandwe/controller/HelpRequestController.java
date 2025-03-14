package com.example.youandwe.controller;


import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.youandwe.dto.HelpRequestDto;
import com.example.youandwe.service.HelpRequestService;

import java.util.List;
@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("api/helpRequests")
@AllArgsConstructor
public class HelpRequestController {
	private HelpRequestService helpRequestService;

    // Build Add HelpRequest REST API

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping
    public ResponseEntity<HelpRequestDto> addHelpRequest(@RequestBody HelpRequestDto helpRequestDto){

    	HelpRequestDto savedHelpRequest = helpRequestService.addHelpRequest(helpRequestDto);

        return new ResponseEntity<>(savedHelpRequest, HttpStatus.CREATED);
    }

    // Build Get HelpRequest REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<HelpRequestDto> getHelpRequest(@PathVariable("id") Long helpRequestId){
    	HelpRequestDto HelpRequestDto = helpRequestService.getHelpRequest(helpRequestId);
        return new ResponseEntity<>(HelpRequestDto, HttpStatus.OK);
    }

    // Build Get All HelpRequests REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<HelpRequestDto>> getAllHelpRequests(){
        List<HelpRequestDto> helpRequests = helpRequestService.getAllHelpRequests();
        //return new ResponseEntity<>(helpRequests, HttpStatus.OK);
        return ResponseEntity.ok(helpRequests);
    }

    // Build Update HelpRequest REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("{id}")
    public ResponseEntity<HelpRequestDto> updateHelpRequest(@RequestBody HelpRequestDto helpRequestDto, @PathVariable("id") Long helpRequestId){
    	HelpRequestDto updatedHelpRequest = helpRequestService.updateHelpRequest(helpRequestDto, helpRequestId);
        return ResponseEntity.ok(updatedHelpRequest);
    }

    // Build Delete HelpRequest REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteHelpRequest(@PathVariable("id") Long helpRequestId){
        helpRequestService.deleteHelpRequest(helpRequestId);
        return ResponseEntity.ok("Todo deleted successfully!.");
    }

  
}
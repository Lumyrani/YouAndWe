package com.example.youandwe.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.youandwe.dto.HelpRequestDto;
import com.example.youandwe.entity.HelpRequest;
import com.example.youandwe.exception.ResourceNotFoundException;
import com.example.youandwe.repository.HelpRequestRepository;
import com.example.youandwe.service.HelpRequestService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HelpRequestServiceImpl implements HelpRequestService {

    private HelpRequestRepository helpRequestRepository;

    private ModelMapper modelMapper;

    @Override
    public HelpRequestDto addHelpRequest(HelpRequestDto helpRequestDto) {

        // convert HelpRequestDto into HelpRequestJpa entity
    	HelpRequest helpRequest = modelMapper.map(helpRequestDto, HelpRequest.class);

        // HelpRequest Jpa entity
    	HelpRequest savedHelpRequest = helpRequestRepository.save(helpRequest);

        // Convert saved HelpRequest Jpa entity object into HelpRequestDto object

    	HelpRequestDto savedHelpRequestDto = modelMapper.map(savedHelpRequest, HelpRequestDto.class);

        return savedHelpRequestDto;
    }

    @Override
    public HelpRequestDto getHelpRequest(Long id) {

    	HelpRequest helpRequest = helpRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help Request not found with id:" + id));

        return modelMapper.map(helpRequest, HelpRequestDto.class);
    }

    @Override
    public List<HelpRequestDto> getAllHelpRequests() {

        List<HelpRequest> helpRequests = helpRequestRepository.findAll();

        return helpRequests.stream().map((helpRequest) -> modelMapper.map(helpRequest, HelpRequestDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public HelpRequestDto updateHelpRequest(HelpRequestDto helpRequestDto, Long id) {

    	HelpRequest helpRequest = helpRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help Request not found with id : " + id));
    	helpRequest.setUsername(helpRequestDto.getUsername());
//    	helpRequest.setEmail(helpRequestDto.getEmail());
         helpRequest.setHelp(helpRequestDto.getHelp());
         helpRequest.setDetails(helpRequestDto.getDetails());
         
         HelpRequest updatedHelpRequest = helpRequestRepository.save(helpRequest);

        return modelMapper.map(updatedHelpRequest, HelpRequestDto.class);
    }

    @Override
    public void deleteHelpRequest(Long id) {

        HelpRequest helpRequest = helpRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help Request not found with id : " + id));

        helpRequestRepository.deleteById(id);
    }


    
}



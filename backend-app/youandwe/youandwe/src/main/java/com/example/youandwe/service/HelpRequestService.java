package com.example.youandwe.service;

import java.util.List;

import com.example.youandwe.dto.HelpRequestDto;

public interface HelpRequestService {
	   HelpRequestDto addHelpRequest(HelpRequestDto helpRequestDto);

	   HelpRequestDto getHelpRequest(Long id);

	    List<HelpRequestDto> getAllHelpRequests();

	    HelpRequestDto updateHelpRequest(HelpRequestDto helpRequestDto, Long id);


		void deleteHelpRequest(Long id);
	}
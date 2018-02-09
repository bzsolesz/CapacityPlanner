package com.plm.service.child.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.plm.service.child.AbstractITBase;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.domain.Child;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CorsFilterIT extends AbstractITBase {

    private static final String KNOWN_PROTOCOL = "http";
    private static final String KNOWN_HOST = "localhost";
    private static final int KNOWN_PORT = 88000;

    private static final String KNOWN_PROTOCOL_2 = "https";
    private static final String KNOWN_HOST_2 = "123.122.0.13";
    private static final int KNOWN_PORT_2 = 89000;

    private ChildEntity testChildEntity;

    @Before
    public void setUp() throws Exception {

        testChildEntity = persistTestChildEntity();
    }

    @Test
    @Transactional
    public void shouldReturnOkToGetRequestFromKnownOrigin() throws Exception {

        String testOriginUrl = buildTestOriginUrl(KNOWN_PROTOCOL, KNOWN_HOST, KNOWN_PORT);

        mockMvc.perform(get("/child/{id}", testChildEntity.getId())
                .header(HttpHeaders.ORIGIN, testOriginUrl)
                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, testOriginUrl));
    }

    @Test
    @Transactional
    public void shouldReturnOkToGetRequestFromTheSecondKnownOrigin() throws Exception {

        String testOriginUrl = buildTestOriginUrl(KNOWN_PROTOCOL_2, KNOWN_HOST_2, KNOWN_PORT_2);

        mockMvc.perform(get("/child/{id}", testChildEntity.getId())
                .header(HttpHeaders.ORIGIN, testOriginUrl)
                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, testOriginUrl));
    }

    @Test
    @Transactional
    public void shouldRejectGetRequestFromUnknownHost() throws Exception {

        String testOriginUrlWithUnknownHost = buildTestOriginUrl(KNOWN_PROTOCOL, "127.0.0.2", KNOWN_PORT);

        mockMvc.perform(get("/child/{id}", testChildEntity.getId())
                .header(HttpHeaders.ORIGIN, testOriginUrlWithUnknownHost)
                .accept(APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    public void shouldRejectGetRequestFromUnknownPort() throws Exception {

        String testOriginUrlWithUnknownPort = buildTestOriginUrl(KNOWN_PROTOCOL, KNOWN_HOST, KNOWN_PORT + 1);

        mockMvc.perform(get("/child/{id}", testChildEntity.getId())
                .header(HttpHeaders.ORIGIN, testOriginUrlWithUnknownPort)
                .accept(APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    public void shouldRejectGetRequestFromWithUnknownProtocol() throws Exception {

        String testOriginUrlWithUnknownProtocol = buildTestOriginUrl("https", KNOWN_HOST, KNOWN_PORT);

        mockMvc.perform(get("/child/{id}", testChildEntity.getId())
                .header(HttpHeaders.ORIGIN, testOriginUrlWithUnknownProtocol)
                .accept(APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    public void shouldReturnOkToPutRequestFromKnownOrigin() throws Exception {

        String testOriginUrl = buildTestOriginUrl(KNOWN_PROTOCOL, KNOWN_HOST, KNOWN_PORT);

        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new JavaTimeModule());

        Child testChild = new Child(testChildEntity.getId(), "", "", testChildEntity.getDateOfBirth());

        String testChildJson = jsonMapper.writeValueAsString(testChild);

        mockMvc.perform(put("/child/{id}", testChildEntity.getId())
                .header(HttpHeaders.ORIGIN, testOriginUrl)
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON)
                .content(testChildJson))
                .andExpect(status().isNoContent())
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, testOriginUrl));
    }

    private static String buildTestOriginUrl(String protocol, String host, int port) {
        return String.format("%s://%s:%d", protocol, host, port);
    }
}